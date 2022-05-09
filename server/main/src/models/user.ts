import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    nickName: { type: String, required: true }, // 유니크 속성 안줄것임. 저장할때 중복여부 확인할것임.
    account: { type: String, required: true, unique: true }, // 거의 id 처럼 쓰이는 필드
    // rating: { type: Number }, // 상대적으로 문제를 얼마나 잘 푸는가
    // tagRating: { type: Array }, // 상대적인 태그별로 문제를 얼마나 잘 푸는가 [...{tag_id, rating}]
    // levelVoteRatio: { type: Number }, // 상대적인 문제 난이도 투표 성향
    // tagLevelVoteRatio: { type: Array }, // 태그별 상대적인 문제 난이도 투표 성향 [...{tag_id, ratio}]
    // 별점 평가 레이팅
  },
  { timestamps: true }
);

const User = model("User", UserSchema);

export = User