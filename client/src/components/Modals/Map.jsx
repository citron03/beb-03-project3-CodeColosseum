import S from "./Map.styled";
import { ColosseumImg, parchment, tradeImg, bankImg, mineImg } from "../../assets/map";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { mapPopUpControll } from "../../redux/reducer/mapSlice";

const Map = () => {
    const navigate = useNavigate();
    const state = useSelector(state => state.map).isPopUp;
    const dispatch = useDispatch();
    
    const handleMap = (url) => {
        navigate(url);
        dispatch(mapPopUpControll());
    }

    return (
        <S.Map mapImg={parchment} state={state}>
            <S.ColosseumImg src={ColosseumImg} alt="콜로세움" title="콜로세움" onClick={() => handleMap("/missions")}/>
            <S.TradeImg src={tradeImg} alt="교역소" title="교역소" onClick={() => handleMap("/trade")}/>
            <S.BankImg src={bankImg} alt="은행" title="은행" onClick={() => handleMap("/bank")}/>
            <S.MineImg src={mineImg} alt="광맥" title="광맥" onClick={() => handleMap("/practice")}/>
        </S.Map>
    );
}

export default Map;