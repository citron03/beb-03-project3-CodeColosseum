import S from "./TestCase.styled";

const TestCase = ({data, handleRemoveTestCase, index}) => {

    return (
        <S.TestCase>
            <S.Span>input : {JSON.stringify(data.input)}</S.Span>
            <S.Span>output : {JSON.stringify(data.output)}</S.Span>
            <S.Button onClick={() => handleRemoveTestCase(index)}>X</S.Button>
        </S.TestCase>
    );
}

export default TestCase;