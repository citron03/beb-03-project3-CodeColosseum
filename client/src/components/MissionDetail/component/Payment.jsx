import S from "./Payment.styled"
import C from "../../CommonStyled";
import { payKIP7 } from "../../../contracts/tokenContract";

const Payment = () => {

    return (
        <S.Payment>
            <S.H1>콜로세움에 도전하기 위해서 토큰의 지불이 필요합니다.</S.H1>
            <S.Div>
                <C.Button onClick={payKIP7}>지불하기</C.Button>
            </S.Div>
        </S.Payment>
    );
}

export default Payment;