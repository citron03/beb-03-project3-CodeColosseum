import S from "./Map.styled";
import { ColosseumImg, parchment, tradeImg, bankImg, mineImg } from "../../assets/map";
import { useNavigate } from "react-router-dom";

const Map = () => {
    const navigate = useNavigate();
    return (
        <S.Map mapImg={parchment}>
            <S.ColosseumImg src={ColosseumImg} alt="콜로세움" title="콜로세움" onClick={() => navigate("/missions")}/>
            <S.TradeImg src={tradeImg} alt="교역소" title="교역소" onClick={() => navigate("/trade")}/>
            <S.BankImg src={bankImg} alt="은행" title="은행" onClick={() => navigate("/bank")}/>
            <S.MineImg src={mineImg} alt="광맥" title="광맥" onClick={() => navigate("/practice")}/>
        </S.Map>
    );
}

export default Map;