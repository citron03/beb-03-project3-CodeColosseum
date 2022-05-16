// import cav from "./caver";
import { contractABI, contractAddress } from "./contractData";
import { getAccountAddress } from "../utils/address";
import { calculationKlay } from "../assets/constants";
import { useDispatch } from "react-redux";
import { showNotification } from "../redux/action";

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
      alert("네트워크 바오밥으로 설정하세요.");
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
            // 서버에 post 요청을 보낸다. then,
            // window.location.reload();
         })
         .once('error', error => {
            console.log('error', error);
            alert("지불에 실패하셨습니다.");
         })
   }
}

export const usePayKIP7 = () => {

   const dispatch = useDispatch();

   const payKIP7 = async () => {
      const address = await getAccountAddress();
      const checkNet = await checkNetwork();
      if(!checkNet){
         dispatch(showNotification("카이카스 지갑의 네트워크를\n 바오밥으로 설정하세요."));
      } else {
         const to = "0xB3D98B072FCeEc91f87d36cA53a4Eb92973A82a2"; // 토큰을 보낼 주소
         const from = address;
         const amount = 10000000000000000000n; // 10토큰의 지불 필요 (1000000000000000000n -> 1토큰)
         const contract = new window.caver.klay.Contract(contractABI, contractAddress);
         try {
            const transfer = await contract.methods.transfer(to, amount).send({from, gas: 8000000});
            console.log(transfer);
         } catch {
            dispatch(showNotification("지불에 실패하였습니다!"));
         }
      }
   }

   return payKIP7;
}


      // const kip7 = new window.caver.kct.kip7(contractAddress); // kip-7 토큰 컨트랙트 주소
      // const transfer = kip7.safeTransfer(to, amount, {from, feeDelegation: true, feePayer: from});
      // const balance = await kip7.balanceOf(from);
      // const transfer = await kip7.transfer(to, amount, {from});
      // kip7.methods.safeTransfer(to, amount).send({from, gas: 8000000})
      //    .then(el => console.log(el))
      //    .catch(err => console.log(err));