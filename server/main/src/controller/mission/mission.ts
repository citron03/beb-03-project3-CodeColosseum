import models from "../../models";

const post = async (req: any, res: any) => {
  const {
    account,
    title,
    description,
    paragraph,
    inputs,
    output,
    refCode,
    testCases,
  } = req.body;

  try {
    const user = await models.User.findOne({ account });
    const userId = user._id;
    const missionSchema = {
      title,
      description,
      paragraph,
      creator: userId,
      inputs,
      output,
      refCode,
      testCases,
    };
    try {
      await models.Mission.create(missionSchema);
      const newMission = await models.Mission.findOne(missionSchema);
      res.status(200).send({
        message: "Upload Success",
        data: { newMissionId: newMission._id },
      });
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: "Upload Failed" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: "Upload Failed" });
  }
};

const get = async (req: any, res: any) => {
  const missionId = req.params.mission_id;

  try {
    const mission = await models.Mission.findOne({ _id: missionId });
    const user = await models.User.findOne({ _id: mission.creator });
    const missionInfo = {
      title: mission.title,
      creator: user.nickName,
      paragraph: mission.paragraph,
      testCases: mission.testCases,
    };
    res.status(200).send({ message: "Success", data: missionInfo });
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: "Failed to load" });
  }
};

export = { post, get };
