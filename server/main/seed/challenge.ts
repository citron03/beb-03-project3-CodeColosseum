import { ENV, fromDb } from "../src/config";
// import { faker } from '@faker-js/faker';
import { MongoClient, ServerApiVersion } from "mongodb";
import duummyChallenges from "../dummy/challenges";
import { getRandomId } from "../src/utils";
import axios from "axios";
import { Challenger } from "../src/utils/types";

async function seedDB() {
  if (ENV.MONGO_URI) {
    const client = new MongoClient(ENV.MONGO_URI, {
      serverApi: ServerApiVersion.v1,
    });

    try {
      await client.connect();
      console.log(`DB ${ENV.MONGO_database} connected!!`);

      const challengesCollection = client
        .db(ENV.MONGO_database)
        .collection("challenges");
      const missionsCollection = client
        .db(ENV.MONGO_database)
        .collection("missions");
      const usersCollection = client.db(ENV.MONGO_database).collection("users");

      // 삭제
      await challengesCollection
        .drop()
        .then(async () => {
          console.log("challenges dropped!!");
          await challengesCollection.insertOne({
            init: true,
          });
        })
        .then(() => console.log("Seeded init!!"));

      // 더미 리스트 만들기
      let challengesData = [];
      for (let i = 0; i < duummyChallenges.length; i++) {
        const challenger = await getRandomId(usersCollection); // 랜덤한 유저 _id 가져오기
        const mission = await missionsCollection
          .findOne({ title: duummyChallenges[i].missionTitle }) // 미션 가져오기
          .then((mission) => {
            if (!mission) {
              console.log(
                `mission not found by title: ${duummyChallenges[i].missionTitle}`
              );
              return null;
            } else {
              return mission;
            }
          });

        // grading 서버에서 채점해오기
        let isPassed: boolean | undefined;
        let PassedCasesRate: string | undefined;
        let passedCases: boolean[] | undefined;
        let endTime: Date | undefined;
        const recordTime = 1500; // 편의상 1500초 라고 가정하기

        if (mission && ENV.GRADING_SERVER) {
          const testCases = mission.testCases;
          const body = {
            code: duummyChallenges[i].answerCode,
            testCases,
          };
          const { data } = await axios.post(
            ENV.GRADING_SERVER,
            body
          ); // grading 서버에서 채점결과 가져옴
          // 채점 결과를 바탕으로 isPassed, passedCasesRate, passedCases 정의하기
          isPassed = data.data.failCount === 0 ? true : false;
          PassedCasesRate = `${testCases.length - data.data.failCount} / ${
            testCases.length
          }`;
          passedCases = data.data.passedCases;

          // mission.colosseum 업데이트하기
          let colosseum = mission.colosseum;

          const challengerDoc = await usersCollection.findOne({
            _id: challenger,
          });
          let colosseumChallenger: Challenger;
          if (challengerDoc) {
            colosseumChallenger = {
              account: challengerDoc.account,
              challengedAt: new Date(),
            };
          } else {
            colosseumChallenger = {
              account: "user not found(seed bug)",
              challengedAt: new Date(),
            };
          }

          colosseum.challengings = [];
          colosseum.challengings.push(colosseumChallenger);

          if (isPassed && mission.colosseum.limitSeconds >= recordTime) {
            // 콜로세움 성공인경우
            colosseum.winner = colosseumChallenger; // 위너에 추가
            await missionsCollection.updateOne(
              { _id: mission._id },
              { $set: { state: 2, colosseum } }
            ); // 상태도 수정
          } else {
            // 성공이 아닌경우
            colosseum.losers = [];
            colosseum.losers.push(colosseumChallenger); // 루저에 추가
            colosseum.stakedTokens += parseInt(fromDb.CCToken.colosseum); // 토큰 스테이크
            await missionsCollection.updateOne(
              { _id: mission._id },
              { $set: { colosseum } }
            );
          }

          // endTime 만들기
          endTime = new Date();
          endTime.setSeconds(endTime.getSeconds() + colosseum.limitSeconds);
        } else {
          passedCases = undefined;
          PassedCasesRate = undefined;
          isPassed = undefined;
          endTime = undefined;
        }

        // 채점 결과로 challenge 만들기
        const challenge = {
          challenger,
          mission: mission ? mission._id : undefined,
          kind: 1,
          endTime,
          answerCode: duummyChallenges[i].answerCode,
          isPassed,
          PassedCasesRate,
          passedCases,
          recordTime,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        // 푸시
        challengesData.push(challenge);
      }

      // fake 도전 만들기
      for (let i=0; i < 100; i++) {
        
        const challenger = await getRandomId(usersCollection)
        const mission = await getRandomId(missionsCollection);

        const challenge = {
          challenger,
          mission,
          kind: 1,
        }
        challengesData.push(challenge);

        // 콜로세움 변경
        const randomMission = await missionsCollection.findOne({
          _id: mission,
        });
        if (!randomMission) {throw new Error("mission not found")}
        let colosseum = randomMission.colosseum;
        const colosseumChallenger = {
          account: challenger,
          challengedAt: new Date(),
        };
        colosseum.challengings.push(colosseumChallenger);
        colosseum.stakedTokens += parseInt(fromDb.CCToken.colosseum); // 토큰 스테이크
        await missionsCollection.updateOne(
          { _id: mission },
          { $set: { colosseum } }
        );
      }

      // 삽입
      await challengesCollection
        .insertMany(challengesData)
        .then(() => console.log("Seeded Challenges!!"));

      client.close();
    } catch (e: any) {
      console.log(e.stack);
    }
  } else {
    console.log(`DB not connected!! Because MONGO_URI is Undefined.`);
  }
}

seedDB();
