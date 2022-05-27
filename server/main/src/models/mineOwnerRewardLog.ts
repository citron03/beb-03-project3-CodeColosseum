import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    code: { type: String, required: true }, // <MineOwnerRewardLogCode> "reward" | "withdraw"
    nft: { type: Schema.Types.ObjectId, ref: "Mission" },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
  },
  { timestamps: true }
);

const Model = model("MineOwnerRewardLog", schema);

export = Model;
