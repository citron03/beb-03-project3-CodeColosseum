import { fromDb } from "../config";
import models from "../models";
import { MineralLogCode, updateUserMineralBalance } from "../utils";

interface Challenge {
    _id: string;
    challenger: string;
    mission: string;
    kind: number;
    isPassed: boolean;
}

// 마이닝 성공시 미네랄 로그 생성하는 함수!! (지금은 유저 미네랄잔액 업뎃하는 함수를 실행하게 되어있음) => 생성된 로그와 업데이트된 유저 도큐먼트객체를 반환
// DB에 실재 존재하는 challengeDoc 를 인자로 넣어주세요!!
export default async (challengeDoc:Challenge):Promise<Object> => {
    try {
    // 실행해도 되는지 확인
        // challengeDoc 검사 (해당 유저가 연습문제를 잘 풀었는지?)
        if (!challengeDoc.isPassed || challengeDoc.kind !== 2) {throw new Error("이 유저는 연습문제를 정상적으로 마이닝하지 않은것 같네요.");}
        // Log 안에 미션과 유저가 중복없는 유효한 마이닝 인지?
        const checkLogs = await models.MineralLog.exists({mission: challengeDoc.mission, user: challengeDoc.challenger});
        if (checkLogs) {throw new Error("이 유저는 이미 이 mission으로 마이닝을 한것 같은데요?");}
    // 생성
        const code:MineralLogCode = "mining";
        const newLog = await models.MineralLog.create({
            code,
            mission: challengeDoc.mission,
            challenge: challengeDoc._id, // 유니크한지는 몽구스가 체크하겠지?
            user: challengeDoc.challenger,
            amount: fromDb.CCToken.mining 
        });
    // 유저 미네랄잔액 업뎃 (지금은 일단 항상 업뎃하게 해놨는데 불필요하게 디비에 접근하는것 같아서 나중엔 필요할 때만 최신화 하도록 수정해야 할것같아서 함수로 빼놓음)
        const updatedUser = await updateUserMineralBalance(challengeDoc._id);
        return {
            newLog,
            updatedUser
        }
    }
    catch (error) {
        throw error;
    }
};