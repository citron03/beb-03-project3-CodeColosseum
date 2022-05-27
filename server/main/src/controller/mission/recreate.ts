import models from "../../models";
import { findMissionInfoByMissionId } from "../../utils";

const post = async (req: any, res: any) => {
  const { missionId, openTime } = req.body;
  const year = new Date().getFullYear();
  const month = new Date().getMonth();
  const date = new Date().getDate() + 1;
  const hour = openTime;
  try {
    await models.Mission.findOneAndUpdate(
      { _id: missionId },
      { openTime: new Date(year, month, date, hour), state: 1 }
    );
    res.status(200).send({ message: "Success to Recreate" });
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: "Failed to Update DB" });
  }
};

export = { post };
