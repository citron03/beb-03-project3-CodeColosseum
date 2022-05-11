import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
  console.log("채점 요청 받음");
  const { code, testCases } = req.body;

  try {
    const result = await getSolution(code, testCases);

    res.status(200).send({
      data: { failCount: result.falseCount, passedCases: result.passedCases },
    });
  } catch (err) {
    console.log(err);
    res.status(400).send("error");
  }
});

const getSolution = async (
  code: string,
  testCases: { inputs: any; output: any }[]
) => {
  const fs = await import("fs");
  const timeStamp = +new Date();
  const fileName = `${timeStamp}.js`;
  fs.writeFileSync(fileName, `${code} exports.solution = solution;`);
  const getJsFile = await require(`../../${fileName}`);

  let passedCases: Boolean[] = [];
  let falseCount = 0;
  for (let i = 0; i < testCases.length; i++) {
    if (
      JSON.stringify(getJsFile.solution(...testCases[i].inputs)) !==
      JSON.stringify(testCases[i].output)
    ) {
      falseCount += 1;
      passedCases.push(false);
    } else {
      passedCases.push(true);
    }
  }
  fs.unlinkSync(fileName);
  return { falseCount, passedCases };
};

export default router;
