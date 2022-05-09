import S from "./TestCase.styled";
import C from "../../CommonStyled";

const TestCase = ({data, handleRemoveTestCase, index, handleTestCaseHide}) => {

    return (
        <S.TestCase>
            <S.Span>input : {JSON.stringify(data.input)}</S.Span>
            <S.Span>output : {JSON.stringify(data.output)}</S.Span>
            <C.Button onClick={() => handleRemoveTestCase(index)}>X</C.Button>
            <S.Div>
                <S.Label>숨기기</S.Label>
                <S.Checkbox type="checkbox" onChange={(e) => handleTestCaseHide(e, index)}/>
            </S.Div>
        </S.TestCase>
    );
}

export default TestCase;