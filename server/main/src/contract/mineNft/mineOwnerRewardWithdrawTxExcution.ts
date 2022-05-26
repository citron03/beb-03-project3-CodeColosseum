import { caver, fromDb } from "../../config";
import models from "../../models";
import {
  getWithdrawableAmount,
  makeReturnByTxResult,
  TxExcutionResult,
} from "../../utils";

/*
광산 소유자가 보상받은 리워드(토큰)을 개인 지갑으로 출금하는 트렌젝션 실행하는 함수.
인자로 유저acc 넣으면 로그 확인해서 트렌젝션 일으키고 트렌젝션 결과 객체 리턴
(트렌젝션이 성공했으면 이후, mineOwnerRewardLog 의 출금 로그를 바로 생성할것!)
(생성된 출금로그를 가지고 트렌젝션 로그 생성함수(createTokenTransferLog)를 바로 실행할것!)
*/
export default async (userAccount: string): Promise<TxExcutionResult> => {
  try {
    // 유저가 존재하는지 검증 된상태임
    const user = await models.User.findOne({ account: userAccount });
    // 잔액 검사
    // 주용님 balance 구해오는 부분 구현해주세요.
    const balance = await getWithdrawableAmount(user.id);
    if (parseInt(balance) < fromDb.CCToken.tokenLimit) {
      throw new Error("임시로 설정해 놓은 출금 리미트 보다 잔액이 적음");
    }
    // 트렌젝션 실행
    const contractAddr = fromDb.CCToken.address;
    const from = fromDb.account.CoCo;
    let resultAt;
    const result = await caver.kas.kip7
      .transfer(contractAddr, from, userAccount, balance)
      .then((r: any) => {
        r.from = from;
        r.feePayer = from;
        resultAt = new Date();
        return r;
      })
      .catch((e: any) => {
        resultAt = new Date();
        return e;
      });
    // 트렌젝션 결과 객체 리턴
    return makeReturnByTxResult(result, userAccount, balance, resultAt);
  } catch (error) {
    throw error;
  }
};
