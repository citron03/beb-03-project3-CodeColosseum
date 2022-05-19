import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    name: { type: String, required: true },
    account: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const Model = model("Account", schema);

export = Model