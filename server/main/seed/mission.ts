import config from '../src/config';
// import { faker } from '@faker-js/faker';
import { MongoClient, ServerApiVersion } from 'mongodb';
import coplitDummyMissions from '../src/dummy/coplitMissions';
import utils from '../src/utils';

async function seedDB() {

    if (config.ENV.MONGO_URI) {
        const client = new MongoClient(config.ENV.MONGO_URI, { serverApi: ServerApiVersion.v1 });

        try {
            await client.connect();
            console.log(`DB ${config.ENV.MONGO_database} connected!!`);


            const missionsCollection = client.db(config.ENV.MONGO_database).collection("missions");
            const usersCollection = client.db(config.ENV.MONGO_database).collection("users");

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

            // 추가적으로 다른 더미들 넣을것 있으면 여기 추가해서 넣어도 됩니다~ 형식 맞춰서 missionsData 에 푸시만 잘 해주세요~
            // 단, 문제 타이블을 중복되지 않게 해주세요. 챌린지 더미들 만들때 임시적으로 미션 타이틀을 키로 쓰고있습니다.

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