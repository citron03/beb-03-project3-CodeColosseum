import S from "./TestCase.styled";
import C from "../../CommonStyled";

const TestCase = ({data, handleRemoveTestCase, index, handleTestCaseIsExample}) => {

    return (
        <S.TestCase>
            <S.Span>inputs : {JSON.stringify(data.inputs)}</S.Span>
            <S.Span>output : {JSON.stringify(data.output)}</S.Span>
            <C.Button onClick={() => handleRemoveTestCase(index)}>x</C.Button>
            <S.Div>
                <S.Label>예제로 공개하기</S.Label>
                <S.Checkbox type="checkbox" onChange={(e) => handleTestCaseIsExample(e, index)}/>
            </S.Div>
        </S.TestCase>
    );
}

export default TestCase;