import S from "./Feedback.styled";
import C from "./../../components/CommonStyled";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "../../components/Login";
import { DifficultyRating, MissionRating, Review } from "./../../components/Feedback";
import { useRating } from "../../utils/feedback";
import {showNotification} from "./../../redux/action";
import { useDispatch } from "react-redux";
import { useCheckLogin } from "../../utils/login";
import { useEffect } from "react";

const Feedback = () => {
    const id = useParams().id;
    const dispatch = useDispatch();
    const state = useSelector(state => state.signup).account;
    const [review, difficulty, missionRating, handleReview, handleDifficulty, handleMissionRating] = useRating();
    
    useCheckLogin();

    useEffect(() => {
        console.log(state);
    }, [state])

    const submitFeedback = () => {
        if(difficulty === 0 || missionRating === 0 || review.length === 0){
            dispatch(showNotification("평가를 완료해 주세요!"));
            return;
        }
        console.log(state.account, id, review, difficulty, missionRating);
        dispatch(showNotification("기능이 아직 구현되지 않았습니다."));
    }
    
    return (
            <S.Feedback>
                {state?.account ? 
                    <S.Div>
                        <Review review={review} handleReview={handleReview}/>
                        <DifficultyRating difficulty={difficulty} handleDifficulty={handleDifficulty}/>
                        <MissionRating missionRating={missionRating} handleMissionRating={handleMissionRating}/>
                        <C.Button onClick={submitFeedback}>평가 등록</C.Button>
                    </S.Div> 
                    : <Login/>}
            </S.Feedback>
        );
}

export default Feedback;