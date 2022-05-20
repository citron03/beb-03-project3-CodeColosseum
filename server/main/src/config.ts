require("dotenv").config();

const { PORT, MONGO_database, MONGO_URL, MONGO_Query, CHAIN_ID, ACCESSKEYID, SECRET_ACCESSKEY } = process.env;
const MONGO_URI = `${MONGO_URL}${MONGO_database}${MONGO_Query}`;
const ENV = { PORT, MONGO_URI, MONGO_database }

// KAS connector
const CaverExtKAS = require('caver-js-ext-kas')
const caver = new CaverExtKAS(CHAIN_ID, ACCESSKEYID, SECRET_ACCESSKEY)

// GAS
const gasLimit = {
    tokenTransfer: '300000', 
}
    
export = { ENV, caver, gasLimit };