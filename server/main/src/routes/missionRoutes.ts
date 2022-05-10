import { Router } from "express";
import controller from "../controller";

const missionRouter = Router();
const { missionController } = controller;

// 미션 풀이 제출
// POST /mission/chllenge/
missionRouter.post("/challenge", missionController.challenge.post);

// 미션 리스트 조회
// GET /mission/list/
missionRouter.get("/list/", missionController.missionList.get);

// 개별 미션 상세 조회
// GET /mission/:mission_id
missionRouter.get("/:mission_id", missionController.mission.get);

// 미션 생성
// POST /mission/
missionRouter.post("/", missionController.mission.post);

export = missionRouter;
