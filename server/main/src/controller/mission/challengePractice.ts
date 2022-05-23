import axios from "axios";
import models from "../../models";
import { gradingMission } from "../../utils";
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

export = { post };
