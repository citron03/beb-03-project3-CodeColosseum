import { TxExcutionResult, TokenTransferLogFor, TokenTransferLogCode } from '../utils';
import models from '../models';
import { fromDb } from '../config';

/*
트렌젝션 실행의 결과를 디비에 기록하는 함수

인자:
txExcutionResult: 트렌젝션 실행한 결과객체를 그대로 넣음
transferCode: 트렌스퍼 종류를 알려주는 코드
transferFor: 목적, 대가, 이유 등을 직접 확인할 수 있는 콜렉션의 도큐먼트id (일단 혹시 몰라서 오브젝트랑 스트링 둘다 받는데 추후에 정해지면 하나로 정할 예정)

return: 생성결과
*/
export default async (txExcutionResult:TxExcutionResult, transferCode:TokenTransferLogCode, transferFor:TokenTransferLogFor ):Promise<Object> => {
    try {
        const { to, amount, resultAt } = txExcutionResult;
        const { transactionHash, from, feePayer } = txExcutionResult.result;

        // for 체크하기
        let checker:boolean
        if (transferCode === 1) { checker = transferFor.collection === "Challenge" && amount === fromDb.CCToken.colosseum && to === fromDb.account.colosseum }
        else if (transferCode === 2 || transferCode === 3) { checker = transferFor.collection === "Mission" && from === fromDb.account.colosseum }
        else if (transferCode === 4) { checker = transferFor.collection === "MineOwnerRewardLog" && from === fromDb.account.CoCo }
        else if (transferCode === 5) { checker = transferFor.collection === "MineralLog" && from === fromDb.account.CoCo }
        else if (transferCode === 6) { checker = false }
        else if (transferCode === 7) { checker = false }
        else { throw new Error("Error: transferCode is wrong!"); };
        
        if (checker === false) { throw new Error("Error: checker is False!"); };

        return await models.TokenTransferLog.create({ // 생성하고 리턴!
            txHash: transactionHash,
            from,
            to,
            feePayer,
            code: transferCode,
            for: transferFor,
            token: fromDb.CCToken.symbol,
            amount,
            paymentAt: resultAt,
        });
    } 
    catch (error) {
        throw error;
    }
}