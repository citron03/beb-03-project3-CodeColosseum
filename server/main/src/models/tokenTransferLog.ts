import { Schema, model } from "mongoose";
import type { TokenTransferLogFor, TokenTransferLogCode } from '../utils'; // 필드의 상세한 타입 정의 바로가기

const schema = new Schema(
  {
    txHash: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    feePayer: { type: String, required: true },
    code: { type: Number, required: true }, // <TokenTransferLogCode> 0:?? 1: 콜로세움도전 2: 위너보상 3: 출제자보상 4: nft보상수금 5: 교역소 6?: 상품구매? 7: 토큰구매
    for: { type: Object, required: true }, // <TokenTransferLogFor> {collection, id}
    token: { type: String, required: true }, // 토큰 Symbol
    amount: { type: Number, required: true },
    paymentAt: { type: Date }, // 대략적인 전송 시각
  },
  { timestamps: true }
);

const Model = model("TokenTransferLog", schema);

export = Model