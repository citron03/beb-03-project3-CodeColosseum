import { caver, fromDb } from "../config"
import models from "../models";
import { MissionCollosseum, makeReturnByTxResult, TxExcutionResult, MissionState } from "../utils";

interface Mission {
    _id: Object;
    creator: Object
    state: MissionState
    colosseum: MissionCollosseum
}

interface TokenRewardColosseumReturn {
    winnerTxReturn: TxExcutionResult
    creatorTxReturn: TxExcutionResult
}

/*
콜로세움 종료시 토큰 리워드를 분배하는 함수입니다.
 종결된 콜로세움 미션객체와 보상비율객체를 인자로 받습니다. 미션객체는 존재한다고 가정하고 확인하지 않기때문에 꼭 DB에 존재하는 유효한 객체를 넣으세요.
(트렌젝션이 성공했으면 트렌젝션 로그 생성을 바로 실행할 것!)
*/
export default async function (missionDoc:Mission): Promise<TokenRewardColosseumReturn> {
    try {
    // 종료된 미션인지, 보상이 안된 미션인지 확인하기
        if (missionDoc.state !== 2 ) { throw new Error("Mission.state is not 2") };
        if (missionDoc.colosseum.isRewarded === true) { throw new Error("Mission.colosseum.isRewarded is true") };
    // 좋아 시작!
        const contractAddr = fromDb.CCToken.address;
        const from = fromDb.account.colosseum;
        const { winner, stakedTokens } = missionDoc.colosseum;
        if (winner === undefined) { throw new Error('winner is undefined.'); } // 콜로세움이 정상적으로 종료되었다면 이럴 수가 없음.
        const creator = await models.User.findById(missionDoc.creator);
    // 보상 수량 계산하기
        // 비율 계산하기
        const rewardRatio = fromDb.CCToken.colosseumRewardRatioObj; // 지금은 일단 보상비율은 임시로 정해두었기 때문에 계산과정이 필요없음. 나중에는 아마 rewardRatioObjColosseum 로 비율을 계산해서 동적으로 얻게 구현해야 할것임.
        // 수량 계산하기
        const colosseum = parseInt(fromDb.CCToken.colosseum);
        const winnerAmount = (((stakedTokens - colosseum) * rewardRatio.winner) + colosseum).toFixed().toString();
        const creatorAmount = ((stakedTokens - colosseum) * rewardRatio.creator).toFixed().toString();
    // 보상하기(트렌젝션)
        // winner
        let winnerResultAt;
        const winnerResult = await caver.kas.kip7.transfer(contractAddr, from, winner.account, winnerAmount)
            .then((r:any) => {
                r.from = from
                r.feePayer = from
                winnerResultAt = new Date();
                return r
            })
            .catch((e:any) => {
                winnerResultAt = new Date();
                return e
            })
        const winnerTxReturn = makeReturnByTxResult(winnerResult, winner.account, winnerAmount, winnerResultAt);
        // creator
        let creatorResultAt;
        const creatorResult = await caver.kas.kip7.transfer(contractAddr, from, creator.account, creatorAmount)
            .then((r:any) => {
                r.from = from
                r.feePayer = from
                creatorResultAt = new Date();
                return r
            })
            .catch((e:any) => {
                creatorResultAt = new Date();
                return e
            })
        const creatorTxReturn = makeReturnByTxResult(creatorResult, creator.account, creatorAmount, creatorResultAt);
    // 디비수정(mission) // 둘다 성공했을 경우만 디비 수정
        if (winnerTxReturn.success && creatorTxReturn.success) {
            missionDoc.colosseum.isRewarded = true;
            const mission = await models.Mission.findByIdAndUpdate(missionDoc._id, {colosseum: missionDoc.colosseum}, {new: true});
        }
    // 결과객체 리턴
        return {
            winnerTxReturn,
            creatorTxReturn
        }
    }
    catch (error) {
        throw error;
    }
}