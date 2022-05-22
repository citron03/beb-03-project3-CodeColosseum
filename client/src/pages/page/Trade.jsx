import S from "./Trade.styled";
import { Exchange } from "../../components/Trade";
import { useCheckLogin } from "../../utils/login";

const Trade = () => {
    useCheckLogin();
    return (
        <S.Trade>
            교역소
            <Exchange/>
        </S.Trade>
    );
}

export default Trade;