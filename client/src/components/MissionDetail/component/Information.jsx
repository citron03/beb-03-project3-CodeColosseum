import S from "./Information.styled";

const Information = ({data}) => {

    return (
        <S.Information>
            <S.H1>{data.title}</S.H1>
            <S.P>출제자 : {data.creator}</S.P>
            <S.Pre>{data.paragraph}</S.Pre>
            <S.H2>테스트 케이스</S.H2>
            <S.TestCasesDiv>
                {data.testCases.filter(item => item.isExample).map((el, idx) => {
                    const input = JSON.stringify(el.inputs);
                    const output = JSON.stringify(el.output);
                    return (
                        <S.Div key={idx}>
                            <S.H2>{`input: ${input.slice(1, input.length - 1)}`}</S.H2>
                            <S.H2>{`output: ${output}`}</S.H2>
                        </S.Div>
                        );
                })}
            </S.TestCasesDiv>
        </S.Information>
    );
}

export default Information;