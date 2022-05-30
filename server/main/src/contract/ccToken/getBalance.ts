import { caver, fromDb } from "../../config";

/*
*/
export default async (userAccount:string):Promise<number> => {
    try {
        const result = await caver.kas.kip7.balance(fromDb.CCToken.address, userAccount)
        .then((r: any) => {
            return r;
        })
        .catch((e: any) => {
            return e;
        });
        const balance = parseInt(result.balance, 16)
        return balance;
    } 
    catch (error) {
        throw error;
    }
}