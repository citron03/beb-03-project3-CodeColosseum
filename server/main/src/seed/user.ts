import "../config";
import { faker } from '@faker-js/faker';
import { MongoClient, ServerApiVersion } from 'mongodb';

const { MONGO_URI } = process.env;

async function seedDB() {

    if (MONGO_URI) {
        const client = new MongoClient(MONGO_URI, { serverApi: ServerApiVersion.v1 });

        try {
            await client.connect();
            console.log("DB connected!!");

            const usersCollection = client.db("CoCo").collection("users");

            // 삭제
            await usersCollection.drop()
                .then(() => console.log("users dropped!!"))

            // 더미 리스트 만들기
            let usersData = [];
            for (let i = 0; i < 10; i++) {
                const nickName = faker.name.firstName();
                const account = "0x000000000000000000000000000000000000000" + `${i}`;
                const image = faker.image.avatar();
                
                const user = {
                    nickName: nickName,
                    address: account,
                    image: image,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
                usersData.push(user);
            }

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