import { Router } from "express";
import controller from "../controller";

const missionRouter = Router();
const { missionController } = controller;

// 미션 리스트 요청
// GET /mission/list
missionRouter.get("/list", missionController.missionList.get);

// 미션 출제
// POST /mission/create
missionRouter.post("/create", missionController.create.post);

// 미션 상세 페이지 요청(콜로세움)
// POST /mission/colosseum/:mission_id
missionRouter.post(
  "/colosseum/:mission_id",
  missionController.colosseumOpen.post
);

// 미션 상세 페이지 요청(연습문제)
// POST /mission/practice/:mission_id
missionRouter.get("/practice/:mission_id", missionController.practiceOpen.get);

// 풀이 제출(콜로세움)
// POST /mission/challenge/colosseum
missionRouter.post(
  "/challenge/colosseum",
  missionController.challengeColosseum.post
);

// 풀이 제출(연습문제)
// POST /mission/challenge/practice
missionRouter.post(
  "/challenge/practice",
  missionController.challengePractice.post
);

// NFT 전환 요청
// POST /mission/mintnft
missionRouter.post("/mission/mintnft", missionController.mintNft.post);

// 연습문제 전환 요청 API
// POST /mission/changetopractice
missionRouter.post(
  "/mission/changetopractice",
  missionController.changeToPractice.post
);

export = missionRouter;
