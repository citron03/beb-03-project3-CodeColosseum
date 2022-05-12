import S from "./Scoring.styled";
import C from "../../CommonStyled";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { showNotification } from "./../../../redux/action";
import { useNavigate } from "react-router-dom";

const Scoring = ({grading, id}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    console.log(grading);
    useEffect(() => {
        if(grading.message){
            if(grading?.message === "Grading Fail, Code Error"){
                dispatch(showNotification("코드 에러!"));
            }
            else if(grading?.message === "Grading Complete"){
                dispatch(showNotification("채점 완료!"));
            }
            if(grading?.data?.failCount === 0){
                setMessage("축하합니다!");
            } else {
                setMessage(`아쉽네요!`);
            }
        }
    }, [grading, dispatch])
    
    return (
        <S.Scoring>
            {grading?.message ? 
                <S.Div>
                    <S.H2>{message}</S.H2> 
                    <S.P>
                        {grading?.data?.failCount ? 
                            `${grading?.data?.failCount}개의 테스트를 통과하지 못했습니다.`
                            : "모든 테스트 케이스를 통과하였습니다.\n정답입니다!" }
                    </S.P>
                    {grading?.data?.failCount !== 0 ? null : 
                        <C.Button onClick={() => navigate(`/feedback/${id}`)}>문제 평가하기</C.Button>}
                </S.Div>
                : <S.P>코드를 작성한 뒤, 제출 버튼을 눌러주세요.</S.P>}
        </S.Scoring>
    );
}

export default Scoring;