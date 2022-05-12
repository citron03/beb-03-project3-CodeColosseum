import S from "./Output.styled";

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
            <S.Input type="text" placeholder="description" onChange={(e) => handleOutputDescription(e)}/>
            <S.Label>인자의 type</S.Label>
            <S.Select name="type" onChange={(e) => {
                                handleOutputType(e);
                                handleEmptyTestcase();
                            }}>
                <S.Option value="string">문자열</S.Option>
                <S.Option value="number">숫자</S.Option>
                <S.Option value="boolean">부울</S.Option>
                <S.Option value="object">객체</S.Option>
                <S.Option value="array">배열</S.Option>
            </S.Select>
        </S.Output>
    );
}

export default Output;