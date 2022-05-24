import models from "../../models";
import { findUserInfoByAccount } from "../../utils";

const get = async (req: any, res: any) => {
  // 로그를 조회해서 보상 토큰 계산
  // 토큰 전송
  // 토큰 전송 로그 기록
  const account = req.params.account;

  try {
    const userInfo = await findUserInfoByAccount(account);
    const rewardLog = await models.MineOwnerRewardLog.find({
      user: userInfo.id,
    });

    // 로그를 조회해서 보상 토큰 계산
    try {
      const withdrawableAmount = rewardLog.reduce((pre, cur) => {
        if (cur.code === "reward") {
          return (pre += cur.amount);
        } else {
          return (pre -= cur.amount);
        }
      });

      if (withdrawableAmount < 500) {
        return res.status(400).send({ message: "Not enough Tokens" });
      }

      // 토큰 전송
      // const txResult = await transferTokens(account, withdrawableAmount*0.9);

      try {
        // 토큰 전송 로그 기록
        // const transferFor: TokenTransferLogFor = {
        //  collection: "User",
        //  id: userInfo.id,
        // };
        // await createTokenTransferLog(txResult, 4, transferFor);

        res.status(200).send({
          message: "Success to withdraw tokens",
          data: { withdrawAmount: withdrawableAmount * 0.9 },
        });
      } catch (err) {
        console.log(err);
        res.status(400).send({ message: "failed to edit token transfer log" });
      }
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: "failed to transfer" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: "failed to load DB" });
  }
};

export = { get };
