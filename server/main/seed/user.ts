import { ENV } from '../src/config';
import { faker } from '@faker-js/faker';
import { MongoClient, ServerApiVersion } from 'mongodb';

async function seedDB() {

    if (ENV.MONGO_URI) {
        const client = new MongoClient(ENV.MONGO_URI, { serverApi: ServerApiVersion.v1 });

        try {
            await client.connect();
            console.log(`DB ${ENV.MONGO_database} connected!!`);

            const usersCollection = client.db(ENV.MONGO_database).collection("users");

            // 삭제
            await usersCollection.drop()
                .then(async () => {
                    console.log("users dropped!!");
                    // await usersCollection.insertOne({
                    //     init: true,
                    // });
                })
                // .then(() => console.log("Seeded init!!"));

            // 더미 리스트 만들기
            let usersData = [];
            for (let i = 0; i < 100; i++) {
                const nickName = faker.name.firstName();
                let account:string;
                if (i > 9) {
                    account = "0x00000000000000000000000000000000000000" + `${i}`;
                }
                else {
                    account = "0x000000000000000000000000000000000000000" + `${i}`;
                }
                const image = faker.image.avatar();
                
                const user = {
                    account,
                    nickName,
                    image,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
                usersData.push(user);
            }

            // 테스트 계정 추가

            const testAccount1 = {
                account: "0xe3b041ec3718260df021e2dcf7b589405cd3bf74",
                nickName: "JooYong",
                createdAt: new Date(),
                updatedAt: new Date()
            }
            const testAccount2 = {
                account: "0x73aa21914f5f8221b57ef5904942492459c8a4fe",
                nickName: "YuChan",
                createdAt: new Date(),
                updatedAt: new Date()
            }
            const testAccount3 = {
                account: "0xaa95289a2c8479d4a028c6f6740e374e59fd26c8",
                nickName: "ChangGyu",
                createdAt: new Date(),
                updatedAt: new Date()
            }
            usersData.push(testAccount1);
            usersData.push(testAccount2);
            usersData.push(testAccount3);


            // 삽입
            await usersCollection.insertMany(usersData)
                .then(() => console.log("Seeded Users!!"))

            client.close();
        } catch (e:any) {
            console.log(e.stack);
        }

    } else { console.log(`DB not connected!! Because MONGO_URI is Undefined.`); }
}

seedDB();