import axios from "axios";
import tokenRewardColosseum from "../../contract/tokenRewardColosseum";
import models from "../../models";
import contract from "../../contract";
import { TokenTransferLogFor } from "../../utils";

const post = async (req: any, res: any) => {
  const { account, missionId, code } = req.body;
  try {
    const userInfo = await models.User.findOne({ account });
    const missionInfo = await models.Mission.findOne({ _id: missionId });
    const challengeInfo = await models.Challenge.findOne({
      challenger: userInfo._id,
      mission: missionInfo._id,
    });
    const gradingResult = await gradingMission(missionInfo.testCases, code);

    // gradingResult.message = Error Message or Grading Complete
    // gradingResult.data = {failCount, passedCases}

    const isClosed = missionInfo.state === 1 ? false : true; // 1: 아직 풀이 중, 2: 누군가 품
    const codeError = gradingResult.data === undefined; // true: 코드에 문제있음, false: 채점엔 성공함
    const isPassed = gradingResult.data.failCount === 0; // true: 풀이 성공, false: 풀이 실패
    const timeSafe = Date.now() <= challengeInfo.endTime; // true: 시간안에 품, false: 타임 오버

    let message = gradingResult.message + ", ";
    let data = {};
    if (!codeError) {
      data = { ...gradingResult.data, isClosed, codeError, isPassed, timeSafe };
    } else {
      data = { isClosed, codeError, isPassed, timeSafe };
    }
    if (!isClosed && !codeError && isPassed && timeSafe) {
      // 우승자 탄생
      // mission state 수정
      // mission.colosseum 수정 (winner, losers)
      // challenge 수정 (answerCode, isPassed, PassedCasesRate, passedCases, recordTime)
      // 우승자, 출제자, 서버에 토큰 분배 (4:4:2 임시)

      const winner = missionInfo.colosseum.challengings.filter(
        (challenger: any) => {
          return challenger.account === account;
        }
      );
      const losers = missionInfo.colosseum.challengings.filter(
        (challenger: any) => {
          return challenger.account !== account;
        }
      );

      try {
        const clearTime = Date.now();
        const recordTime = clearTime - winner[0].challengedAt.getTime();
        const userInfo = await models.User.findOne({
          account: winner[0].account,
        });
        try {
          // 우승자 challenge 업데이트
          await models.Challenge.updateOne(
            { challenger: userInfo.id, mission: missionId },
            {
              answerCode: code,
              isPassed,
              PassedCasesRate: `${
                missionInfo.testCases.length - gradingResult.data.failCount
              } / ${missionInfo.testCases.length}`,
              passedCases: gradingResult.data.passedCases,
              recordTime,
            }
          );
        } catch (err) {
          console.log(err);
          res.status(400).send({ message: "DB update Error" });
        }
        try {
          // mission 업데이트
          await models.Mission.updateOne(
            { _id: missionId },
            {
              state: 2,
              colosseum: {
                stakedTokens: missionInfo.colosseum.stakedTokens,
                limitSeconds: missionInfo.colosseum.limitSeconds,
                winner: winner[0],
                losers,
              },
            }
          );
        } catch (err) {
          console.log(err);
          res.status(400).sned({ message: "DB update Error" });
        }
        // 보상 지급
        try {
          const missionInfo = await models.Mission.findOne({ _id: missionId });
          const { winnerTxReturn, creatorTxReturn } =
            await tokenRewardColosseum(missionInfo);

          if (winnerTxReturn.success && creatorTxReturn.success) {
            await contract.createTokenTransferLog(winnerTxReturn, 2, {
              collection: "Mission",
              id: missionInfo.id,
            });
            await contract.createTokenTransferLog(creatorTxReturn, 3, {
              collection: "Mission",
              id: missionInfo.id,
            });
          } else {
            throw new Error("Failed reward");
          }

          res.status(200).send({
            message: gradingResult.message,
            data: {
              ...data,
              reward: winnerTxReturn.amount,
            },
          });
        } catch (err: any) {
          console.log(err);
          res.status(400).send({ message: err.message });
        }
      } catch (err) {
        console.log(err);
        res.status(400).send({ message: "DB update Error" });
      }
    } else {
      // 뭔가 문제가 있는 경우 (종료된 문제, 코드 에러, 오답, 시간 초과)
      if (isClosed) {
        message += "종료된 문제, ";
        // challenge를 업데이트함. 더이상 콜로세움에서는 도전할 수 없음. 문제에서 내보내짐
        await models.Challenge.updateOne(
          { challenger: userInfo.id, mission: missionId },
          {
            answerCode: code,
            isPassed,
            PassedCasesRate: `${
              missionInfo.testCases.length - gradingResult.data.failCount
            } / ${missionInfo.testCases.length}`,
            passedCases: gradingResult.data.passedCases,
            recordTime:
              Date.now() -
              (challengeInfo.endTime -
                missionInfo.colosseum.limitSeconds * 1000 -
                10000),
          }
        );
      }
      if (codeError) {
        message += "코드 에러(문법 등), ";
      }
      if (!isPassed) {
        message += "통과하지 못한 테스트 케이스가 있음, ";
      }
      if (!timeSafe) {
        message += "풀이 시간 초과";
      }

      res.status(200).send({ message, data });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: "Failed to load Data" });
  }
};

const gradingMission = async (testCases: [], code: string) => {
  // 채점하고 결과만 반환하는 함수

  //console.log(testCases);
  try {
    const { data } = await axios.post("http://localhost:3003/grading", {
      code,
      testCases,
    });
    // console.log(data);
    if (data.data) {
      // 정답 여부 상관 없이 채점에 성공
      return { message: data.message, data: data.data };
    } else {
      // 문법 오류 등의 이유로 채점 실패
      return { message: data.message };
    }
  } catch (err) {
    console.log(err);
    return { message: "Grading Failed" };
  }
};

export = { post };
