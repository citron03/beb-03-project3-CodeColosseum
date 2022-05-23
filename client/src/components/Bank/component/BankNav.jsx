import S from "./BankNav.styled";

const BankNav = ({setComponent, component}) => {
    return (
        <S.BankNav>
            <S.ComponentDiv onClick={() => setComponent("Collect")} selected={"Collect" === component}>
                수금
            </S.ComponentDiv>
            <S.ComponentDiv onClick={() => setComponent("TokenPurchase")} selected={"TokenPurchase" === component}>
                토큰 구매
            </S.ComponentDiv>
        </S.BankNav>
    );
}

export default BankNav;