import { mineNft, log } from "../../contract";
import models from "../../models";
import { findUserInfoByAccount, TokenTransferLogFor } from "../../utils";

const get = async (req: any, res: any) => {
  // 로그를 조회해서 보상 토큰 계산
  // 토큰 전송
  // 토큰 전송 로그 기록
  const account = req.params.account;

  try {
    const userInfo = await findUserInfoByAccount(account);

    // 로그를 조회해서 보상 토큰 계산
    try {
      // 토큰 전송
      const txResult = await mineNft.mineOwnerRewardWithdrawTxExcution(
        account
      );

      try {
        // 토큰 전송 로그 기록
        const transferFor: TokenTransferLogFor = {
          collection: "MineOwnerRewardLog",
          id: userInfo.id,
        };
        await log.createTokenTransferLog(txResult, 4, transferFor);

        res.status(200).send({
          message: "Success to withdraw tokens",
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
