import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    code: { type: Number, required: true }, // 1: + 2: -
    mission: { type: Schema.Types.ObjectId, ref: "Mission" },
    challenge: { type: Schema.Types.ObjectId, ref: "Challenge" },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
  },
  { timestamps: true }
);

const Model = model("MineralLog", schema);

export = Model