import axios from "axios";
import { isObjectIdOrHexString, isValidObjectId } from "mongoose";
import models from "../../models";

/*
1. 문제 페이지 요청
2. txHash가 같이 왔다 -> 방금 지불한 사람
2-1. txHash를 조회해서 지불 확인
2-2. 검증 후 장부 추가, 도전자에 추가
3. txHash가 같이 오지 않았다 -> 이미 지불했거나 처음 누른 사람
3-1. 도전자 목록에 있는지 확인 -> 있으면 문제 페이지 전송
3-2. 도전자 목록에 없으면 -> 지불하도록 응답
*/
const post = async (req: any, res: any) => {
  const { account, txHash } = req.body;
  const missionId = req.params.mission_id;

  if (txHash) {
    console.log("지불 검증 시작");
    const { confirmResult, amount, message } = await paymentConfirm(
      txHash,
      account
    );
    if (!confirmResult) {
      return res.status(400).send({ message });
    }
    console.log("지불 검증 완료");

    console.log("stakedToken 증가");
    const stResult = await stakingToken(missionId, amount);
    if (!stResult.result) {
      return res.status(400).send({ message: stResult.message });
    }
    console.log("stakedToken 증가 완료");

    console.log("지불장부에 기록");
    const wtpResult = await writeTokenPaymentLog(
      txHash,
      account,
      amount,
      missionId
    );
    if (!wtpResult.result) {
      return res.status(400).send({ message: wtpResult.message });
    }
    console.log("지불장부에 기록 완료");

    console.log("challenge 데이터 생성");
    const ancResult = await addNewChallenge(account, missionId);
    if (!ancResult.result) {
      return res.status(400).send({ message: ancResult.message });
    }
    console.log("challenge 데이터 생성 완료");

    console.log("문제 데이터 전송");
    const gmResult = await getMissionInfo(missionId, account);
    if (gmResult.result) {
      return res
        .status(200)
        .send({ message: "Success", data: gmResult.missionInfo });
    } else {
      return res.status(400).send({ message: gmResult.message });
    }
  } else {
    // 도전자 목록 확인
    const checkResult = await checkChallengers(account, missionId);
    if (checkResult.result === 1) {
      // 이미 도전 중인 사람
      const gmResult = await getMissionInfo(missionId, account);
      if (gmResult.result === false) {
        return res.status(400).send({ message: gmResult.message });
      }
      return res
        .status(200)
        .send({ message: "Success", data: gmResult.missionInfo });
    } else if (checkResult.result === 2) {
      // 토큰 내야하는 사람
      return res.status(200).send({ message: checkResult.message });
    } else {
      // 디비 조회 실패
      return res.status(400).send({ message: checkResult.message });
    }
  }
};

const paymentConfirm = async (txHash: string, account: string) => {
  const confirmResult = true;
  const amount = 0;

  //TODO
  // txHash를 조회해서
  // 보낸 사람(account), 받은 사람(server account), 전송 토큰 확인
  // 모두 확인 되면 {true, 전송된 토큰량}, 조회되지 않으면 {false, 0} 반환
  //   const txInfo = await axios.get(
  //     `https://th-api.klaytnapi.com/v2/transfer/tx/${txHash}`
  //   );

  return {
    confirmResult,
    amount,
    message: "Failed to verify token payment history.",
  };
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

const writeTokenPaymentLog = async (
  txHash: string,
  account: string,
  amount: number,
  missionId: string
) => {
  try {
    const user = await models.User.findOne({ account });
    const userId = user.id;
    const tokenPaymentLogSchema = {
      txHash,
      from: userId,
      to: "627c8c1b6860b92a3770c740",
      item: { collection: 1, id: missionId },
      token: "colosseum",
      amount,
    };
    try {
      await models.TokenPaymentLog.create(tokenPaymentLogSchema);
      return { result: true, message: "completed write tokenpayment log" };
    } catch (err) {
      console.log(err);
      return { result: false, message: "failed write tokenpayment log" };
    }
  } catch (err) {
    console.log(err);
    return { result: false, message: "failed to load user info" };
  }
};

const addNewChallenge = async (account: string, mission: string) => {
  try {
    const userInfo = await models.User.findOne({ account });
    const userId = userInfo._id;
    const challengeSchema = {
      challenger: userId,
      mission,
      kind: 1,
    };
    try {
      await models.Challenge.create(challengeSchema);

      try {
        const missionInfo = await models.Mission.findOne({ _id: mission });
        const challengers = missionInfo.colosseum.challengings
          ? missionInfo.colosseum.challengings
          : [];
        const now = Date.now();
        const startTime = new Date(now);
        const endTime = new Date(
          now + missionInfo.colosseum.limitSeconds * 1000
        );
        await models.Mission.updateOne(
          { _id: mission },
          {
            colosseum: {
              ...missionInfo.colosseum,
              challengings: [...challengers, { userId, startTime, endTime }],
            },
          }
        );

        return { result: true, message: "Success add new challenge" };
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
    const user = await models.User.findOne({ account });

    let userChallengeInfo;
    for (let info of mission.colosseum.challengings) {
      //console.log(info.userId.toString(), user.id.toString());
      if (info.userId.toString() === user.id.toString()) {
        userChallengeInfo = info;
        break;
      }
    }
    console.log(userChallengeInfo);
    const missionInfo = {
      title: mission.title,
      creator: user.nickName,
      paragraph: mission.paragraph,
      testCases: mission.testCases,
      inputs: mission.inputs,
      output: mission.output,
      startTime: userChallengeInfo.startTime,
      endTime: userChallengeInfo.endTime,
    };

    return { result: true, message: "Success", missionInfo };
  } catch (err) {
    console.log(err);
    return { result: false, message: "Failed to load Database" };
  }
};

const checkChallengers = async (account: string, missionId: string) => {
  try {
    const mission = await models.Mission.findOne({ _id: missionId });
    const user = await models.User.findOne({ account });

    let userChallengeInfo;
    if (mission.colosseum.challengings) {
      for (let info of mission.colosseum.challengings) {
        if (info.userId.toString() === user.id.toString()) {
          userChallengeInfo = info;
          break;
        }
      }
    }
    console.log(userChallengeInfo);
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

export = { post };
