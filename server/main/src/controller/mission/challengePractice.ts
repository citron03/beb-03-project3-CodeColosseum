import axios from "axios";
import models from "../../models";
const post = async (req: any, res: any) => {
  const { account, missionId, code, reqType } = req.body;

  try {
    const userInfo = await models.User.findOne({ account });
    const missionInfo = await models.Mission.findOne({ _id: missionId });
    const testCases =
      reqType === 1
        ? missionInfo.testCases.filter((testCase: any) => {
            return testCase.isExample === true;
          })
        : missionInfo.testCases;
    const gradingResult = await gradingMission(testCases, code);

    try {
      if (reqType === 2) {
        const challenge = {
          challenger: userInfo._id,
          mission: missionId,
          answerCode: code,
          isPassed: gradingResult.data.failCount === 0 ? true : false,
          PassedCasesRate: `${
            testCases.length - gradingResult.data.failCount
          } / ${testCases.length}`,
          passedCases: gradingResult.data.passedCases,
        };
        await models.Challenge.create(challenge);
      }
      res
        .status(200)
        .send({ message: gradingResult.message, data: gradingResult.data });
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: "DB upload Error" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: "Failed to load data" });
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
