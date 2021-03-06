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
            <S.ColosseumDiv>
                <S.ColosseumImg 
                    src={ColosseumImg} alt="콜로세움" title="콜로세움" 
                    onClick={() => handleMap("/")}/>
                <S.H2>콜로세움</S.H2>
            </S.ColosseumDiv>
            <S.TradeDiv>
                <S.TradeImg src={tradeImg} alt="교역소" title="교역소" 
                    onClick={() => handleMap("/trade")}/>
                <S.H2>교역소</S.H2>
            </S.TradeDiv>
            <S.BankDiv>
                <S.BankImg src={bankImg} alt="은행" title="은행" 
                    onClick={() => handleMap("/bank")}/>
                <S.H2>은행</S.H2>
            </S.BankDiv>
            <S.MineDiv>
                <S.MineImg src={mineImg} alt="광맥" title="광맥" 
                    onClick={() => handleMap("/practice")}/>
                <S.H2>광맥</S.H2>
            </S.MineDiv>
        </S.Map>
    );
}

export default Map;