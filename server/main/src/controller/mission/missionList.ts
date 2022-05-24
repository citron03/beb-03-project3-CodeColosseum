import models from "../../models";

const get = async (req: any, res: any) => {
  const { category } = req.query;
  // category가 1이면 콜로세움 문제 리스트, 4면 연습문제 리스트 요청
  // 그 외의 상태에는 접근 불가

  if (category === "1" || category === "4") {
    try {
      const missions = await models.Mission.find({
        state: Number(category),
      });

      const missionList = await Promise.all(
        missions.map(async (mission) => {
          const user = await models.User.findOne({ _id: mission.creator });
          const tokenExpectation = mission.colosseum.stakedTokens;
          const feedback = mission.feedback
            ? mission.feedback
            : { difficulty: 0, quality: 0, participatedNum: 0 };
          return {
            missionId: mission.id,
            title: mission.title,
            creator: user.nickName,
            tokenExpectation: category === 1 ? tokenExpectation * 0.45 : 0,
            challengerList: mission.colosseum.challengings
              ? mission.colosseum.challengings
              : [],
            limitSeconds: mission.colosseum.limitSeconds,
            difficulty:
              feedback.participatedNum === 0
                ? 0
                : feedback.difficulty / feedback.participatedNum,
            quality:
              feedback.participatedNum === 0
                ? 0
                : feedback.quality / feedback.participatedNum,
            participatedNum: feedback.participatedNum,
          };
        })
      );
      res.status(200).send({ message: "Success", data: { missionList } });
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: "Failed to load" });
    }
  } else {
    res.status(404).send({ message: "Permission Error" });
  }
};

export = { get };
