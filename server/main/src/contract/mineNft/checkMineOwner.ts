import { caver } from "../../config";
import { MissionMineOwnershipNft } from "../../utils";
import models from "../../models";

interface Misiion {
    _id: string;
    mineOwnershipNft:MissionMineOwnershipNft;
    creator: string;
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
        .catch(async (err:any) => { // KAS 무료계정을 이용한 바오밥 접근이 느리거나 문제가 있는경우가 있는것으로 보임. 임시방편.
            console.log(err);
            const creator = await models.User.findOne({account:missionDoc.creator});
            return creator.account;
        });

        return result
    } 
    catch (error) {
        throw error;
    }
}