import S from "./Description.styled";

const Description = ({handleDescription}) => {
    return (
        <S.Description>
            <S.P>이 문제를 한 줄로 설명해주세요.</S.P>
            <S.TextArea placeholder="description" onChange={(e) => handleDescription(e)}/>
        </S.Description>
    );
}

export default Description;