import S from "./Exchange.styled";
import C from "./../../CommonStyled";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { showNotification } from "./../../../redux/action";

const Exchange = () => {

    const account = useSelector(state => state.signup).account;
    const dispatch = useDispatch();
    
    const handleTrade = async () => {
        if(account?.mineral <= 0) {
            dispatch(showNotification(`미네랄이 부족합니다.\n보유 미네랄: ${account.mineral}`));
            return;
        }
        if(account?.account){
            try {
                const res = await axios.get(`/user/trading/${account.account}`);
                dispatch(showNotification("교역이 완료되었습니다."));
                console.log(res);
            } catch {
                dispatch(showNotification("교역에 실패하였습니다."));
            }
        } else {
            dispatch(showNotification("로그인이 필요합니다."));
        }
    }

    return (
        <S.Exchange>
            <S.H2>교환</S.H2>
            <S.BorderDiv>
                <S.RowDiv>
                    <S.ColDiv>
                        <S.Div>
                            <S.Span>보유 미네랄</S.Span>
                            <S.SpanHighlight>{account.mineral}</S.SpanHighlight>
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
                        <S.SpanHighlight>{account.mineral / 10 ? account.mineral / 10 : 0}</S.SpanHighlight>
                        <S.Span>CCT</S.Span>
                    </S.Div>
                </S.RowDiv>
            </S.BorderDiv>
            <C.Button onClick={() => handleTrade()}>교역하기</C.Button>
            <S.P>500미만의 미네랄은 교역할 수 없습니다.</S.P>
        </S.Exchange>
    );
}

export default Exchange;