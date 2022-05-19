import S from "./Navigator.styled";
import { useNavigate } from "react-router-dom";

const Navigator = () => {
    const navigate = useNavigate();
    return (
        <S.Navigator>
            <S.H2>지금 바로 코드 콜로세움의 서비스를 이용해 보세요!</S.H2>
            <S.NavDiv>
                <S.Div onClick={() => navigate("/missions")}>
                    콜로세움 문제 도전
                </S.Div>
                <S.Div onClick={() => navigate("/practice")}>
                    연습문제 도전
                </S.Div>
                <S.Div onClick={() => navigate("/register")}>
                    문제 제출 하기
                </S.Div>
            </S.NavDiv>
        </S.Navigator>
    );
}

export default Navigator;