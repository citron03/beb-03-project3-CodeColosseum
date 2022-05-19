import config from "../config"
import models from "../models";

// 수수료 대납 트렌젝션에 feePayer 싸인하고 실행시키는 함수입니다.
// 인자로 싸인된 Tx를 받고 tx 실행 결과를 리턴합니다.
// 성공시 txHash 는 리턴값의 .transactionHash 를 사용하세요.
export = async function(senderRawTransaction:string, txChecker?:Object):Promise<Object> {

    const feePayer = await models.Account.findOne({name:"feePayer"});
    const feePayerAddress = feePayer.account; // 수수료 대납 계정의 주소

    const contractInstance = await config.caver.transaction.feeDelegatedSmartContractExecution.decode(senderRawTransaction) // 싸인하기위해 디코드
    // 싸인하기 전에 트렌젝션 세부사항 확인하기 (txChecker)
    // ... 생략
    const signedTransaction = await config.caver.wallet.signAsFeePayer(feePayerAddress, contractInstance) // 대납 싸인
    const rawTx = signedTransaction.getRLPEncoding() // 인코딩
    const result = await config.caver.rpc.klay.sendRawTransaction(rawTx) // 실행
        .once('receipt', async (receipt:any) => {
            console.log(receipt)
            return receipt
        })
        .once('error', (error:any) => {
            console.log(error)
            return error
        })
    
    if (result.status === "0x1") {
        return {
            success: true, // 성공
            result: result
        }
    }
    else {
        return {
            success: false, // 실패
            result: result
        }
    }
}