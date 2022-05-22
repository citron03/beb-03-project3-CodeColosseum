import S from "./TokenPurchase.styled";
import C from "./../../CommonStyled";

const TokenPurchase = () => {
    return (
        <S.TokenPurchase>
            <S.H2>토큰 구매 하기</S.H2>
            <S.BorderDiv>
                <S.Div>
                    <S.Span>지불</S.Span>
                    <S.SpanHighlight>100</S.SpanHighlight>
                    <S.Span>Klay</S.Span>
                </S.Div>                
                <S.P>☟</S.P>
                <S.Div>
                    <S.Span>획득!</S.Span>
                    <S.SpanHighlight>1000</S.SpanHighlight>
                    <S.Span>CCT</S.Span>
                </S.Div>
                <C.Button>환전하기</C.Button>
            </S.BorderDiv>
        </S.TokenPurchase>
    );
}

export default TokenPurchase;