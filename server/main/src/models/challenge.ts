import { Schema, model } from "mongoose";
import type { ChallengeKind } from '../utils/types'; // 필드의 상세한 타입 정의 바로가기

const schema = new Schema(
  {
    challenger: { type: Schema.Types.ObjectId, ref: "User", required: true }, // 제출자
    mission: { type: Schema.Types.ObjectId, ref: "Mission", required: true }, // 문제
    kind: { type: Number, required: true }, // <ChallengeKind> 챌린지 종류 (1: 콜로세움, 2: 연습문제)
    answerCode: { type: String }, // 코드
    isPassed: { type: Boolean }, // 정답 여부
    PassedCasesRate: { type: String }, // 케이스 통과 비율 ( 통과케이스 수 / 전체케이스 수 )
    passedCases: { type: [Boolean] }, // [true, false, true, ...] 테스트케이스 정답여부
    // time: { type: Number, required: true }, // 제출시간(초)
    // kind: { type: String, required: true }, // 제출 종목 (콜로세움, 연습 등)
  },
  { timestamps: true }
);

const Model = model("Challenge", schema);

export = Model