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

    useEffect(() => {
        console.log("채점 결과: ", grading.data); 
        if(grading.data){
            if(grading.data.isTest){
                // 연습문제 테스트
                let failTestCases = "";
                grading.data.passedCases.forEach((el, idx) => !el ? failTestCases += ` ${idx + 1}번` : null);
                const messageTest = failTestCases.length === 0 ? `공개된 모든 테스트 통과` : `공개된 테스트 중\n${failTestCases}\n실패`;
                dispatch(showNotification(messageTest));
                return;
            }
            if(grading?.data?.reward){
                // 내가 답을 맞춤 (콜로세움 문제)
                dispatch(showNotification(`정답입니다!\n${grading.data.reward}개의 토큰을 획득하였습니다.`));
                setMessage("축하합니다!");
                // navigate(`/feedback/${id}`); 평가 페이지 이동
                return;
            }
            if(grading?.data?.isClosed){
                // 다른 사람이 정답 맞춤 (콜로세움 문제)
                dispatch(showNotification("아쉽네요!\n다른 사람이 먼저 정답을 맞췄습니다."));
                // navigate("/");
                return;
            }
            if(grading.data?.timeSafe === false){
                // 타임 오버
                dispatch(showNotification("아쉽네요!\n주어진 시간을 모두 소모하였습니다."));
                return;            
            }
            if(grading?.data){
                if(grading?.data?.codeError){
                    dispatch(showNotification("코드 에러!"));
                }
                else if(grading?.data?.isPassed || grading?.data?.failCount === 0){
                    dispatch(showNotification("채점 완료!\n 모든 테스트를 통과하셨습니다!\n평가를 남겨주세요 ★"));
                    setMessage("축하합니다!");
                } else {
                    dispatch(showNotification("채점 완료!\n 하지만 아쉽게도 틀렸습니다."));
                    setMessage(`아쉽네요!`);
                }
            }
        }
    }, [grading, dispatch, navigate])
    
    return (
        <S.Scoring>
            {grading?.message ? 
                <S.Div>
                    <S.H2>{message}</S.H2> 
                    <S.P>
                        {grading?.data?.failCount ? 
                            `${grading?.data?.failCount}개의 테스트를 통과하지 못했습니다.`
                            : "모든 테스트 케이스를 통과하였습니다.\n정답입니다!"}
                    </S.P>
                    {grading?.data?.failCount !== 0 || grading.data.isTest ? null : 
                        <C.Button onClick={() => navigate(`/feedback/${id}`)}>문제 평가하기</C.Button>}
                </S.Div>
                : <S.P>코드를 작성한 뒤, 제출 버튼을 눌러주세요.</S.P>}
        </S.Scoring>
    );
}

export default Scoring;