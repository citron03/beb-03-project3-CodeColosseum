import config from "../config"
import models from "../models";

export = async function (): Promise<Object> {

    try {
        const CCTcontract = await models.Contract.findOne({symbol:"CCT"});
        const colosseum = await models.Account.findOne({name:"colosseum"});
        
        const to = CCTcontract.address;
        const contract = config.caver.kct.kip7.create(to);
        const data = contract.methods.transfer(colosseum.account, CCTcontract.colosseum).encodeABI()
        const gas = config.gasLimit.tokenTransfer;
        
        return {
            to,
            data,
            gas
        }
        
    } catch (error) {
        throw error;
    }
}