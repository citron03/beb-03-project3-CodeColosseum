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