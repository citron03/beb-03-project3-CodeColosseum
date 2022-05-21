import { Schema, model } from "mongoose";
import type { TokenPaymentLogFor } from '../utils/types'; // 필드의 상세한 타입 정의 바로가기

const schema = new Schema(
  {
    txHash: { type: String, required: true },
    from: { type: Schema.Types.ObjectId, ref: "User", required: true },
    to: { type: Schema.Types.ObjectId, ref: "Account", required: true },
    for: { type: Object, required: true }, // <TokenPaymentLogFor> 지불 대상 정보 {collection, id}
    token: { type: String, required: true }, // 지불 토큰 Symbol
    amount: { type: Number, required: true }, // 지불 양
    paymentAt: { type: Date, required: true }, // 대략적인 지불 시각
  },
  { timestamps: true }
);

const Model = model("tokenPaymentLog", schema);

export = Model