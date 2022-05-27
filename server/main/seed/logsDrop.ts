import { ENV } from '../src/config';
import { MongoClient, ServerApiVersion } from 'mongodb';

async function seedDB() {

    if (ENV.MONGO_URI) {
        const client = new MongoClient(ENV.MONGO_URI, { serverApi: ServerApiVersion.v1 });

        try {
            await client.connect();
            console.log(`DB ${ENV.MONGO_database} connected!!`);

            const mineownerrewardlogCollection = client.db(ENV.MONGO_database).collection("mineownerrewardlogs");
            const minerallogCollection = client.db(ENV.MONGO_database).collection("minerallogs");
            const tokentransferLogCollection = client.db(ENV.MONGO_database).collection("tokentransferlogs");

            // 삭제
            const rLogs = await mineownerrewardlogCollection.find({}).toArray();
            const mLogs = await minerallogCollection.find({}).toArray();
            const tLogs = await tokentransferLogCollection.find({}).toArray();

            await mineownerrewardlogCollection.drop()
                .then(async() => {
                    console.log("mineownerrewardlogs dropped!!");
                    await mineownerrewardlogCollection.insertOne({
                        init: true,
                    })
                })
                .then(() => console.log("Seeded init!!"));
            await minerallogCollection.drop()
                .then(async() => {
                    console.log("minerallogs dropped!!");
                    await minerallogCollection.insertOne({
                        init: true,
                    })
                })
                .then(() => console.log("Seeded init!!"));
            await tokentransferLogCollection.drop()
                .then(async() => {
                    console.log("tokentransferlogs dropped!!");
                    await tokentransferLogCollection.insertOne({
                        init: true,
                    })
                })
                .then(() => console.log("Seeded init!!"));

            client.close();
        } catch (e:any) {
            console.log(e.stack);
        }

    } else { console.log(`DB not connected!! Because MONGO_URI is Undefined.`); }
}

seedDB();