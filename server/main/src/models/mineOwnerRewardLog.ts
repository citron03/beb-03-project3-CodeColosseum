// 실재 사용하지는 않는다

import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    code: { type: String, required: true }, // <MineOwnerRewardLogCode> "reward" | "withdraw"
    nft: { type: Schema.Types.ObjectId, ref: "Nft" },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
  },
  { timestamps: true }
);

const Model = model("MineOwnerRewardLog", schema);

export = Model;
