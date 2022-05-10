import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
  console.log("채점 요청 받음");
  const { missionId, code, testCases } = req.body;

  try {
    const result = await getSolution(missionId, code, testCases);

    if (result.falseCount === 0) {
      res.status(200).send({ message: "complete" });
    } else {
      res.status(200).send({ message: "fail", failCount: result.falseCount, passedCases: result.passedCases });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send("error");
  }
});

const getSolution = async (
  mission: string,
  code: string,
  testCases: { input: any; output: any }[]
) => {
  const fs = await import("fs");
  const timeStamp = +new Date();
  const fileName = `${timeStamp}.js`;
  fs.writeFileSync(fileName, `${code} exports.solution = solution;`);
  const getJsFile = await require(`../../${fileName}`);

  let passedCases : Boolean[] = []
  let falseCount = 0;
  for (let testCase of testCases) {
    if (
      JSON.stringify(getJsFile.solution(...testCase.input)) !==
      JSON.stringify(testCase.output)
    ) {
      falseCount += 1;
      passedCases.push(false);
    }
    else {
      passedCases.push(true);
    }
  }
  fs.unlinkSync(fileName);
  return {falseCount, passedCases};
};

export default router;
