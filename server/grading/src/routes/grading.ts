import { code1, testCase1 } from "./../../dummyData/mission1";
import { code2, testCase2 } from "./../../dummyData/mission2";
import { code3, testCase3 } from "./../../dummyData/mission3";
import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
  console.log("채점 요청 받음");
  const { mission, code } = req.body;

  try {
    let testCase;

    if (mission === "mission1") {
      testCase = testCase1;
    } else if (mission === "mission2") {
      testCase = testCase2;
    } else {
      testCase = testCase3;
    }

    const result = await getSolution(mission, code, testCase);

    if (result === 0) {
      res.send({ message: "complete" });
    } else {
      res.send({ message: "fail", failCount: result });
    }
  } catch (err) {
    console.log(err);
    res.send("error");
  }
});

const getSolution = async (
  mission: string,
  code: string,
  testCase: { input: any; output: any }[]
) => {
  const fs = await import("fs");
  const timeStamp = +new Date();
  const fileName = `${timeStamp}.js`;
  fs.writeFileSync(fileName, `${code} exports.solution = solution;`);
  const getJsFile = await require(`../../${fileName}`);

  let falseCount = 0;
  for (let test of testCase) {
    if (
      JSON.stringify(getJsFile.solution(...test.input)) !==
      JSON.stringify(test.output)
    ) {
      falseCount += 1;
    }
  }
  fs.unlinkSync(fileName);
  return falseCount;
};

export default router;
