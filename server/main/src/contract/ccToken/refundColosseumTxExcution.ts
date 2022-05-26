import { caver, fromDb } from "../../config";
import { makeReturnByTxResult, MissionColosseum, MissionState, TxExcutionResult } from "../../utils";

interface Mission {
    state: MissionState
    colosseum: MissionColosseum
}
/*
인자로 missionDoc 받으면 팬딩상태 확인, 챌린징 1명인지 확인해서 환불tx 실행하고 결과 리턴하는 함수

정상 실행되면 트랜스퍼 로그 생성 함수 실행하기! (transferCode: 8)
그리고 미션도큐먼트에서 챌린징 정보 제거하기
*/
export default async (missionDoc:Mission):Promise<TxExcutionResult> => {
    try {
        // 팬딩상태 확인, 챌린징 1명인지 확인
        if (missionDoc.state !== 0) {throw new Error("팬딩상태가 아님")};
        if (missionDoc.colosseum.challengings?.length !== 1) {throw new Error("챌린징이 1명이 아님")};
        // 트렌젝션 실행
        const balance = fromDb.CCToken.colosseum;
        const contractAddr = fromDb.CCToken.address;
        const from = fromDb.account.colosseum;
        const to = missionDoc.colosseum.challengings[0].account;
        let resultAt;
        const result = await caver.kas.kip7.transfer(contractAddr, from, to, balance)
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
        return makeReturnByTxResult(result, to, balance, resultAt);
    } 
    catch (error) {
        throw error;
    }
}