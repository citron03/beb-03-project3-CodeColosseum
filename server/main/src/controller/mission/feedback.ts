import models from "../../models";
import {
  findChallengeInfoByUserIdAndMissionId,
  findMissionInfoByMissionId,
  findUserInfoByAccount,
} from "../../utils";

const post = async (req: any, res: any) => {
  const { account, missionId, quality, difficulty } = req.body;

  // account가 해당 mission을 풀었는지 한 번 검사 - challenge 조회
  // mission feedback 업데이트

  try {
    const userInfo = await findUserInfoByAccount(account);
    const missionInfo = await findMissionInfoByMissionId(missionId);
    const challengeInfo = await findChallengeInfoByUserIdAndMissionId(
      userInfo.id,
      missionInfo.id
    );
    if (userInfo === null || missionInfo === null || challengeInfo === null) {
      throw new Error("Failed to load DB");
    }

    if (challengeInfo.isPassed) {
      try {
        await models.Mission.findOneAndUpdate(
          { _id: missionId },
          {
            feedback: {
              difficulty: missionInfo.feedback.difficulty + difficulty,
              quality: missionInfo.feedback.quality + quality,
              participatedNum: missionInfo.feedback.participatedNum + 1,
            },
          }
        );
        res.status(200).send({ message: "Successed reflect feedback" });
      } catch (err) {
        console.log(err);
        res.status(400).send({ message: "Failed to Update DB" });
      }
    } else {
      throw new Error("First you have to go through the mission.");
    }
  } catch (err: any) {
    console.log(err);
    res.status(400).send({ message: err.message });
  }
};

export = { post };
