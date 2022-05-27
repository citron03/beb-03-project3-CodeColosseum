import { caver, fromDb } from "../../config"
import { makeReturnByTxResult , TxExcutionResult } from '../../utils';

interface TxChecker {
    to: string
    amount: string
}

/*
수수료 대납 트렌젝션에 feePayer 싸인하고 실행시키는 함수입니다.
인자로 싸인된 Tx를 받고 tx 실행 결과객체를 리턴합니다.
txChecker 를 넣으면 디코딩할떄 to, amount 를 체크합니다.
(트렌젝션이 성공했으면 트렌젝션 로그 생성을 바로 실행할 것!)
*/
export = async function(senderRawTransaction:string, txChecker?:TxChecker):Promise<TxExcutionResult> {

    try {
        const feePayerAddress = fromDb.account.feePayer; // 수수료 대납 계정의 주소

        const contractInstance = await caver.transaction.feeDelegatedSmartContractExecution.decode(senderRawTransaction) // 싸인하기위해 디코드
        
        // to 와 amount 꺼내기
        const decodedInput = await caver.abi.decodeFunctionCall(fromDb.CCToken.transferAbi, contractInstance._input);
        const to = decodedInput.to;
        const amount = decodedInput.value;

        // 싸인하기 전에 트렌젝션 세부사항 확인하기 (txChecker) 여기서 to, value 확인하는것과 나중에 tx결과 확인하는 것으로 신뢰도 100% 라고 생각됨.
        if (txChecker) {
            if (txChecker.to !== to) {
                throw new Error('txChecker found error. to is not same.');
            }
            if (txChecker.amount !== amount) {
                throw new Error('txChecker found error. amount is not same.');
            }
        };

        const signedTransaction = await caver.wallet.signAsFeePayer(feePayerAddress, contractInstance) // 대납 싸인
        const rawTx = signedTransaction.getRLPEncoding() // 인코딩
        let resultAt;
        const result = await caver.rpc.klay.sendRawTransaction(rawTx) // 실행
            .once('receipt', (receipt:any) => {
                resultAt = new Date();
                return receipt
            })
            .once('error', (error:any) => {
                resultAt = new Date();
                return error
            });
        
        return makeReturnByTxResult(result, to, amount, resultAt);

    } catch (error) {
        throw error;
    }
}

// const resultSample = {
//     blockHash: '0xbef692e18ff7add6b2ae08b0ee881a04b5216057c9fde4fd4e1ea63e1c586fbe',
//     blockNumber: '0x5738b02',
//     contractAddress: null,
//     feePayer: '0xe59d6be9dee69d2ea721b0ef5dd26f24badd5273',
//     feePayerSignatures: [
//       {
//         V: '0x7f6',
//         R: '0x751903d200f9ada204894bc9b23cf5e21bf9599ade030180d072e85f9ec04fd9',
//         S: '0x6f9ab2998ca8b79e08a1ab5e9317d7933daeddeb872ffcaa3fab304a594a2235'
//       }
//     ],
//     from: '0xaa95289a2c8479d4a028c6f6740e374e59fd26c8', // from
//     gas: '0x493e0',
//     gasPrice: '0x3a35294400',
//     gasUsed: '0xd027',
//     input: '0xa9059cbb000000000000000000000000538c26a2f0468b05a724252b300e3e223227ce63000000000000000000000000000000000000000000000000000000746a528800',
//     logs: [
//       {
//         address: '0x174d09887b5e7870768743b8fa1eaa95c95988a1',
//         topics: [Array],
//         data: '0x000000000000000000000000000000000000000000000000000000746a528800',
//         blockNumber: '0x5738b02',
//         transactionHash: '0x45f96ea04859111f29df12040f76941cccdeb0f1ce927da3567f7d134c36b9c9',
//         transactionIndex: '0x1',
//         blockHash: '0xbef692e18ff7add6b2ae08b0ee881a04b5216057c9fde4fd4e1ea63e1c586fbe',
//         logIndex: '0x1',
//         removed: false
//       }
//     ],
//     logsBloom: '0x00000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000080800000000008000000000040000000400000000000000000000000000000000000000000100000000000000000000000000020000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200',
//     nonce: '0x3a',
//     senderTxHash: '0x75ff7bd29b164f6773b7b3d3dbeda44ec827ebfcbbd0a4266841309280883b4a',
//     signatures: [
//       {
//         V: '0x7f5',
//         R: '0xee4baea45f6beaf7bc2aa701b52aedfb01c8df702ffff44a36a68ca539967375',
//         S: '0x6279f5c8446f409e0b6e3b78f77a50a6de33205bb52687ddfa99d4f9a135c9d7'
//       }
//     ],
//     status: '0x1',
//     to: '0x174d09887b5e7870768743b8fa1eaa95c95988a1',
//     transactionHash: '0x45f96ea04859111f29df12040f76941cccdeb0f1ce927da3567f7d134c36b9c9', // txHash
//     transactionIndex: '0x1',
//     type: 'TxTypeFeeDelegatedSmartContractExecution',
//     typeInt: 49,
//     value: '0x0'
// }