import S from "./MypageNavigation.styled";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const focusObj = {
    "/mypage": 1,
    "/mypage/solved-missions": 2,
    "/mypage/my-missions": 3,
}

const MypageNavigation = () => {
    const navigate = useNavigate();
    const [focus, setFocus] = useState(1);

    const handleTaps = (url) => {
        setFocus(focusObj[url]);
        navigate(url);
    }

    return (
        <S.MypageNavigation>
            <S.Div onClick={() => handleTaps("/mypage")} focus={focus === 1}>계정 정보</S.Div>
            <S.Div onClick={() => handleTaps("/mypage/solved-missions")} focus={focus === 2}>내가 푼 미션들</S.Div>
            <S.Div onClick={() => handleTaps("/mypage/my-missions")} focus={focus === 3}>내가 출제한 미션들</S.Div>
        </S.MypageNavigation>
    );
}

export default MypageNavigation;