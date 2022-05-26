import S from "./MyMission.styled";
import C from "./../../CommonStyled";
import { parseDate } from "../../../utils/date";
import { useSelector, useDispatch } from "react-redux";
import { showNotification } from "./../../../redux/action";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyMission = ({data}) => {
    const state = useSelector(state => state.signup).account;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handlePractice = async (account, missionId) => {
        const url = "/mission/changetopractice";
        const payload = {
            account,
            missionId
        };
        console.log(payload);
        try {
            const res = await axios.post(url, payload);
            dispatch(showNotification("연습 문제 등록 성공!"));
            console.log("연습 문제 등록 완료", res);
        } catch (err) {
            dispatch(showNotification("연습 문제 변환 중\n오류 발생"));
            console.log("연습 문제 변환 실패", err);
        }  
    }

    const handleNavigate = (id) => {
        // navigate(`/mission/practice/${id}`); // 연습문제
    }
    
    return (
        <S.MyMission>
            <S.TitleP title="이동하기" onClick={() => handleNavigate(data._id)}>제목 : {data?.title}</S.TitleP>
            <S.P>description : {data?.description}</S.P>
            <S.P>만든 날짜 : {parseDate(data?.createdAt)}</S.P>
            <S.ButtonDiv>
                <C.Button onClick={() => handlePractice(state?.account, data?._id)}>연습문제로 만들기</C.Button>
            </S.ButtonDiv>
        </S.MyMission>
    );
}

export default MyMission;