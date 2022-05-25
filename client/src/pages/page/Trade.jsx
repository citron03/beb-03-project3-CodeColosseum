import S from "./Trade.styled";
import { Exchange } from "../../components/Trade";
import { useRefreshLogin } from "../../utils/login";

const Trade = () => {
    useRefreshLogin();
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