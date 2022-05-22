import { Schema, model } from "mongoose";
import type { ChallengeKind } from "../utils"; // 필드의 상세한 타입 정의 바로가기

const schema = new Schema(
  {
    challenger: { type: Schema.Types.ObjectId, ref: "User", required: true }, // 제출자
    mission: { type: Schema.Types.ObjectId, ref: "Mission", required: true }, // 문제
    kind: { type: Number, required: true }, // <ChallengeKind> 챌린지 종류 (1: 콜로세움, 2: 연습문제)
    endTime: { type: Date, }, // 챌린지(콜로세움챌린지) 마감 시간 (시작시간 + 콜로세움리미트 + 여유시간10초) 백앤드에서 계산해서 저장하는것입니다.
    answerCode: { type: String }, // 코드
    isPassed: { type: Boolean }, // 정답 여부
    PassedCasesRate: { type: String }, // 케이스 통과 비율 ( 통과케이스 수 / 전체케이스 수 )
    passedCases: { type: [Boolean] }, // [true, false, true, ...] 테스트케이스 정답여부
    recordTime: { type: Number }, // 제출시간(초) 백앤드에서 계산해서 저장하는것입니다
  },
  { timestamps: true }
);

const Model = model("Challenge", schema);

export = Model;
