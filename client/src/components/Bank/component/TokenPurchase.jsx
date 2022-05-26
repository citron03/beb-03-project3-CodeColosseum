import S from "./TokenPurchase.styled";
import C from "./../../CommonStyled";
import { FaLongArrowAltDown } from 'react-icons/fa';
import { useDispatch } from "react-redux";
import { showNotification } from "../../../redux/action";

const TokenPurchase = () => {
    const disptach = useDispatch();

    const handlePerchase = () => {
        disptach(showNotification("아직 구매 기능은 구현되지 않았습니다."));
    }

    return (
        <S.TokenPurchase>
            <S.H2>토큰 구매 하기</S.H2>
            <S.BorderDiv>
                <S.Div>
                    <S.Span>지불</S.Span>
                    <S.SpanHighlight>100</S.SpanHighlight>
                    <S.Span>Klay</S.Span>
                </S.Div>                
                <S.P>
                    <FaLongArrowAltDown/>
                </S.P>
                <S.Div>
                    <S.Span>획득!</S.Span>
                    <S.SpanHighlight>1000</S.SpanHighlight>
                    <S.Span>CCT</S.Span>
                </S.Div>
                <C.Button onClick={handlePerchase}>환전하기</C.Button>
            </S.BorderDiv>
        </S.TokenPurchase>
    );
}

export default TokenPurchase;