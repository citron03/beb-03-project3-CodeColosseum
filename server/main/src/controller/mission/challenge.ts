import axios from "axios";
import Mission from "../../models/mission";

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
    const missionInfo = await Mission.findOne({ id: missionId });
    const testCase = missionInfo.test.testcase;
    console.log(testCase);
    try {
      const { data } = await axios.post("http://localhost:3003/grading", {
        missionId,
        code,
        testCase,
      });
      res.status(200).send(data);
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: "채점 요청 실패" });
    }
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .send({ message: "테스트 케이스를 가져오는데 실패했습니다." });
  }
};

export = { post };
