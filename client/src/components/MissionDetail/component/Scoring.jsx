import S from "./Scoring.styled";
import C from "../../CommonStyled";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { showNotification } from "./../../../redux/action";
import { useNavigate } from "react-router-dom";

const Scoring = ({grading, id}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(grading.message === "fail"){
            dispatch(showNotification("틀렸습니다!"));
        } else if(grading.message === "complete") {
            dispatch(showNotification("정답입니다! 토큰을 n개 획득하였습니다."));
        }
    }, [grading, dispatch])
    
    return (
        <S.Scoring>
            {grading.message ? 
                <S.Div>
                    <S.H2>{grading.message}</S.H2> 
                    <S.P>
                        {grading?.failCount ? 
                            `${grading.failCount}개의 테스트를 통과하지 못했습니다.`
                            : "모든 테스트 케이스를 통과하였습니다.\n정답입니다!" }
                    </S.P>
                    {grading?.failCount ? null : 
                        <C.Button onClick={() => navigate(`/feedback/${id}`)}>문제 평가하기</C.Button>}
                </S.Div>
                : <S.P>코드를 작성한 뒤, 제출 버튼을 눌러주세요.</S.P>}
        </S.Scoring>
    );
}

export default Scoring;