// 공통 타입 정의
// DB에 저장할 때 등등 타입검사에 가져다가 쓰기


interface Input {
    name: string,
    type: string,
    description: string,
    ex?: any
};

interface Output{
    type: string,
    description: string,
    ex?: any
};

type Inputs = Input[];

interface testCase {
    inputs: any,
    output: any,
    isExample?: boolean
};

type testCases = testCase[];

type MissionState = 0|1|2|3|4; // 0: etc

interface Challenger {
    account: string,
    challengedAt: Date,
}
interface MissionCollosseum {
    stakedTokens: number,
    limitSeconds: number, // 1200 ~ 3600
    winner?: Challenger,
    losers?: Challenger[],
    challengings?: Challenger[],
}

interface MissionNft {
    txHash: string,
    ipfs: string,
    contractAddress: string,
    tokenId: number,
}

type ChallengeKind = 0|1|2; // 0: etc

interface TokenPaymentLogItem {
    collection: number, // 0: etc, 1: challenge
    id: string,
}

export type { Input, Output, Inputs, testCase, testCases, MissionCollosseum, MissionNft, MissionState, ChallengeKind, TokenPaymentLogItem };