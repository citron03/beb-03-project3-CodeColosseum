import { Schema, model } from "mongoose";
import type {
  Output,
  Inputs,
  TestCases,
  MissionState,
  MissionColosseum,
  MissionMineOwnershipNft,
} from "../utils"; // 필드의 상세한 타입 정의 바로가기

const schema = new Schema(
  {
    title: { type: String, required: true }, //
    description: { type: String /* required: true */ }, // 문제 리스팅에 보여줄 간단 설명
    paragraph: { type: String, required: true }, // 문제 지문
    creator: { type: Schema.Types.ObjectId, ref: "User", required: true }, // 크리에이터
    state: { type: Number, required: true }, // <MissionState>
    colosseum: { type: Object }, // <MissionColosseum>
    mineOwnershipNft: { type: Object }, // <MissionMineOwnershipNft>
    // mine: { type: Object}, // <MissionMine>
    inputs: { type: Array, required: true }, // <Inputs>
    output: { type: Object, required: true }, // <Output>
    refCode: { type: String, required: true }, //
    testCases: { type: Array, required: true }, // <TestCases>
    feedback: { type: Object }, // 피드백 객체 { difficulty, quality, participatedNum }
    openTime: { type: String, required: true },
  },
  { timestamps: true }
);

const Model = model("Mission", schema);

export = Model;
