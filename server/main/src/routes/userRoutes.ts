import { Router } from "express";
import controller from '../controller';

const userRouter = Router();
const { userController } = controller;

// GET /user/:account : 유저 정보 조회
userRouter.get("/:account", userController.user.get);

// POST /user/ : 유저 생성
userRouter.post("/", userController.user.post);

// GET /user/mypage/:account : 마이페이지 정보 조회
// userRouter.get("/mypage/:account", userController.mypage.get);


export = userRouter;