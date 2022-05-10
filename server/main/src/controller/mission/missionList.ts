import Mission from "../../models/mission";
import User from "../../models/user";

const get = async (req: any, res: any) => {
  try {
    const allMission = await Mission.find();
    const missionList = await Promise.all(
      allMission.map(async (mission) => {
        const user = await User.findOne({ id: mission.creator });
        return {
          title: mission.title,
          creator: user.nickName,
        };
      })
    );
    res.status(200).send({ missionList });
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: "문제를 불러오는데 실패했습니다." });
  }
};

export = { get };
