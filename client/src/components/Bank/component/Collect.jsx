import S from "./Collect.styled";
import C from "./../../CommonStyled";

const Collect = () => {
    return (
        <S.Collect>
            <S.H2>수금</S.H2>
            <S.BorderDiv>
                <S.Span>적립된 광산 수입</S.Span>
                <S.SpanHighlight>1000</S.SpanHighlight>
                <S.Span>미네랄</S.Span>
            </S.BorderDiv>
            <S.Div>
                <S.SpanHighlight>900</S.SpanHighlight>
                <S.Span>미네랄</S.Span>
                <C.Button>수금하기</C.Button>
            </S.Div>
            <S.P>500미만의 미네랄은 교역할 수 없습니다.</S.P>
        </S.Collect>
    );
}

export default Collect;