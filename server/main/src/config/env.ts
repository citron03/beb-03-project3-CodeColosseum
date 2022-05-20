require("dotenv").config();

const { PORT, MONGO_database, MONGO_URL, MONGO_Query, CHAIN_ID, ACCESSKEYID, SECRET_ACCESSKEY } = process.env;
const MONGO_URI = `${MONGO_URL}${MONGO_database}${MONGO_Query}`;
const ENV = { PORT, MONGO_URI, MONGO_database, CHAIN_ID, ACCESSKEYID, SECRET_ACCESSKEY }

export default ENV