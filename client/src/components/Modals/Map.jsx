import S from "./Map.styled";
import { ColosseumImg, parchment, tradeImg, bankImg, mineImg, mypageImg } from "../../assets/map";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { mapPopUpControll } from "../../redux/reducer/mapSlice";

const Map = () => {
    const navigate = useNavigate();
    const state = useSelector(state => state.map).isPopUp;
    const dispatch = useDispatch();
    const [mapText, setMapText] = useState("Code Colosseum");
    
    const handleMap = (url) => {
        navigate(url);
        dispatch(mapPopUpControll());
    }

    return (
        <S.Map mapImg={parchment} state={state}>
            <S.H2>{mapText}</S.H2>
            <S.ColosseumImg 
                src={ColosseumImg} alt="콜로세움" title="콜로세움" 
                onClick={() => handleMap("/missions")} 
                onMouseOver={() => setMapText("콜로세움")}
                onMouseOut={() => setMapText("Code Colosseum")}/>
            <S.TradeImg src={tradeImg} alt="교역소" title="교역소" 
                onClick={() => handleMap("/trade")}
                onMouseOver={() => setMapText("교역소")}
                onMouseOut={() => setMapText("Code Colosseum")}/>
            <S.BankImg src={bankImg} alt="은행" title="은행" 
                onClick={() => handleMap("/bank")}
                onMouseOver={() => setMapText("은행")}
                onMouseOut={() => setMapText("Code Colosseum")}/>
            <S.MineImg src={mineImg} alt="광맥" title="광맥" 
                onClick={() => handleMap("/practice")}
                onMouseOver={() => setMapText("광맥")}
                onMouseOut={() => setMapText("Code Colosseum")}/>
            <S.MypageImg src={mypageImg} alt="마이 페이지" title="마이 페이지" 
                onClick={() => handleMap("/mypage")}
                onMouseOver={() => setMapText("마이 페이지")}
                onMouseOut={() => setMapText("Code Colosseum")}/>
            <S.RegisterMission title="콜로세움 출제" 
                onClick={() => handleMap("/register")}
                onMouseOver={() => setMapText("콜로세움 출제")}
                onMouseOut={() => setMapText("Code Colosseum")}/>
        </S.Map>
    );
}

export default Map;