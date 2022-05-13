import { Schema, model } from "mongoose";
import type { TokenPaymentLogItem } from '../utils/types'; // 필드의 상세한 타입 정의 바로가기

const schema = new Schema(
  {
    txHash: { type: String, required: true },
    from: { type: Schema.Types.ObjectId, ref: "User", required: true },
    to: { type: Schema.Types.ObjectId, ref: "Account", required: true },
    item: { type: Object, required: true }, // <TokenPaymentLogItem> 지불 대상 정보 {collection, id}
    token: { type: String, required: true }, // 지불 토큰
    amount: { type: Number, required: true }, // 지불 양
  },
  { timestamps: true }
);

const Model = model("tokenPaymentLog", schema);

export = Model