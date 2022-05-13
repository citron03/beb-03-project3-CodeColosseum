import cav from "./caver";
import { contractABI, contractAddress } from "./contractData";

/**
 * 1. 컨트랙트 인스턴스 생성
    * 예시: new cav.klay.Contract(DEPLOYED_ABI, DEPLOYED_ADDRESS)
    * 이 인스턴스를 통해 컨트랙트 메서드를 호출할 수 있습니다.
 */

// const tokenContract = DEPLOYED_ABI
//   && DEPLOYED_ADDRESS
//   && new cav.klay.Contract(DEPLOYED_ABI, DEPLOYED_ADDRESS);

// export default tokenContract;


const myContract = new caver.klay.Contract(contractABI, contractAddress)

myContract.methods.transfer(to, caver.utils.toPeb(amount, 'KLAY'))
  .send({from: klaytn.selectedAddress},
  // function(error, transactionHash) {
  //   ...
  // }
  );
