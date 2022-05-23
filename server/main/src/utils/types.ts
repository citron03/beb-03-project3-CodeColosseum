// 공통 타입 정의
// DB에 저장할 때 등등 타입검사에 가져다가 쓰기

interface Input {
  name: string;
  type: string;
  description: string;
  ex?: any;
}

interface Output {
  type: string;
  description: string;
  ex?: any;
}

type Inputs = Input[];

interface testCase {
  inputs: any;
  output: any;
  isExample?: boolean;
}

type TestCases = testCase[];

type MissionState = 0 | 1 | 2 | 3 | 4; // 0: etc ( 1: 콜로세움진행중, 2: 콜로세움중료(우승자나옴), 3: 종료되고 소유권 NFT 만들어짐, 4: 종료되고 NFT로 만들어지고 연습문제광맥의 미네랄광산으로 오픈됨 )

interface Challenger {
  account: string;
  challengedAt: Date;
}
interface MissionCollosseum {
  isRewarded?: boolean;
  stakedTokens: number;
  limitSeconds: number; // 1200 ~ 3600
  winner?: Challenger;
  losers?: Challenger[];
  challengings?: Challenger[];
}

interface MissionNft {
  txHash: string;
  ipfs: string;
  contractAddress: string;
  tokenId: number;
}

type ChallengeKind = 0 | 1 | 2; // 0: etc

type Collection = "Mission" | "Challenge";

interface TokenTransferLogFor {
  collection: Collection; // 콜렉션 이름
  id: string; // 도큐먼트_id
}

type TokenTransferLogCode = 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0:?? 1: 콜로세움도전 2: 위너보상 3: 크리에이터보상 4: nft보상수금 5: 교역소 6?: 상품구매? 7: 토큰구매

interface TxExcutionResult {
  success: boolean;
  result: any; // 성공시 이곳에 txReceipt 들어감
  to?: string;
  amount?: string;
  resultAt?: Date;
}
export type {
  Input,
  Output,
  Inputs,
  testCase,
  TestCases,
  MissionCollosseum,
  MissionNft,
  MissionState,
  ChallengeKind,
  TokenTransferLogFor,
  Challenger,
  TokenTransferLogCode,
  TxExcutionResult,
};
