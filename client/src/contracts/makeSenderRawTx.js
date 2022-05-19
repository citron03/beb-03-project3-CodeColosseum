
// 몇가지 필수 검증후 유저에게 카이카스로 트렌젝션에 서명을 받고 senderRawTransaction을 반환하는 함수입니다.
// 반환된 결과를 트렌젝션을 실행하는 서버 API 로 전송해주세요.
// 앞서 카이카스가 설치되어있는지 학인이 된 상태에서 사용하는 함수입니다
export default async function makeSenderRawTx(txSignReqObj) {

    // 앞서 카이카스가 설치되어있는지 학인이 된 상태에서 사용하는 함수이므로 설치확인은 생략되어있습니다.

    // 지갑 연결확인
    const accounts = await window.klaytn.enable();
    const account = accounts[0] // 지갑주소

    // 토큰 잔액 확인
    const instanceFPTT = new window.caver.klay.KIP7(txSignReqObj.contractAddr);
    const tokenBalance = await instanceFPTT.balanceOf(account)
    if (tokenBalance.toNumber() < txSignReqObj.amount) {
        alert("소유한 토큰이 부족합니다.")
        return // 토큰이 부족하면 서명을 요청하지 않고 종료함
    }

    // 서명 요청
    txSignReqObj.txObj.from = account;
    const signedTransaction = await window.caver.klay.signTransaction(txSignReqObj.txObj); // 서명

    return signedTransaction.rawTransaction // senderRawTransaction을 반환
}