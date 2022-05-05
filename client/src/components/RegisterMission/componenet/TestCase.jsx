import S from "./TestCase.styled";

const TestCase = ({data}) => {
    console.log(data[0]);
    return (
        <S.TestCase>
            <S.Span>input : {JSON.stringify(data[0].input)}</S.Span>
            <S.Span>output : {JSON.stringify(data[0].output)}</S.Span>
        </S.TestCase>
    );
}

export default TestCase;