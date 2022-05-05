import S from "./Argument.styled";

const Argument = ({index, handleArgTypes}) => {
    return (
        <S.Argument>
            {`${index + 1}번째 인자의 타입`}
            <S.Select name="type" onChange={(e) => handleArgTypes(index, e.target.value)}>
                <S.Option value="string">문자열</S.Option>
                <S.Option value="integer">정수</S.Option>
                <S.Option value="boolean">부울</S.Option>
                <S.Option value="object">객체</S.Option>
                <S.Option value="array">배열</S.Option>
            </S.Select>
        </S.Argument>
    );
}

export default Argument;