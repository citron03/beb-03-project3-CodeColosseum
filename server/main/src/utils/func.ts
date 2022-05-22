import type { TxExcutionResult } from '../utils';

const randomIntFromInterval = function(min:number, max:number):number {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// 인자로 받은 컬랙션에서 랜덤한 _id 반환하는 함수
const getRandomId = function(collection:any):Promise<string> {
    return new Promise((resolve, reject) => {
        collection.find().toArray((err:any, docs:any) => {
            if (err) {return reject(err)};

            const user = docs[randomIntFromInterval(0, docs.length-1)];
            return resolve(user._id);
        })
    })
}

const makeReturnByTxResult = function(txResult:any, to:string, amount:string, resultAt?:Date):TxExcutionResult {
    if (txResult.status === "0x1") {
        return {
            success: true, // 성공
            result: txResult,
            to,
            amount,
            resultAt
        }
    }
    else {
        return {
            success: false, // 실패
            result: txResult,
            resultAt
        }
    }
}

export { randomIntFromInterval, getRandomId, makeReturnByTxResult };