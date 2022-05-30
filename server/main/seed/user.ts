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
                .then(() => console.log("users dropped!!"))

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
                account: "0xE3B041eC3718260Df021E2dcf7B589405Cd3bf74",
                nickName: "JooYong",
            }
            const testAccount2 = {
                account: "0x73AA21914F5F8221B57Ef5904942492459C8a4fe",
                nickName: "YuChan",
            }
            const testAccount3 = {
                account: "0xaa95289A2c8479d4A028C6F6740E374e59Fd26C8",
                nickName: "ChangGyu",
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