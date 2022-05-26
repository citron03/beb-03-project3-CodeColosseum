import express from "express";
import ChildProcess from "child_process";

const router = express.Router();

router.post("/", async (req, res) => {
  const { code, testCases } = req.body;

  let failCount = 0;
  let passedCases = [];

  for (let testCase of testCases) {
    const fs = await import("fs");
    const timeStamp = +new Date();
    const fileName = `${timeStamp}.js`;

    fs.writeFileSync(
      fileName,
      `${code} try{console.log(solution(${testCase.inputs}))}catch(err){console.log(err.name)};`
    );

    try {
      const userAnswer = ChildProcess.execSync(`node ${fileName}`, {
        timeout: 3000,
      });

      if (
        JSON.parse(JSON.stringify(userAnswer.toString().trim())) !==
        JSON.stringify(JSON.parse(testCase.output))
      ) {
        failCount += 1;
        passedCases.push(false);
      } else {
        passedCases.push(true);
      }
      fs.unlinkSync(fileName);
    } catch (err: any) {
      console.log(err);
      fs.unlinkSync(fileName);
      return res.status(200).send({ message: "logic error or time over" });
    }
  }
  res
    .status(200)
    .send({ message: "Grading Complete", data: { failCount, passedCases } });
});

export default router;
