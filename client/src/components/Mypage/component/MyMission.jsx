import S from "./MyMission.styled";
import C from "./../../CommonStyled";
import { parseDate } from "../../../utils/date";
import { useSelector, useDispatch } from "react-redux";
import { showNotification } from "./../../../redux/action";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getHours } from "../../../utils/date";

const MyMission = ({data}) => {
    const state = useSelector(state => state.signup).account;
    const [onPracticeBtn, setOnPracticeBtn] = useState(data?.state === 2);
    const [onRetakeBtn, setOnRetakeBtn] = useState(data?.state === 0);
    const [openTime, setOpenTime] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const openTimes = getHours();

    const handlePractice = async (account, missionId) => {
        const url = "/mission/changetopractice";
        const payload = {
            account,
            missionId
        };
        console.log(payload);
        try {
            const res = await axios.post(url, payload);
            setOnPracticeBtn(false);
            dispatch(showNotification("연습 문제 등록 성공!"));
            console.log("연습 문제 등록 완료", res);
        } catch (err) {
            dispatch(showNotification("연습 문제 변환 중\n오류 발생"));
            console.log("연습 문제 변환 실패", err);
        }  
    }

    const handleRetake = async (missionId, openTime) => {
        try {
            const url = "/mission/recreate";
            const payload = {
                missionId,
                openTime
            };
            console.log(missionId, openTime);
            const res = await axios.post(url, payload);
            console.log(res);
            setOnRetakeBtn(false);
            dispatch(showNotification("재출제 완료"));
        } catch {
            dispatch(showNotification("재출제 중\n오류 발생"));
        }
    }

    const handleNavigate = (id) => {
        if(data.state === 4){
            navigate(`/mission/practice/${id}`); 
        } else {
            dispatch(showNotification("연습 문제가 아닙니다."));
        }
    }
    
    return (
        <S.MyMission>
            <S.TitleP title="이동하기" onClick={() => handleNavigate(data._id)}>제목 : {data?.title}</S.TitleP>
            <S.P>description : {data?.description}</S.P>
            <S.P>만든 날짜 : {parseDate(data?.createdAt)}</S.P>
            <S.ButtonDiv>
            {onPracticeBtn ? 
                    <C.Button onClick={() => handlePractice(state?.account, data?._id)}>연습문제로 만들기</C.Button>
                    : null}
            {onRetakeBtn ? 
                <>
                    <C.Button onClick={() => handleRetake(data?._id, openTime)}>콜로세움 재출제</C.Button>
                    <C.Select name="open_time" onChange={(e) => setOpenTime(e.target.value)}>
                        {openTimes.map((el, idx) => {
                            return (<C.Option value={el} key={idx}>정각 {el} 시</C.Option>);
                        })}
                    </C.Select>
                </> : null}            
            </S.ButtonDiv>
        </S.MyMission>
    );
}

export default MyMission;