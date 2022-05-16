/**
 * caver-js 라이브러리는 Klaytn 노드에 연결하게 해줍니다.
 * 'rpcURL' 값을 변경하여 특정 Klaytn 노드에 연결할 수 있습니다.
 * default rpcURL is 'https://api.baobab.klaytn.net:8651'.
 */
 import Caver from 'caver-js';

 export const config = {
   rpcURL: 'https://api.baobab.klaytn.net:8651'
 };
 
 export const cav = new Caver(config.rpcURL);
 
 export default cav;