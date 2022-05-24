import S from "./Mission.styled";
import { useNavigate } from 'react-router-dom';
import ColosseumMissionInfo from "./ColosseumMissionInfo";
import { useSelector, useDispatch } from "react-redux"
import { showNotification } from "./../../../redux/action";
import { useCheckLogin } from "./../../../utils/login";

const Mission = ({data, isColosseum}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const url = isColosseum ? `/mission/colosseum/${data.missionId}` : `/mission/practice/${data.missionId}`;
    useCheckLogin(); // 로그인 먼저 확인
    const state = useSelector(state => state.signup).account;

    const handleEnter = async () => {
        if(data.creator !== state.nickName || !isColosseum){
            navigate(url);
        } else {
            dispatch(showNotification("당신이 출제한\n 콜로세움 문제입니다."));
            // navigate(url);
        }
    }

    return (
        <S.Mission onClick={handleEnter}>
            <S.H3>{data.title}</S.H3>
            {/* <S.P>평점 : ⚔️ ⚔️ ⚔️ ⚔️ ⚔️</S.P> */}
            <S.P>출제자 : {data.creator}</S.P>
            {isColosseum ? <ColosseumMissionInfo data={data}/> : null}
        </S.Mission>
    );
}

export default Mission;