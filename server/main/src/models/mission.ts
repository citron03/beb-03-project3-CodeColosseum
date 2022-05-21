import { Schema, model } from "mongoose";
import type { Output, Inputs, testCases, MissionState, MissionCollosseum, MissionNft } from '../utils/types'; // 필드의 상세한 타입 정의 바로가기

const schema = new Schema(
  {
    title: { type: String, required: true }, // 
    description: { type: String, /* required: true */ }, // 문제 리스팅에 보여줄 간단 설명
    paragraph: { type: String, required: true }, // 문제 지문
    creator: { type: Schema.Types.ObjectId, ref: "User", required: true }, // 크리에이터
    state : { type: Number, required: true }, // <MissionState> ( 1: 콜로세움진행중, 2: 콜로세움중료, 3: 종료되고 소유권 NFT 만들어짐, 4: 종료되고 NFT로 만들어지고 연습문제광맥의 미네랄광산으로 오픈됨 )
    colosseum: { type: Object }, // <MissionCollosseum>
    nft: { type: Object }, // <MissionNft>
    mineral: { type: Object}, // <MissionMineral>
    inputs: { type: Array, required: true }, // <Inputs>
    output: { type: Object, required: true }, // <Output>
    refCode: { type: String, required: true }, // 
    testCases: { type: Array, required: true }, // <testCases>
    // feedback: { type: Object, }, // 피드백 객체 { 별점평가, 코맨트, tag, 난이도투표, 리포트, 질문, 난이도rating, tagRating, 별점rating }
  },
  { timestamps: true }
);

const Model = model("Mission", schema);

export = Model