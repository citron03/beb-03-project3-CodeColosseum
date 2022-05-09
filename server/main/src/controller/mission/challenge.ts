import axios from "axios";

const post = async (req: any, res: any) => {
  const { account, missionId, code } = req.body;
  // DB 연결 이후 로직
  // 1. missionId로 DB에서 test case를 가져옴
  // 2. code와 test case를 채점 서버로 보냄 post
  // 3. 결과를 받아 클라이언트로 전송

  // TEST용 임시 로직
  // 1. missionId와 code를 채점 서버로 보냄 post
  // 2. 결과를 받아 클라이언트로 전송

  try {
    const { data } = await axios.post("http://localhost:3003/grading", {
      mission: missionId,
      code,
    });
    res.send(data);
  } catch (err) {
    res.send({ message: "채점 요청 실패" });
    console.log(err);
  }
};

export = { post };
