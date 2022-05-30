import { caver, fromDb } from "../../config";
import models from "../../models";
import { calMineralbalance, TxExcutionResult, makeReturnByTxResult, calAmount } from "../../utils";


/*
미네랄을 토큰으로 교환하여 유저 지갑으로 트렌스퍼하는 함수
인자로 유저 넣으면 로그확인해서 트렌젝션 일으키고 트렌젝션결과객체 리턴
(트렌젝션이 성공했으면 미네랄 출금로그 생성을 바로 실행할 것!)
(생성된 출금로그를 가지고 트렌젝션 로그 생성함수를 바로 실행할 것!)
*/
export default async ( userAccount:string ):Promise<TxExcutionResult> => {
    try {
        // 유저가 존재하는지 검증 된상태임
        const user = await models.User.findOne({account:userAccount});
        // 잔액 검사
        const MineralBalance = (await calMineralbalance(user._id)).toString();
        if (parseInt(MineralBalance) < fromDb.CCToken.tradingLimit) {throw new Error("임시로 설정해 놓은 교역 리미트 보다 잔액이 적음")}
        // 트렌젝션 실행
        const amount = calAmount(parseInt(MineralBalance)).toString();
        const contractAddr = fromDb.CCToken.address;
        const from = fromDb.account.CoCo;
        let resultAt;
        const result = await caver.kas.kip7.transfer(contractAddr, from, userAccount, amount)
            .then((r:any) => {
                r.from = from
                r.feePayer = from
                resultAt = new Date();
                return r
            })
            .catch((e:any) => {
                resultAt = new Date();
                return e
            });
        // 결과 리턴
        return makeReturnByTxResult(result, userAccount, amount, resultAt);
    } 
    catch (error) {
        throw error;
    }
}