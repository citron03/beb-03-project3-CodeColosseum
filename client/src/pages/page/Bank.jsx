import S from "./Bank.styled";
import { Collect, TokenPurchase } from "../../components/Bank";
import { useCheckLogin } from "../../utils/login";

const Bank = () => {
    useCheckLogin();
    return (
        <S.Bank>
            <S.H1>은행</S.H1>
            <Collect/>
            <TokenPurchase/>
        </S.Bank>
    );
}

export default Bank;