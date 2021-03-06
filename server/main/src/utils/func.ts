import {
  TxExcutionResult,
  randomIntFromInterval,
  calMineralbalance,
  findUserInfoByAccount,
  calFeerate,
  calFee,
} from "../utils";
import models from "../models";
import axios from "axios";
import { mineNft } from "../contract";
import { fromDb, ENV } from "../config";

export default {
  randomIntFromInterval: function (min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },

  // 인자로 받은 컬랙션에서 랜덤한 _id 반환하는 함수
  getRandomId: function (collection: any): Promise<string> {
    return new Promise((resolve, reject) => {
      collection.find().toArray((err: any, docs: any) => {
        if (err) {
          return reject(err);
        }

        const user = docs[randomIntFromInterval(0, docs.length - 1)];
        return resolve(user._id);
      });
    });
  },

  // 트렌젝션 실행 결과 만들기
  makeReturnByTxResult: function (
    txResult: any,
    to: string,
    amount: string,
    resultAt?: Date
  ): TxExcutionResult {
    if (txResult.status === "0x1" || txResult.status === "Submitted") {
      return {
        success: true, // 성공
        result: txResult,
        to,
        amount,
        resultAt,
      };
    } else {
      return {
        success: false, // 실패
        result: txResult,
        resultAt,
      };
    }
  },

  findUserInfoByAccount: async (account: string) => {
    try {
      const userInfo = await models.User.findOne({ account });

      return userInfo;
    } catch (err) {
      console.log(err);
      return null;
    }
  },

  findMissionInfoByMissionId: async (missionId: string) => {
    try {
      const missionInfo = await models.Mission.findOne({ _id: missionId });

      return missionInfo;
    } catch (err) {
      console.log(err);
      return null;
    }
  },

  findChallengeInfoByUserIdAndMissionId: async (
    userId: string,
    missionId: string
  ) => {
    try {
      const challengeInfo = await models.Challenge.findOne({
        challenger: userId,
        mission: missionId,
      });

      return challengeInfo;
    } catch (err) {
      return null;
    }
  },

  gradingMission: async (testCases: [], code: string) => {
    // 채점하고 결과만 반환하는 함수

    //console.log(testCases);
    try {
      if (!ENV.GRADING_SERVER) {throw new Error("GRADING_SERVER is not defined");}
      const { data } = await axios.post(ENV.GRADING_SERVER, {
        code,
        testCases,
      });
      console.log(data);
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
  },

  // 특정 유저의 미네랄 보유량을 Logs 를 통해 계산해서 반환하는 함수
  calMineralbalance: async (userId: String): Promise<Number> => {
    try {
      // code = "mining" 인 모든 로그의 amount 들의 합
      const miningAmount = (
        await models.MineralLog.find({ code: "mining", user: userId })
      ).reduce((acc, cur) => {
        return acc + cur.amount;
      }, 0);
      // code = "trading" 인 모든 로그의 amount 들의 합
      const tradingAmount = (
        await models.MineralLog.find({ code: "trading", user: userId })
      ).reduce((acc, cur) => {
        return acc + cur.amount;
      }, 0);
      // if (miningAmount < tradingAmount) {throw new Error("miningAmount < tradingAmount")}
      // 두 amount 차이를 반환
      return miningAmount - tradingAmount;
    } catch (err) {
      throw err;
    }
  },

  // User 도큐먼트에 미네랄 잔약을 최신화하는 함수. 최신화 된 도큐먼트갹체를 반환
  updateUserMineralBalance: async (userId: String): Promise<Object> => {
    try {
      const balance = await calMineralbalance(userId);
      const updatedUser = await models.User.findOneAndUpdate(
        { _id: userId },
        { mineral: balance },
        { new: true }
      );
      return updatedUser;
    } catch (err) {
      throw err;
    }
  },

  getWithdrawableAmount: async (userId: string) => {
    try {
      const rewardLog = await models.MineOwnerRewardLog.find({
        user: userId,
      });

      const withdrawableAmount = rewardLog.reduce((pre, cur) => {
        if (cur.code === "reward") {
          return (pre += cur.amount);
        } else {
          return (pre -= cur.amount);
        }
      }, 0);

      return withdrawableAmount;
    } catch (err) {
      throw err;
    }
  },

  editMineOwnerRewardLog: async (code: string, missionId: string) => {
    // mission id로 nft 정보 조회
    const missionInfo = await models.Mission.findOne({ _id: missionId });
    // 현 nft의 owner를 추출
    const nftOwner = await mineNft.checkMineOwner(missionInfo);
    const userInfo = await findUserInfoByAccount(nftOwner);
    const rewardLogSchema = {
      code,
      nft: missionId,
      user: userInfo.id,
      amount: fromDb.CCToken.token,
    };
    await models.MineOwnerRewardLog.create(rewardLogSchema);
  },

  // 수수료율 계산함수
  calFeerate: (value: number):number => {
    return Math.pow(0.9985362, value-2000) + 1;
  },

  // 수수료 계산함수
  calFee: (value: number):number => {
    return value * calFeerate(value) / 100;
  },

  // 수수료 제한 amount 계산함수
  calAmount: (value: number):number => {
    return value - calFee(value);
  },
};
