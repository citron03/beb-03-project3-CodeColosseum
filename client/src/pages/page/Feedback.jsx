import S from "./Feedback.styled";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "../../components/Login";

const Feedback = () => {
    const id = useParams().id;
    const state = useSelector(state => state.account);
    console.log(id, state);

    return (
            <S.Feedback>
                {state.account ? "문제 제출 후 피드백 화면" : <Login/>}
            </S.Feedback>
        );
}

export default Feedback;