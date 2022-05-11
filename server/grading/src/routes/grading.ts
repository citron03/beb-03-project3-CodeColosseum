import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
  console.log("채점 요청 받음");
  const { code, testCases } = req.body;

  try {
    const result = await getSolution(code, testCases);

    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: "Error" });
  }
});

const getSolution = async (
  code: string,
  testCases: { inputs: any; output: any }[]
) => {
  const fs = await import("fs");
  const timeStamp = +new Date();
  const fileName = `${timeStamp}.js`;
  let getJsFile;
  try {
    fs.writeFileSync(fileName, `${code} exports.solution = solution;`);
    getJsFile = await require(`../../${fileName}`);
  } catch (err) {
    console.log(err);
    fs.unlinkSync(fileName);
    return { message: "Grading Fail, Code Error" };
  }

  let passedCases: Boolean[] = [];
  let failCount = 0;
  for (let i = 0; i < testCases.length; i++) {
    try {
      const userAnswer = JSON.stringify(
        getJsFile.solution(...testCases[i].inputs)
      );
      const testCaseAnswer = JSON.stringify(testCases[i].output);

      if (userAnswer !== testCaseAnswer) {
        failCount += 1;
        passedCases.push(false);
      } else {
        passedCases.push(true);
      }
    } catch (err) {
      console.log(err);
      fs.unlinkSync(fileName);
      return { message: "Grading Fail, Code Error" };
    }
  }
  fs.unlinkSync(fileName);
  return { message: "Grading Complete", data: { failCount, passedCases } };
};

export default router;
