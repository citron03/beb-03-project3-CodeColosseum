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

type MissionState = 1|2|3|4;

interface MissionCollosseum {
    stakedTokens: number,
    winner?: string,
}

interface MissionNft {
    txHash: string,
    ipfs: string,
    contractAddress: string,
    tokenId: number,
}

export type { Input, Output, Inputs, testCase, testCases, MissionCollosseum, MissionNft, MissionState };