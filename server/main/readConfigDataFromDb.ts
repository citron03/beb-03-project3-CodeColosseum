import { ENV } from './src/config';
import { MongoClient, ServerApiVersion } from 'mongodb';
import { writeFile } from 'fs';

// 디비에서 데이터 가져와서 config 파일을 만들어서 저장하는 프로그램.
( async ()=>{

    if (ENV.MONGO_URI) {
        const client = new MongoClient(ENV.MONGO_URI, { serverApi: ServerApiVersion.v1 });

        try {
            // DB 연결
            await client.connect();
            console.log(`DB ${ENV.MONGO_database} connected!!`);
            // 콜렉션 가져오기
            const accountsCollection = client.db(ENV.MONGO_database).collection("accounts");
            const contractsCollection = client.db(ENV.MONGO_database).collection("contracts");
            // 도큐먼트 가져오기
            const CoCo = await accountsCollection.findOne({name: "CoCo"})
                .then((CoCo) => {
                    if (!CoCo) { console.log(`CoCo not found`); return null;
                    } else { return CoCo; }
                });
            const colosseum = await accountsCollection.findOne({name: "colosseum"})
                .then((colosseum) => {
                    if (!colosseum) { console.log(`colosseum not found`); return null;
                    } else { return colosseum; }
                });
            const feePayer = await accountsCollection.findOne({name: "feePayer"})
                .then((feePayer) => {
                    if (!feePayer) { console.log(`feePayer not found`); return null;
                    } else { return feePayer; }
                });
            const CCTcontract = await contractsCollection.findOne({symbol: "CCT"})
                .then((CCTcontract) => {
                    if (!CCTcontract) { console.log(`CCTcontract not found`); return null;
                    } else { return CCTcontract; }
                });
            // 데이터 만들고 파일 생성하기
            if (CoCo && colosseum && feePayer && CCTcontract) {

                const CoCoAccount = CoCo.account;
                const colosseumAccount = colosseum.account;
                const feePayerAccount = feePayer.account;
            
                const CCTsymbol = CCTcontract.symbol;
                const CCTaddress = CCTcontract.address;
                const CCTcolosseum = CCTcontract.colosseum;
                const CCTtransferGasLimit = CCTcontract.transferGas;
                const CCTtransferAbi = CCTcontract.transferAbi;
                const CCTcolosseumRewardRatioObj = CCTcontract.colosseumRewardRatioObj;
                const CCTmining = CCTcontract.mining;
                const CCTtradingLimit = CCTcontract.tradingLimit;
                const CCTtoken = CCTcontract.token;
                const CCTtokenLimit = CCTcontract.tokenLimit;
            
                const data =
`const account = {
    CoCo: "${CoCoAccount}",
    colosseum: "${colosseumAccount}",
    feePayer: "${feePayerAccount}"
};

const CCToken = {
    symbol: "${CCTsymbol}",
    address: "${CCTaddress}",
    colosseum: "${CCTcolosseum}",
    transferGasLimit: "${CCTtransferGasLimit}",
    transferAbi: ${CCTtransferAbi},
    colosseumRewardRatioObj: ${CCTcolosseumRewardRatioObj},
    mining: ${CCTmining},
    tradingLimit: ${CCTtradingLimit},
    token: ${CCTtoken},
    tokenLimit: ${CCTtokenLimit}
};

const fromDb = { account, CCToken };

export default fromDb`;
            
                writeFile("src/config/fromDb.ts", data, () => { console.log("success!!"); });

            } else { console.log(`DB애서 데이터를 불러오는데 실패했다`); }
            
            client.close();
        } catch (e) {
            throw e;
        }

    } else { console.log(`DB not connected!! Because MONGO_URI is Undefined.`); }

})();











