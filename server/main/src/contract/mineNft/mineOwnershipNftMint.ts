import { caver, fromDb } from "../../config";
import { MissionMineOwnershipNft } from "../../utils";

interface Return {
    result: Result
    mineOwnershipNft: MissionMineOwnershipNft
}
interface Result {
    status: string
    transactionHash: string
}

/*
함수 내부에서 따로 검증하지 않으니 꼭 검증하고 실행하세요!! 잘못 실행되지 않도로 주의하세요!!
메타데이터가 업로드에 성공하고 얻은 uri 와 MissonId, creatorAccount 를 인자로 받음
민팅 하고 결과 반환! 결과에서 .result.status = "Submitted" 면 성공입니다.

성공하면 Mission DB 꼭 수정하기!!
nft 로 만들어 졌다는 상태 수정하고 .mineOwnershipNft 를 mission 에 넣어주기
*/
export default async (creatorAcc:string, missonId:string, uri:string ):Promise<Return> => {
    try {
        const result = await caver.kas.kip17.mint(fromDb.CMCToken.address, creatorAcc, missonId, uri)
        .then((res:any) => res)
        .catch((err:any) => {throw err});

        return {
            result,
            mineOwnershipNft: {
                contractAddress: fromDb.CMCToken.address,
                uri
            }
        };
    } 
    catch (error) {
        throw error;
    }
}