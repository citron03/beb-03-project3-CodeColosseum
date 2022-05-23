import { TxExcutionResult, randomIntFromInterval } from "../utils";
import models from "../models";
import axios from "axios";

export default {

  randomIntFromInterval: function (min:number, max:number):number {
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
  makeReturnByTxResult: function (txResult: any, to: string, amount: string, resultAt?: Date): TxExcutionResult {
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
  },


  // 특정 유저의 미네랄 보유량을 Logs 를 통해 계산해서 반환하는 함수
  calMineralbalance: async (userId:String|Object):Promise<Number> => {
    try {
      
    return 0
    } catch (err) {throw err;};
  },

};
