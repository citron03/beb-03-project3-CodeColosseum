export const defautCode = `function solution() {\n    let answer = "";\n    return answer;\n}`;

export const makeDefautCode = (args) => {

    return `function solution(${args.join(", ")}) {\n    let answer = "";\n    return answer;\n}`;
}

export const calculationKlay = 1000000000000000000;