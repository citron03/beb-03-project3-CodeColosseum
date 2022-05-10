import "../config";
// import { faker } from '@faker-js/faker';
import { MongoClient, ServerApiVersion } from 'mongodb';
import coplitDummyMissions from '../dummy/coplitMissions';
import utils from '../utils';

const { MONGO_URI } = process.env;

async function seedDB() {

    if (MONGO_URI) {
        const client = new MongoClient(MONGO_URI, { serverApi: ServerApiVersion.v1 });

        try {
            await client.connect();
            console.log("DB connected!!");

            const missionsCollection = client.db("CoCo").collection("missions");
            const usersCollection = client.db("CoCo").collection("users");

        // 삭제
            await missionsCollection.drop()
                .then(() => console.log("missions dropped!!"))

        // 더미 리스트 만들기
            // 코플릿 더미 넣기
            let missionsData = [];
            for (let i = 0; i < coplitDummyMissions.length; i++) {
                const user_id = await utils.func.getRandomId(usersCollection); // 랜덤한 유저 _id 가져오기
                
                const mission = {
                    title: coplitDummyMissions[i].title,
                    description: coplitDummyMissions[i].description,
                    paragraph: coplitDummyMissions[i].paragraph,
                    creator: user_id,
                    inputs: coplitDummyMissions[i].inputs,
                    output: coplitDummyMissions[i].output,
                    refCode: coplitDummyMissions[i].refCode,
                    testCases: coplitDummyMissions[i].testCases,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
                missionsData.push(mission);
            }

        // 삽입
            await missionsCollection.insertMany(missionsData)
                .then(() => console.log("Seeded Missions!!"))
            
            client.close();
        } catch (e:any) {
            console.log(e.stack);
        }

    } else { console.log(`DB not connected!! Because MONGO_URI is Undefined.`); }
}

seedDB();