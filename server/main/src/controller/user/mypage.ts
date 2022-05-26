import models from "../../models";

const get = async (req: any, res: any) => {
  // 유저의 모든 정보,활동,기록 을 조회한다. (유저 account 로 이미 디비에 유저가 있음을 확인하고 _id를 알고 요청이 온것이다. 따라서 account에 해당하는 유저가 존재함을 믿고 id를 가지고 요청을 처리한다.)
  // 유저의 missionCreates, missionChallenges 를 보여준다.
  try {
    const user_id = req.params.user_id;
    const userCreatedMissions = await models.Mission.find(
      { creator: user_id },
      "_id title description state createdAt updatedAt"
    );
    const userCallenges = await models.Challenge.find(
      { challenger: user_id },
      "_id mission isPassed PassedCasesRate createdAt updatedAt"
    );
    res
      .status(200)
      .send({
        message: "success",
        data: { userCreatedMissions, userCallenges },
      });
  } catch (error) {
    res.status(500).send(error);
  }
};

export = { get };
