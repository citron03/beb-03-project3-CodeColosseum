import { fromDb } from "../../config";
import { ccToken, log } from "../../contract";
import models from "../../models";
import { findMissionInfoByMissionId, TokenTransferLogFor } from "../../utils";

const post = async (req: any, res: any) => {
  const { account, senderRawTransaction } = req.body;
  const missionId = req.params.mission_id;

  const missionInfo = await findMissionInfoByMissionId(missionId);

  const { openTime } = missionInfo;

  let message;
  let isPayment = false;
  let isOpen = false;
  try {
    const challengeNum = getChallengerNum(missionInfo);
    const challengeInfo = checkChallengers(account, missionInfo);
    message = challengeInfo.message;
    if (checkTimePassed(openTime)) {
      // 오픈 시간을 넘어감

      if (challengeInfo.result === 3) {
        // DB 조회 에러
        throw new Error(challengeInfo.message);
      }

      // 도전자 수가 0~1명임.
      if (challengeNum < 2) {
        // 환불 절차
        await refundProcess(missionInfo);
        if (challengeInfo.result === 1) {
          // 이미 지불한 사람 - 환불 메시지
          message = "token refunded";
        } else {
          // 지불해야하는 사람 - 접근 불가 메시지
          message = "This Mission is Pending";
        }
        res.status(200).send({ message, data: { isPayment, isOpen } });
      } else {
        // 문제도 열려있고 도전하는 사람도 2명 이상임.
        if (challengeInfo.result === 1) {
          // 이미 지불한 사람
          // 미션 정보 전달, challengedAt이 없으면 생성해줌
          const colosseumInfo = await getMissionInfo(missionId, account);
          isPayment = true;
          isOpen = true;

          res.status(200).send({
            message,
            data: {
              isPayment,
              isOpen,
              ...colosseumInfo.missionInfo,
            },
          });
        } else {
          // 지불해야 하는 사람
          // 사인 객체 전달
          const txSignReqObj = await ccToken.tokenPaymentResDataColosseum();
          isOpen = true;
          return res.status(200).send({
            message,
            data: { isPayment, isOpen, txSignReqObj },
          });
        }
      }
    } else {
      // 아직 오픈 시간 전
      if (senderRawTransaction) {
        // 사인 객체가 같이왔으니 지불해주고 시간이 되면 풀러오라고 알려줌
        await paymentProcess(senderRawTransaction, account, missionId);
        res.status(200).send({
          message: "Complete payment, Come during opening time.",
          data: { isPayment: true, isOpen: false },
        });
      } else {
        if (challengeInfo.result === 1) {
          // 지불한 사람 - 아직 시간 안됐다고 알려줌
          res.status(200).send({
            message: "not yet time to open",
            data: { isPayment: true, isOpen: false },
          });
        } else {
          // 지불해야하는 사람 - 사인 객체 전달
          const newTxObj = await ccToken.tokenPaymentResDataColosseum();
          res.status(200).send({
            message: challengeInfo.message,
            data: { isPayment: false, isOpen: false, txSignReqObj: newTxObj },
          });
        }
      }
    }
  } catch (err: any) {
    console.log(err);
    res.status(400).send({ message: err.message });
  }
};

const checkTimePassed = (openTime: any) => {
  if (Date.now() > new Date(openTime).getTime()) {
    return true;
  }
  return false;
};

const getChallengerNum = (missionInfo: any) => {
  if (missionInfo.colosseum.challengings === undefined) {
    return 0;
  } else {
    return missionInfo.colosseum.challengings.length;
  }
};

const checkChallengers = (account: string, missionInfo: any) => {
  try {
    let userChallengeInfo;
    if (missionInfo.colosseum.challengings) {
      for (let info of missionInfo.colosseum.challengings) {
        if (info.account === account) {
          userChallengeInfo = info;
          break;
        }
      }
    }
    //console.log(userChallengeInfo);
    if (userChallengeInfo) {
      return { result: 1, message: "Already being challenged" };
    } else {
      return { result: 2, message: "Not paying tokens" };
    }
  } catch (err) {
    console.log(err);
    return { result: 3, message: "Failed to load Database" };
  }
};
const stakingToken = async (missionId: string, amount: number) => {
  // mission을 조회하고 stakedToken을 증가시킴
  try {
    const missionInfo = await models.Mission.findOne({ _id: missionId });
    const colosseum = missionInfo.colosseum;
    const stakedTokens = missionInfo.colosseum.stakedTokens;
    try {
      await models.Mission.updateOne(
        { _id: missionId },
        { colosseum: { ...colosseum, stakedTokens: stakedTokens + amount } }
      );
    } catch (err) {
      console.log(err);
      return { result: false, message: "Mission Not Found" };
    }
  } catch (err) {
    console.log(err);
    return { result: false, message: "Mission Not Found" };
  }
  return { result: true, message: "Token Staking Success" };
};

const addNewChallenge = async (account: string, mission: string) => {
  try {
    const userInfo = await models.User.findOne({ account });
    const userId = userInfo._id;
    const missionInfo = await models.Mission.findOne({ _id: mission });

    const challengeSchema = {
      challenger: userId,
      mission,
      kind: 1,
      endTime: Date.now() + missionInfo.colosseum.limitSeconds * 1000 + 10000,
    };
    try {
      await models.Challenge.create(challengeSchema);
      const newChallengeInfo = await models.Challenge.findOne(challengeSchema);
      try {
        const challengers = missionInfo.colosseum.challengings
          ? missionInfo.colosseum.challengings
          : [];
        await models.Mission.updateOne(
          { _id: mission },
          {
            colosseum: {
              ...missionInfo.colosseum,
              challengings: [...challengers, { account }],
            },
          }
        );

        return {
          result: true,
          message: "Success add new challenge",
          cId: newChallengeInfo.id,
        };
      } catch (err) {
        console.log(err);
        return { result: false, message: "Failed to load Mission Data" };
      }
    } catch (err) {
      console.log(err);
      return { result: false, message: "Failed add new challenge" };
    }
  } catch (err) {
    console.log(err);
    return { result: false, message: "User Not Found" };
  }
};

const getMissionInfo = async (missionId: string, account: string) => {
  try {
    const mission = await models.Mission.findOne({ _id: missionId });
    const user = await models.User.findOne({ _id: mission.creator });

    let challengedAt: any;
    for (let info of mission.colosseum.challengings) {
      if (info.account === account) {
        if (info.challengeAt === undefined) {
          challengedAt = new Date();
          break;
        } else {
          challengedAt = info.challengedAt;
          break;
        }
      }
    }

    const missionInfo = {
      title: mission.title,
      creator: user.nickName,
      paragraph: mission.paragraph,
      testCases: mission.testCases,
      inputs: mission.inputs,
      output: mission.output,
      endTime: new Date(
        challengedAt.getTime() + mission.colosseum.limitSeconds * 1000
      ),
    };

    const challegersInfo = mission.colosseum.challengings.map(
      (challenger: any) => {
        if (challenger.account === account) {
          return { account: challenger.account, challengedAt };
        } else {
          return { account: challenger.account };
        }
      }
    );

    await models.Mission.findOneAndUpdate(
      { _id: missionId },
      { colosseum: { ...mission.colosseum, challengings: challegersInfo } }
    );

    return { result: true, message: "Success", missionInfo };
  } catch (err) {
    console.log(err);
    return { result: false, message: "Failed to load Database" };
  }
};

const refundProcess = async (missionInfo: any) => {
  // 미션을 팬딩상태로 바꿈 state : 0
  // 도전자가 1명이 있으면 환불, 로그 생성, 도전자 제거
  // 없으면 환불절차 x
  try {
    await models.Mission.findOneAndUpdate(
      { _id: missionInfo.id },
      { state: 0 }
    );
    if (missionInfo.colosseum.challengings !== undefined) {
      const txResult = await ccToken.refundColosseumTxExcution(missionInfo);
      const transferFor: TokenTransferLogFor = {
        collection: "Mission",
        id: missionInfo.id,
      };
      await log.createTokenTransferLog(txResult, 8, transferFor);
      await removeChallenger(missionInfo);
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const removeChallenger = async (missionInfo: any) => {
  try {
    await models.Mission.findOneAndUpdate(
      { _id: missionInfo.id },
      {
        colosseum: {
          ...missionInfo.colosseum,
          stakedTokens: 0,
          challengings: [],
        },
      }
    );
  } catch (err) {
    throw err;
  }
};

const paymentProcess = async (
  senderRawTransaction: any,
  account: string,
  missionId: string
) => {
  try {
    // 수수료 대납 토큰 지불
    const txResult = await ccToken.feeDelegatedTxExcution(senderRawTransaction);
    // challenge 생성, mission.colosseum 업데이트

    const ancResult = await addNewChallenge(account, missionId);

    // 지불 장부 기록
    const transferFor: TokenTransferLogFor = {
      collection: "Challenge",
      id: ancResult.cId,
    };
    await log.createTokenTransferLog(txResult, 1, transferFor);

    //stakedToken 증가
    await stakingToken(missionId, parseInt(fromDb.CCToken.colosseum));
  } catch (err) {
    throw err;
  }
};

export = { post };
