import { Router } from "express";
import controller from '../controller';

const missionRouter = Router();
const { missionController } = controller;

// GET /mission/list/ : 미션 리스트 조회
missionRouter.get("/list/", missionController.getMissionList.get);


export = missionRouter;