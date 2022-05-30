import models from "../../models";
import axios from "axios";
import { ENV } from "../../config";
// 문제 출제
// 1. 레퍼런스 코드와 테스트 케이스로 확인
//  1-1. 채점에 성공했고 테스트 케이스가 모두 통과됨. 2로 이동
//  1-2. 실패 시 출제 실패 반환 (refCode or testcase 오류)
// 2. 문제를 DB에 저장
//  2-1. 성공 시 문제 id 전송
//  2-2. 실패 시 서버 오류 에러 반환
const post = async (req: any, res: any) => {
  const {
    account,
    title,
    description,
    paragraph,
    inputs,
    output,
    refCode,
    testCases,
    limitSeconds,
    openTime,
  } = req.body;

  // openTime : 0 ~ 23
  // 오늘 날짜에 하루 더하고 openTime의 숫자를 적용해서 저장하기
  const year = new Date().getFullYear();
  const month = new Date().getMonth();
  const date = new Date().getDate() + 1;
  const hour = openTime;

  // 1. 레퍼런스 코드와 테스트 케이스로 확인
  try {
    if (!ENV.GRADING_SERVER) {throw new Error("GRADING_SERVER is not defined");}
    const { data } = await axios.post(ENV.GRADING_SERVER, {
      code: refCode,
      testCases,
    });
    // 1-1. 채점에 성공했고 테스트 케이스가 모두 통과됨.
    if (data.data && data.data.failCount === 0) {
      // 2. 문제를 DB에 저장
      try {
        const user = await models.User.findOne({ account });
        const userId = user._id;
        const missionSchema = {
          title,
          description,
          paragraph,
          creator: userId,
          state: 1,
          colosseum: {
            stakedTokens: 0,
            limitSeconds,
          },
          inputs,
          output,
          refCode,
          testCases,
          feedback: { difficulty: 0, quality: 0, participatedNum: 0 },
          openTime: new Date(year, month, date, hour),
        };
        try {
          await models.Mission.create(missionSchema);
          const newMission = await models.Mission.findOne(missionSchema);
          res.status(200).send({
            message: "Upload Success",
            data: { newMissionId: newMission._id },
          });
        } catch (err) {
          console.log(err);
          res.status(400).send({ message: "Upload Failed" });
        }
      } catch (err) {
        console.log(err);
        res.status(400).send({ message: "User not found" });
      }
    } else {
      // 1-2. 채점에 실패했거나 통과하지 못한 테스트 케이스가 있음.
      throw new Error("Upload Failed, Grading Failed or TestCase Error");
    }
  } catch (err: any) {
    console.log(err);
    res.status(400).send({ message: err.message });
  }
};

export = { post };
