import S from "./Bank.styled";
import { Collect, TokenPurchase, BankNav } from "../../components/Bank";
import { useRefreshLogin } from "../../utils/login";
import { useState } from "react";

const Bank = () => {
    useRefreshLogin();
    const [component, setComponent] = useState("Collect");
    return (
        <S.Bank>
            <S.H1>
                <S.OutlineBank/>은행
            </S.H1>
            <BankNav setComponent={setComponent} component={component}/>
            {component === "Collect" ? 
                <Collect/> : <TokenPurchase/>}
        </S.Bank>
    );
}

export default Bank;