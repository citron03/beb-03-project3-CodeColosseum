import { caver } from "../../config";
import { MissionMineOwnershipNft } from "../../utils";

interface Misiion {
    _id: string;
    mineOwnershipNft:MissionMineOwnershipNft
}

/*
미션 객체를 인자로 받으면 이 미션의 소유권nft의 오너 어카운트를 반환하는 함수.
*/
export default async (missionDoc:Misiion):Promise<string> => {
    try {
        const contractAddr = missionDoc.mineOwnershipNft.contractAddress;
        const tokenId = missionDoc._id.toString();
        const result = await caver.kas.kip17.getToken(contractAddr, tokenId)
        .then((res:any) => res.owner)
        .catch((err:any) => {throw err});

        return result
    } 
    catch (error) {
        throw error;
    }
}