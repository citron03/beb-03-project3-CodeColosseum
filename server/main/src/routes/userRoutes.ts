import { Router } from "express";
import controller from '../controller';

const userRouter = Router();
const { userController } = controller;

// 유저 정보 조회
// GET /user/:account
userRouter.get("/:account", userController.user.get);

// 유저 생성
// POST /user/
userRouter.post("/", userController.user.post);

// 마이페이지 정보 조회
// GET /user/mypage/:account
// userRouter.get("/mypage/:account", userController.mypage.get);

// 유저 정보 수정
// PATCH /user/
// userRouter.patch("/", userController.user.patch);

export = userRouter;