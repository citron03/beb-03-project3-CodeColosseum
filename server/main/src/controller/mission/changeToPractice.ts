import models from "../../models";

const post = async (req: any, res: any) => {
  const { account, missionId } = req.body;

  try {
    const missionInfo = await models.Mission.findOne({ _id: missionId });
    const userInfo = await models.User.findOne({ _id: missionInfo.creator });
    if (account === userInfo.account && missionInfo.state === 3) {
      try {
        await models.Mission.findOneAndUpdate({ _id: missionId }, { state: 4 });
        res.status(200).send({ message: "Success Change to Practice mission" });
      } catch (err) {
        console.log(err);
        res.status(400).send({ message: "DB update Error" });
      }
    } else {
      throw new Error("Not Owner Or Not NFT");
    }
  } catch (err: any) {
    console.log(err);
    res.status(400).send({ message: err.message });
  }
};

export = { post };
