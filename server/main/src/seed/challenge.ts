import "../config";
// import { faker } from '@faker-js/faker';
import { MongoClient, ServerApiVersion } from 'mongodb';
import duummyChallenges from '../dummy/challenges';
import utils from '../utils';
import axios from 'axios';


const { MONGO_URI } = process.env;

async function seedDB() {

    if (MONGO_URI) {
        const client = new MongoClient(MONGO_URI, { serverApi: ServerApiVersion.v1 });

        try {
            await client.connect();
            console.log("DB connected!!");

            const challengesCollection = client.db("CoCo").collection("challenges");
            const missionsCollection = client.db("CoCo").collection("missions");
            const usersCollection = client.db("CoCo").collection("users");

        // 삭제
            await challengesCollection.drop()
                .then(async () => {
                    console.log("challenges dropped!!");
                    
                    // seed 개발 과정에서 콜렉션이 비어있으면 발생하는 오류를 제거하기위한 초기화 더미 도큐먼트 하나 생성
                    const challenger = await utils.func.getRandomId(usersCollection); // 랜덤한 유저 _id 가져오기
                    const mission = await utils.func.getRandomId(missionsCollection); // 랜덤한 미션 _id 가져오기
                    
                    await challengesCollection.insertOne({
                    challenger,
                    mission,
                    answerCode: `초기화 성공`,
                    passedCases: []
                    })
                })
                .then(() => console.log("Seeded init dummy!!"))

        // 더미 리스트 만들기
            let challengesData = [];
            for (let i = 0; i < duummyChallenges.length; i++) {
                const challenger = await utils.func.getRandomId(usersCollection); // 랜덤한 유저 _id 가져오기
                const mission = await missionsCollection.findOne({title: duummyChallenges[i].missionTitle}) // 미션 가져오기
                    .then((mission) => {
                        if (!mission) {
                            console.log(`mission not found by title: ${duummyChallenges[i].missionTitle}`);
                            return null;
                        } else {
                            return mission;
                        }
                    }
                );

                // grading 서버에서 채점해오기
                let passedCases
                if (mission) {
                    const testCases = mission.testCases;
                    const body = {
                        mission_id: mission,
                        code: duummyChallenges[i].answerCode,
                        testCases
                    }
                    const { data } = await axios.post("http://localhost:3003/grading", body);
                    passedCases = data.data.passedCases;
                } else {
                    passedCases = undefined;
                }

                // 채점 결과로 challenge 만들기
                const challenge = {
                    challenger,
                    mission: mission? mission._id : undefined,
                    answerCode: duummyChallenges[i].answerCode,
                    passedCases: passedCases,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }

                // 푸시
                challengesData.push(challenge);
            }

        // 삽입
            await challengesCollection.insertMany(challengesData)
                .then(() => console.log("Seeded Challenges!!"))
            
            client.close();
        } catch (e:any) {
            console.log(e.stack);
        }

    } else { console.log(`DB not connected!! Because MONGO_URI is Undefined.`); }
}

seedDB();