// 실재 사용하지는 않는다

import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    symbol: { type: String, unique: true },
    address: { type: String, required: true, unique: true },
    colosseum: { type: String },
  },
  { timestamps: true }
);

const Model = model("Contract", schema);

// export = Model