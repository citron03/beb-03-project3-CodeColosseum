import axios from "axios";
import models from "../../models";

const post = async (req: any, res: any) => {
  const { account, missionId, code } = req.body;
  // 1. 문제 state 확인. 콜로세움 문제인가?(1), 연습 문제인가?(4)
  try {
    const userInfo = await models.User.findOne({ account });
    const missionInfo = await models.Mission.findOne({ _id: missionId });
    const gradingResult = await gradingMission(missionInfo.testCases, code);
    const missionState = missionInfo.state;

    //console.log(gradingResult);

    if (missionState === 1) {
      // 아직 풀리지 않음
      if (gradingResult.data) {
        // 채점에 성공 (정답 여부 상관 없이)
        if (gradingResult.data.failCount === 0) {
          // 통과
          // 미션 state를 2로 변경
          // 푼 사람은 winner로 나머지 사람들은 losers로 이동
          // challenge도 업데이트
          // 정답 여부, 받게 되는 보상
          const winner = userInfo.id;
          const losers = missionInfo.colosseum.challengings.filter(
            (challenger: any) => {
              return challenger.userId.toString() !== winner.toString();
            }
          );

          try {
            const now = Date.now();
            const clearTime = new Date(now);
            try {
              await models.Challenge.updateOne(
                { challenger: winner, mission: missionId },
                {
                  answerCode: code,
                  isPassed: true,
                  PassedCasesRate: `${
                    missionInfo.testCases.length - gradingResult.data.failCount
                  } / ${missionInfo.testCases.length}`,
                  passedCases: gradingResult.data.passedCases,
                  clearTime,
                }
              );
            } catch (err) {
              console.log(err);
              res.status(400).send({ message: "DB update Error" });
            }
            await models.Mission.updateOne(
              { _id: missionId },
              {
                state: 2,
                colosseum: {
                  stakedTokens: missionInfo.colosseum.stakedTokens,
                  limitSeconds: missionInfo.colosseum.limitSeconds,
                  winner,
                  losers,
                },
              }
            );
            res.status(200).send({
              message: gradingResult.message,
              data: {
                ...gradingResult.data,
                reward: missionInfo.colosseum.stakedToken * 0.4,
                isClosed: true,
              },
            });
          } catch (err) {
            console.log(err);
            res.status(400).send({ message: "DB update Error" });
          }
        } else {
          // 틀림
          // 정답 여부, 재도전 메시지
          res.status(200).send({
            message: `${gradingResult.message}, try again!`,
            data: { ...gradingResult.data, isClosed: false },
          });
        }
      } else {
        // 채점 실패 (코드 에러 등)
        // 에러, 재도전 메시지
        res.status(200).send({
          message: `${gradingResult.message}, try again!`,
          data: { isClosed: false },
        });
      }
    } else if (missionState === 2) {
      // 풀린 문제
      if (gradingResult.data) {
        // 채점에 성공 (정답 여부 상관 없이)
        // 누군가 이미 성공해서 종료되었다고 알림
        const now = Date.now();
        const clearTime = new Date(now);
        try {
          await models.Challenge.updateOne(
            { challenger: userInfo.id, mission: missionId },
            {
              answerCode: code,
              isPassed: true,
              PassedCasesRate: `${
                missionInfo.testCases.length - gradingResult.data.failCount
              } / ${missionInfo.testCases.length}`,
              passedCases: gradingResult.data.passedCases,
              clearTime,
            }
          );
        } catch (err) {
          console.log(err);
          res.status(400).send({ message: "DB update Error" });
        }
        res.status(200).send({
          message: `${gradingResult.message}, closed mission`,
          data: { ...gradingResult.data, isClosed: true },
        });
      } else {
        // 채점 실패 (코드 에러 등)
        // 채점에 실패했는데 이미 풀린 문제라고 알림
        res.status(200).send({
          message: `${gradingResult.message}, closed mission`,
          data: { isClosed: true },
        });
      }
    } else if (missionState === 4) {
      // 연습 문제
      // 기존 방식대로 처리
      const challenge = {
        challenger: userInfo._id,
        mission: missionId,
        answerCode: code,
        isPassed: gradingResult.data.failCount === 0 ? true : false,
        PassedCasesRate: `${
          missionInfo.testCases.length - gradingResult.data.failCount
        } / ${missionInfo.testCases.length}`,
        passedCases: gradingResult.data.passedCases,
      };
      try {
        await models.Challenge.create(challenge);
        res
          .status(200)
          .send({ message: gradingResult.message, data: gradingResult.data });
      } catch (err) {
        console.log(err);
        res.status(400).send({ message: "DB upload Error" });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: "Failed to load Mission Info" });
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
