import { ENV } from "../config";

const CaverExtKAS = require('caver-js-ext-kas')
const caver = new CaverExtKAS(ENV.CHAIN_ID, ENV.ACCESSKEYID, ENV.SECRET_ACCESSKEY)

export default caver