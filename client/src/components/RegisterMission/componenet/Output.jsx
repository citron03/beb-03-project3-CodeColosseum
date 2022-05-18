import S from "./Output.styled";
import C from "../../CommonStyled";

const Output = ({setOutput, handleEmptyTestcase}) => {

    const handleOutputDescription = (e) => {
        setOutput(prev => Object.assign({...prev}, {description: e.target.value}));
    }

    const handleOutputType = (e) => {
        setOutput(prev => Object.assign({...prev}, {type: e.target.value}));
    }

    return (
        <S.Output>
            <S.P>아웃풋</S.P>
            <S.TextArea type="text" placeholder="description" onChange={(e) => handleOutputDescription(e)}/>
            <S.P>아웃풋의 type</S.P>
            <C.Select name="type" onChange={(e) => {
                                handleOutputType(e);
                                handleEmptyTestcase();
                            }}>
                <C.Option value="string">문자열</C.Option>
                <C.Option value="number">숫자</C.Option>
                <C.Option value="boolean">부울</C.Option>
                <C.Option value="object">객체</C.Option>
                <C.Option value="array">배열</C.Option>
            </C.Select>
        </S.Output>
    );
}

export default Output;