import models from "../../models";

const get = async (req: any, res: any) => {
  try {
    const allMission = await models.Mission.find();
    const missionList = await Promise.all(
      allMission.map(async (mission) => {
        const user = await models.User.findOne({ _id: mission.creator });
        return {
          missionId: mission.id,
          title: mission.title,
          creator: user.nickName,
        };
      })
    );
    res.status(200).send({ message: "Success", data: { missionList } });
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: "Failed to load" });
  }
};

export = { get };
