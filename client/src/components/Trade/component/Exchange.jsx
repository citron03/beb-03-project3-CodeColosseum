import S from "./Exchange.styled";
import C from "./../../CommonStyled";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { showNotification } from "./../../../redux/action";
import { FaLongArrowAltRight } from 'react-icons/fa';
import { useEffect, useState } from "react";
import { calFeerate, calFee, calAmount } from "../../../utils/fee";

const Exchange = () => {

    const account = useSelector(state => state.signup).account;
    const [mineral, setMineral] = useState(0);
    const dispatch = useDispatch();
    
    useEffect(() => {
        if(account?.mineral){
            setMineral(account.mineral);
        }
    }, [account])

    const handleTrade = async () => {
        if(mineral < 500) {
            dispatch(showNotification(`미네랄이 부족합니다.\n보유 미네랄: ${mineral}`));
            return;
        }
        if(account?.account){
            try {
                const res = await axios.get(`/user/trading/${account.account}`);
                setMineral(0);
                dispatch(showNotification("교역이 완료되었습니다."));
                if(!res){
                    console.log(res);
                }
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
                            <S.SpanHighlight>{mineral}</S.SpanHighlight>
                        </S.Div>
                        <S.Div>
                            <S.Span>수수료</S.Span>
                            <S.SpanHighlight>-{Number(calFee(mineral)).toFixed(2)}</S.SpanHighlight>
                            <S.Span>수수료율 {Number(calFeerate(mineral)).toFixed(2)}%</S.Span>
                        </S.Div>
                        <S.SmallP>보유 미네랄이 많아질수록, 수수료가 떨어집니다.</S.SmallP>
                    </S.ColDiv>
                    <S.ArrowSpan>
                        <FaLongArrowAltRight/>
                    </S.ArrowSpan>
                    <S.Div>
                        <S.SpanHighlight>{Number(calAmount(mineral)).toFixed(2)}</S.SpanHighlight>
                        <S.Span>CCT</S.Span>
                    </S.Div>
                </S.RowDiv>
            </S.BorderDiv>
            {mineral < 500 ? <S.P>500미만의 미네랄은 교역할 수 없습니다.</S.P> 
                : <C.Button onClick={() => handleTrade()}>교역하기</C.Button>}
        </S.Exchange>
    );
}

export default Exchange;