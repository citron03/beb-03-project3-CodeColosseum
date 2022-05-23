import S from "./Bank.styled";
import { Collect, TokenPurchase, BankNav } from "../../components/Bank";
import { useCheckLogin } from "../../utils/login";
import { useState } from "react";

const Bank = () => {
    useCheckLogin();
    const [component, setComponent] = useState("Collect");
    return (
        <S.Bank>
            <S.H1>은행</S.H1>
            <BankNav setComponent={setComponent} component={component}/>
            {component === "Collect" ? 
                <Collect/> : <TokenPurchase/>}
        </S.Bank>
    );
}

export default Bank;