import config from "../config"
import models from "../models";

// 프론트에서 유저에게 트렌젝션에 싸인을 시키기위해 필요한 객체를 반환하는 함수입니다.
// 반환된 객체안에 txObj의 from 만 서명자의 account 를 넣어서 싸인하면 됩니다.
export = async function (): Promise<Object> {

    try {
        const CCTcontract = await models.Contract.findOne({symbol:"CCT"});
        const colosseum = await models.Account.findOne({name:"colosseum"});
        
        const amount = CCTcontract.colosseum; // 전송량
        const contractAddr = CCTcontract.address; // 컨트랙트 주소

        const contract = config.caver.kct.kip7.create(contractAddr);
        const data = contract.methods.transfer(colosseum.account, amount).encodeABI() // RLP 인코딩
        const gas = config.gasLimit.tokenTransfer;
        
        const txObj = { // 트렌젝션 객체
            type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
            from: null, // 후에 싸인전에 서명자의 account 를 넣기
            to: contractAddr,
            data,
            gas
        }

        return {
            contractAddr,
            amount,
            txObj // 트렌젝션 객체
        }
        
    } catch (error) {
        throw error;
    }
}