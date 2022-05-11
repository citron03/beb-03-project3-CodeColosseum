import axios from "axios";
import models from "../../models";

const post = async (req: any, res: any) => {
  const { account, missionId, code } = req.body;
  // TEST용 임시 로직
  // 1. missionId와 code를 채점 서버로 보냄 post
  // 2. 결과를 받아 클라이언트로 전송
  /*
  try {
    const { data } = await axios.post("http://localhost:3003/grading", {
      mission: missionId,
      code,
    });
    res.status(200).send(data);
  } catch (err) {
    res.status(400).send({ message: "채점 요청 실패" });
    console.log(err);
  }
  */
  // DB 연결 이후 로직
  // 1. missionId로 DB에서 test case를 가져옴
  // 2. code와 test case를 채점 서버로 보냄 post
  // 3. 결과를 받아 클라이언트로 전송

  try {
    const missionInfo = await models.Mission.findOne({ _id: missionId });
    const testCases = missionInfo.testCases;
    //console.log(testCases);
    try {
      const { data } = await axios.post("http://localhost:3003/grading", {
        code,
        testCases,
      });
      // console.log(data);
      if (data.data) {
        const userInfo = await models.User.findOne({ account });
        const challenge = {
          challenger: userInfo._id,
          mission: missionId,
          answerCode: code,
          isPassed: data.data.failCount === 0 ? true : false,
          PassedCasesRate: `${testCases.length - data.data.failCount} / ${
            testCases.length
          }`,
          passedCases: data.data.passedCases,
        };
        await models.Challenge.create(challenge);
        res.status(200).send({ message: data.message, data: data.data });
      } else {
        res.status(200).send({ message: data.message });
      }
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: "Grading Failed" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: "Failed to load testcases" });
  }
};

export = { post };
