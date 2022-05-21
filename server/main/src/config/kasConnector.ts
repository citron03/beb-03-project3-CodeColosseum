import { ENV } from "../config";

const CaverExtKAS = require('caver-js-ext-kas') // 타입 정의 안되어있음
const caver = new CaverExtKAS(ENV.CHAIN_ID, ENV.ACCESSKEYID, ENV.SECRET_ACCESSKEY)

export default caver