import Mission from "../../models/mission";
import User from "../../models/user";

const post = async (req: any, res: any) => {
  const { account, title, description, explanation, code, argTypes, testcase } =
    req.body;

  try {
    const user = await User.findOne({ address: account });
    const userId = user._id;
    const missionSchema = {
      title,
      description,
      paragraph: explanation,
      creator: userId,
      test: {
        testcase,
        refCode: code,
        argTypes,
      },
    };
    try {
      await Mission.create(missionSchema);
      const newMission = await Mission.findOne(missionSchema);
      res
        .status(200)
        .send({ message: "미션 등록 성공", newMissionId: newMission._id });
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: "미션 등록 실패" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: "error" });
  }
};

const get = async (req: any, res: any) => {
  const missionId = req.params.mission_id;

  try {
    const mission = await Mission.findOne({ id: missionId });
    const user = await User.findOne({ id: mission.creator });
    const body = {
      title: mission.title,
      creator: user.nickName,
      explanation: mission.paragraph,
      testcase: mission.test.testcase,
    };
    res.status(200).send(body);
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: "문제를 불러오는데 실패했습니다." });
  }
};

export = { post, get };
