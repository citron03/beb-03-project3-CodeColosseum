import S from "./Trade.styled";
import { Exchange } from "../../components/Trade";
import { useCheckLogin } from "../../utils/login";

const Trade = () => {
    useCheckLogin();
    return (
        <S.Trade>
            <S.H1>
                <S.Handshake/>교역소
            </S.H1>
            <Exchange/>
        </S.Trade>
    );
}

export default Trade;