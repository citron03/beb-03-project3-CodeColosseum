import { ENV } from '../src/config';
// import { faker } from '@faker-js/faker';
import { MongoClient, ServerApiVersion } from 'mongodb';
import coplitDummyMissions from '../dummy/coplitMissions';
import { getRandomId } from '../src/utils';
import { MissionColosseum } from '../src/utils/types';

async function seedDB() {

    if (ENV.MONGO_URI) {
        const client = new MongoClient(ENV.MONGO_URI, { serverApi: ServerApiVersion.v1 });

        try {
            await client.connect();
            console.log(`DB ${ENV.MONGO_database} connected!!`);


            const missionsCollection = client.db(ENV.MONGO_database).collection("missions");
            const usersCollection = client.db(ENV.MONGO_database).collection("users");

        // 삭제
            await missionsCollection.drop()
                .then(async () => {
                    console.log("missions dropped!!");
                    // await missionsCollection.insertOne({
                    //     init: true,
                    // });
                })
                // .then(() => console.log("Seeded init!!"));

        // 더미 리스트 만들기
            // 코플릿 더미 넣기
            let missionsData = [];
            for (let i = 0; i < coplitDummyMissions.length; i++) {
                const user_id = await getRandomId(usersCollection); // 랜덤한 유저 _id 가져오기
                
                // colosseum 객체 만들기
                let colosseum: MissionColosseum
                if (i/2 === 0) {
                    colosseum = {
                        stakedTokens: 0,
                        limitSeconds: 1200,
                        challengings: []
                    };
                } else {
                    colosseum = {
                        stakedTokens: 0,
                        limitSeconds: 1800,
                        challengings: []
                    };
                };
                const year = new Date().getFullYear();
                const month = new Date().getMonth();
                const date = new Date().getDate();
                const hour = new Date().getHours()+1;
                const mission = {
                    title: coplitDummyMissions[i].title,
                    description: coplitDummyMissions[i].description,
                    paragraph: coplitDummyMissions[i].paragraph,
                    creator: user_id,
                    state: 1,
                    colosseum,
                    inputs: coplitDummyMissions[i].inputs,
                    output: coplitDummyMissions[i].output,
                    refCode: coplitDummyMissions[i].refCode,
                    testCases: coplitDummyMissions[i].testCases,
                    openTime: new Date(year, month, date, hour),
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
                missionsData.push(mission);
            }

            // 추가적으로 다른 더미들 넣을것 있으면 여기 추가해서 넣어도 됩니다~ 형식 맞춰서 missionsData 에 푸시만 잘 해주세요~
            // 단, 문제 타이블을 중복되지 않게 해주세요. 챌린지 더미들 만들때 임시적으로 미션 타이틀을 키로 쓰고있습니다.
            missionsData = await fakeCopiltMission('2',1, missionsData, usersCollection, 1, "0xe3b041ec3718260df021e2dcf7b589405cd3bf74");
            missionsData = await fakeCopiltMission('3',2, missionsData, usersCollection, 1, "0x73aa21914f5f8221b57ef5904942492459c8a4fe");
            missionsData = await fakeCopiltMission('4',3, missionsData, usersCollection, 1, "0xaa95289a2c8479d4a028c6f6740e374e59fd26c8");
            missionsData = await fakeCopiltMission('5',0, missionsData, usersCollection, 4);
            missionsData = await fakeCopiltMission('6',0, missionsData, usersCollection, 4);


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

async function fakeCopiltMission(n:string,t:number, missionsData:any, usersCollection:any, state?:number, account?:string):Promise<any> {
    for (let i = 0; i < coplitDummyMissions.length; i++) {
        let user_id:string;
        if (account) {user_id = await usersCollection.findOne({account}).then((res:any) => res._id);}
        else {user_id = await getRandomId(usersCollection);} // 랜덤한 유저 _id 가져오기
        
        // colosseum 객체 만들기
        let colosseum: MissionColosseum
        if (i/2 === 0) {
            colosseum = {
                stakedTokens: 0,
                limitSeconds: 1200,
                challengings: []
            };
        } else {
            colosseum = {
                stakedTokens: 0,
                limitSeconds: 1800,
                challengings: []
            };
        };
        const year = new Date().getFullYear();
        const month = new Date().getMonth();
        const date = new Date().getDate();
        const hour = new Date().getHours()+t;
        const mission = {
            title: coplitDummyMissions[i].title + n,
            description: coplitDummyMissions[i].description,
            paragraph: coplitDummyMissions[i].paragraph,
            creator: user_id,
            state: state? state : 1,
            colosseum,
            inputs: coplitDummyMissions[i].inputs,
            output: coplitDummyMissions[i].output,
            refCode: coplitDummyMissions[i].refCode,
            testCases: coplitDummyMissions[i].testCases,
            openTime: new Date(year, month, date, hour),
            createdAt: new Date(),
            updatedAt: new Date()
        }
        missionsData.push(mission);
    }
    return missionsData;
}