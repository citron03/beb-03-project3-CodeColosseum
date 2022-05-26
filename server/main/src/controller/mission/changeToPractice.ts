import axios from "axios";
import { mineNft } from "../../contract";
import models from "../../models";

const post = async (req: any, res: any) => {
  const { account, missionId } = req.body;

  try {
    const missionInfo = await models.Mission.findOne({ _id: missionId });
    const userInfo = await models.User.findOne({ _id: missionInfo.creator });
    if (account === userInfo.account && missionInfo.state === 2) {
      try {
        // TODO
        // 민팅하기

        // 메타데이터 업로드
        const metaDataUri = await mineNft.uploadMissionMetadata(missionInfo);
        // 업로드 확인
        const uploadCheck = await axios.get(metaDataUri);
        console.log(uploadCheck);
        if (!uploadCheck) {
          throw new Error();
        }
        try {
          const mintResult = await mineNft.mineOwnershipNftMint(
            account,
            missionId,
            metaDataUri
          );

          if (mintResult.result.status === "Submitted") {
            await models.Mission.findOneAndUpdate(
              { _id: missionId },
              { state: 3, mineOwnershipNft: mintResult.mineOwnershipNft }
            );
          } else {
            throw new Error();
          }
        } catch (err) {
          console.log(err);
          res.status(400).send({ message: "Failed Minting" });
        }
      } catch (err) {
        console.log(err);
        res.status(400).send({ message: "Failed Upload Meta Data" });
      }
    } else {
      throw new Error("Not Owner Or Not State 2");
    }

    // 민팅 완료 후 연습 문제로 전환
    try {
      await models.Mission.findOneAndUpdate({ _id: missionId }, { state: 4 });
      res.status(200).send({ message: "Success Change to Practice mission" });
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: "DB update Error" });
    }
  } catch (err: any) {
    console.log(err);
    res.status(400).send({ message: err.message });
  }
};

export = { post };
