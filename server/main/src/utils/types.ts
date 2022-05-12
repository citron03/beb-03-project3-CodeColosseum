type Input = {name: string, type: string, required: boolean, description: string, ex?: any};
type Output = {type: string, description: string, ex?: any};
type Inputs = Input[];

type testCase = {inputs: any, output: any, isExample?: boolean};
type testCases = testCase[];

export type { Input, Output, Inputs, testCase, testCases };