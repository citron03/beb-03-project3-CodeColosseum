import { Router } from "express";
import controller from "../controller";

const userRouter = Router();
const { userController } = controller;

// 유저 정보 조회
// GET /user/:account
userRouter.get("/:account", userController.user.get);

// 유저 정보 수정 (하나의 정보만 수정하는 요청)
// PATCH /user/:account
userRouter.patch("/:account", userController.user.patch);

// 유저 생성
// POST /user/
userRouter.post("/", userController.user.post);

// 마이페이지 정보 조회
// GET /user/mypage/:user_id
userRouter.get("/mypage/:user_id", userController.mypage.get);

// mineral -> token 환전 요청
// GET /user/trading/:account
userRouter.get("/trading/:account", userController.trading.get);

// nft reward 출금 요청
// GET /user/withdraw/:account
userRouter.get("/withdraw/:account", userController.withdraw.get);

export = userRouter;
