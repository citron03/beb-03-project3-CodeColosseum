import { ccToken, log } from "../../contract";
import models from "../../models";
import {
  findUserInfoByAccount,
  TokenTransferLogFor,
  updateUserMineralBalance,
} from "../../utils";

const get = async (req: any, res: any) => {
  const account = req.params.account;
  // mining mineral log를 통해 잔액 확인
  // 500 이상이면 가진 미네랄만큼 다 빼는 로그 기록
  // 토큰 전송해주고, 토큰 전송 로그 기록

  try {
    const userInfo = await findUserInfoByAccount(account);

    // 해당 유저의 미네랄 로그 조회
    const mineralLog = await models.MineralLog.find({ user: userInfo.id });

    // 교환 가능한 미네랄을 로그를 통해 한 번 더 점검
    const tradeableMineral = mineralLog.reduce((pre, cur) => {
      if (cur.code === "mining") {
        return (pre += cur.amount);
      } else {
        return (pre -= cur.amount);
      }
    }, 0);
    if (tradeableMineral < 500) {
      throw new Error();
    }
    try {
      // 토큰 전송
      const txResult = await ccToken.mineralTradingExcution(account);

      try {
        // 유저 미네랄 보유량 갱신
        await updateUserMineralBalance(userInfo.id);

        try {
          // 미네랄 로그에 교환 기록
          const mineralLogSchema = {
            code: "trading",
            user: userInfo.id,
            amount: tradeableMineral,
          };
          await models.MineralLog.create(mineralLogSchema);

          try {
            // 토큰 전송 로그 기록
            const transferFor: TokenTransferLogFor = {
              collection: "MineralLog",
              id: userInfo.id,
            };
            await log.createTokenTransferLog(txResult, 5, transferFor);

            res.status(200).send({
              message: "Success trading tokens",
              data: { tradingAmount: tradeableMineral * 0.9 },
            });
          } catch (err) {
            console.log(err);
            res
              .status(400)
              .send({ message: "failed to create token transfer log" });
          }
        } catch (err) {
          console.log(err);
          res.status(400).send({ message: "failed to edit mineral log" });
        }
      } catch (err) {
        console.log(err);
        res
          .status(400)
          .send({ message: "failed to update user mineral balance" });
      }
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: "failed to token transfer" });
    }
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .send({ message: "failed to load DB or Not enough Minerals" });
  }
};

export = { get };
