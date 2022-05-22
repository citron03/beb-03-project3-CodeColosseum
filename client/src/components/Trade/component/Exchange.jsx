import S from "./Exchange.styled";
import C from "./../../CommonStyled";

const Exchange = () => {
    return (
        <S.Exchange>
            <S.H2>교환</S.H2>
            <S.BorderDiv>
                <S.RowDiv>
                    <S.ColDiv>
                        <S.Div>
                            <S.Span>보유 미네랄</S.Span>
                            <S.SpanHighlight>1000</S.SpanHighlight>
                        </S.Div>
                        <S.Div>
                            <S.Span>수수료</S.Span>
                            <S.SpanHighlight>-100</S.SpanHighlight>
                            <S.Span>수수료율 10%</S.Span>
                        </S.Div>
                        <S.SmallP>보유 미네랄이 많아질수록, 수수료가 떨어집니다.</S.SmallP>
                    </S.ColDiv>
                    <S.ArrowSpan>→</S.ArrowSpan>
                    <S.Div>
                        <S.SpanHighlight>900</S.SpanHighlight>
                        <S.Span>CCT</S.Span>
                    </S.Div>
                </S.RowDiv>
            </S.BorderDiv>
            <C.Button>교역하기</C.Button>
            <S.P>500미만의 미네랄은 교역할 수 없습니다.</S.P>
        </S.Exchange>
    );
}

export default Exchange;