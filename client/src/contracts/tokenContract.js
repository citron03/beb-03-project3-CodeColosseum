// import cav from "./caver";
// import { contractABI, contractAddress } from "./contractData";
import { getAccountAddress } from "../utils/address";
import { calculationKlay } from "../assets/constants";

/**
 * 1. 컨트랙트 인스턴스 생성
    * 예시: new cav.klay.Contract(DEPLOYED_ABI, DEPLOYED_ADDRESS)
    * 이 인스턴스를 통해 컨트랙트 메서드를 호출할 수 있습니다.
 */

// const tokenContract = DEPLOYED_ABI
//   && DEPLOYED_ADDRESS
//   && new cav.klay.Contract(DEPLOYED_ABI, DEPLOYED_ADDRESS);

// export default tokenContract;


// const myContract = new caver.klay.Contract(contractABI, contractAddress)

// myContract.methods.transfer(to, caver.utils.toPeb(amount, 'KLAY'))
//   .send({from: klaytn.selectedAddress},
//   // function(error, transactionHash) {
//   //   ...
//   // }
//   );

export const getBalance = async () => {
   try{
      const account = await getAccountAddress();
      const balance = await window.caver.klay.getBalance(account);
      console.log(Number(balance) / calculationKlay);
   } catch {
      console.log("컨트랙트 에러 발생!!");
   }
}

export const getContract = async () => {
   try {
      const Contract = await window.caver.klay;
      console.log(Contract)
   } catch {
      console.log("컨트랙트 에러 발생!!");
   }
}

export const checkNetwork = async () => {
   // 8217 - 메인넷
   // 1001 - 바오밥 테스트넷
   const networkVersion = await window.klaytn.networkVersion;
   // const caver = new Caver('https://api.baobab.klaytn.net:8651/');

   return networkVersion === 1001;
}

export const payToken = async () => {
   const address = await getAccountAddress();
   const checkNet = await checkNetwork();
   if(!checkNet){
      alert("네트워크 바오밥으로");
   } else {
      window.caver.klay
      .sendTransaction({
         type: 'VALUE_TRANSFER',
         from: address,
         to: '0xB3D98B072FCeEc91f87d36cA53a4Eb92973A82a2',
         value: window.caver.utils.toPeb('1', 'KLAY'),
         gas: 8000000
       })
       .once('transactionHash', transactionHash => {
         console.log('txHash', transactionHash);
       })
       .once('receipt', receipt => {
         console.log('receipt', receipt);
       })
       .once('error', error => {
         console.log('error', error);
       })
   }
}