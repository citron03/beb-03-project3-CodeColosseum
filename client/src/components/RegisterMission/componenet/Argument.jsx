import S from "./Argument.styled";
import C from "../../CommonStyled";

const Argument = ({index, handleArgTypes, handleEmptyTestcase}) => {

    const handleChangeInput = (obj, idx) => {
        handleArgTypes(idx, obj);
    }
    
    return (
        <S.Argument>
            <S.P>{`${index + 1}번째 인자`}</S.P>
            <S.TextArea type="text" placeholder="인자 이름" onChange={(e) => handleChangeInput({name: e.target.value}, index)}/>
            <S.P>인자의 type</S.P>
            <C.Select name="type" onChange={(e) => {
                                    handleChangeInput({type: e.target.value}, index);
                                    handleEmptyTestcase();
                                }}>
                <C.Option value="string">문자열</C.Option>
                <C.Option value="number">숫자</C.Option>
                <C.Option value="boolean">부울</C.Option>
                <C.Option value="object">객체</C.Option>
                <C.Option value="array">배열</C.Option>
            </C.Select>
            <S.TextArea type="text" placeholder="description" onChange={(e) => handleChangeInput({description: e.target.value}, index)}/>
        </S.Argument>
    );
}

export default Argument;