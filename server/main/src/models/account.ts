// 실재 사용하지는 않는다

import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    name: { type: String, unique: true },
    account: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const Model = model("Account", schema);

// export = Model