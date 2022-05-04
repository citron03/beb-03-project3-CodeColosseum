import S from "./Explanation.styled";

const Explanation = ({handleExplanation}) => {
    return (
        <S.Explanation>
            <S.TextArea placeholder="문제의 설명을 입력하세요" onChange={handleExplanation}/>
        </S.Explanation>
    );
}

export default Explanation;