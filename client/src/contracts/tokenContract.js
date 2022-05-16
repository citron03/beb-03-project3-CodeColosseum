import { contractABI, contractAddress } from "./contractData";
import { getAccountAddress } from "../utils/address";
import { useDispatch } from "react-redux";
import { showNotification } from "../redux/action";
import axios from "axios";

export const checkNetwork = async () => {
   // 8217 - 메인넷
   // 1001 - 바오밥 테스트넷
   const networkVersion = await window.klaytn.networkVersion;
   return networkVersion === 1001;
}

export const payKlay = async () => {
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

export const usePayKIP7 = (setIsPaid, id, setMissionData) => {

   const dispatch = useDispatch();

   const payKIP7 = async () => {
      const checkNet = await checkNetwork();
      if(!checkNet){
         dispatch(showNotification("카이카스 지갑의 네트워크를\n 바오밥으로 설정하세요."));
      } else {
         const to = "0xB3D98B072FCeEc91f87d36cA53a4Eb92973A82a2"; // 토큰을 보낼 주소
         const from = await getAccountAddress();
         const amount = 10000000000000000000n; // 10토큰의 지불 필요 (1000000000000000000n -> 1토큰)
         const gas = 8000000;
         const contract = new window.caver.klay.Contract(contractABI, contractAddress);
         try {
            const transfer = await contract.methods.transfer(to, amount).send({from, gas});
            if(transfer){
               // post 요청으로 토큰 지불 확인
               console.log(transfer);
               console.log(id);
               axios.post(`/mission/colosseum/${id}`, {account: from, txHash: transfer.transactionHash})
                     .then(el => {
                        setMissionData(el.data.data);
                        setIsPaid(true); // 지불 완료
                     })
                     .catch(err => console.log(err));
            }
         } catch {
            dispatch(showNotification("지불에 실패하였습니다!"));
         }
      }
   }

   return payKIP7;
}