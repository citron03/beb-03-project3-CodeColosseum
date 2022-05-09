import S from "./Information.styled";

const Information = ({data}) => {
    return (
        <S.Information>
            <S.H1>{data.title}</S.H1>
            <S.H2>{data.explanation}</S.H2>
            <S.H3>{`예시 테스트 케이스 : ${data.testcases[0].input} ---> ${data.testcases[0].output}`}</S.H3>
        </S.Information>
    );
}

export default Information;