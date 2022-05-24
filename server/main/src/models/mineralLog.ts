import { Schema, model } from "mongoose";
import type { MineralLogCode } from "../utils"; // 필드의 상세한 타입 정의 바로가기

const schema = new Schema(
  {
    code: { type: String, required: true }, // <MineralLogCode>
    mission: { type: Schema.Types.ObjectId, ref: "Mission" },
    challenge: { type: Schema.Types.ObjectId, ref: "Challenge", unique: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
  },
  { timestamps: true }
);

const Model = model("MineralLog", schema);

export = Model