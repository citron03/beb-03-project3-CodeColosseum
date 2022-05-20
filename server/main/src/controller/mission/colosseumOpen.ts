import models from "../../models";
import contract from "../../contract";

// const obj = await contract.tokenPaymentResDataColosseum();
// response.send({data:obj})

// const result = await contract.feeDelegatedTxExcution(senderRawTransaction)

/*
1. 최초 요청 or 재요청 - signObj 없음. account로 미션 참여 여부 확인.
   참여자가 아니라면 토큰 지불하도록 응답 (signObj 전달)
2. signObj 같이 옴 -> signObj 를 사용해 토큰 지불
   지불에 성공 - 지불 장부에 기록. stakedToken 증가. challenge 데이터 생성. 문제 데이터 전송
   지불에 실패 - 토큰 지불하도록 응답 (서버 에러 or txHash 문제)
*/
const post = async (req: any, res: any) => {
  const { account, senderRawTransaction } = req.body;
  const missionId = req.params.mission_id;

  if (senderRawTransaction === undefined) {
    // 최초 요청 or 재요청
    const checkResult = await checkChallengers(account, missionId);
    if (checkResult.result === 1) {
      // 이미 도전 중인 사람
      const gmResult = await getMissionInfo(missionId, account);
      if (gmResult.result) {
        return res
          .status(200)
          .send({
            message: "Success",
            data: { isPayment: true, ...gmResult.missionInfo },
          });
      } else {
        return res.status(400).send({ message: gmResult.message });
      }
    } else if (checkResult.result === 2) {
      // 토큰 내야하는 사람
      const newTxObj = await contract.tokenPaymentResDataColosseum();
      return res.status(200).send({
        message: checkResult.message,
        data: { isPayment: false, txSignReqObj: newTxObj },
      });
    } else {
      // 디비 조회 실패
      return res.status(400).send({ message: checkResult.message });
    }
  } else {
    // senderRawTransaction과 함께 요청
    // 수수료 대납 토큰 지불
    const txResult = await contract
      .feeDelegatedTxExcution(senderRawTransaction)
      .then((result) => console.log(typeof result));

    // TODO : 지불 장부 기록, challenge 생성, mission.colosseum 업데이트, stakedToken 증가,

    console.log("지불장부에 기록 시작");
    // 지불 장부 기록
    console.log("지불장부에 기록 완료");

    console.log("challenge 데이터 생성 시작");
    const ancResult = await addNewChallenge(account, missionId);
    if (!ancResult.result) {
      return res.status(400).send({ message: ancResult.message });
    }
    console.log("challenge 데이터 생성 완료");

    console.log("stakedToken 증가 시작");
    const amount = 100; // 임시
    const stResult = await stakingToken(missionId, amount);
    if (!stResult.result) {
      return res.status(400).send({ message: stResult.message });
    }
    console.log("stakedToken 증가 완료");

    console.log("문제 데이터 전송");
    const gmResult = await getMissionInfo(missionId, account);
    if (gmResult.result) {
      return res
        .status(200)
        .send({
          message: "Success",
          data: { isPayment: true, ...gmResult.missionInfo },
        });
    } else {
      return res.status(400).send({ message: gmResult.message });
    }
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
/*
const writeTokenPaymentLog = async (txResult: any, missionId: string) => {
  try {
    const user = await models.User.findOne({ txResult.result.account });
    const userId = user.id;
    const tokenPaymentLogSchema = {
      txHash : txResult.result.transactionHash,
      from: userId,
      to: "628640f3296e0e06e8be33ec",
      for: { collection: 1, id: missionId },
      token: "CCT",
      amount: 100,
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
*/
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

      try {
        const challengedAt = new Date();
        const challengers = missionInfo.colosseum.challengings
          ? missionInfo.colosseum.challengings
          : [];
        await models.Mission.updateOne(
          { _id: mission },
          {
            colosseum: {
              ...missionInfo.colosseum,
              challengings: [...challengers, { account, challengedAt }],
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
    const user = await models.User.findOne({ _id: mission.creator });

    let challengedAt;
    for (let info of mission.colosseum.challengings) {
      if (info.account === account) {
        challengedAt = info.challengedAt;
        break;
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

    return { result: true, message: "Success", missionInfo };
  } catch (err) {
    console.log(err);
    return { result: false, message: "Failed to load Database" };
  }
};

const checkChallengers = async (account: string, missionId: string) => {
  try {
    const mission = await models.Mission.findOne({ _id: missionId });

    let userChallengeInfo;
    if (mission.colosseum.challengings) {
      for (let info of mission.colosseum.challengings) {
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

export = { post };
