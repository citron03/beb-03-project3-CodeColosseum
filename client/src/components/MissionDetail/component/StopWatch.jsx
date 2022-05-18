import S from "./StopWatch.styled";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux";
import { showNotification } from "./../../../redux/action";

const StopWatch = ({endTime}) => {

    const [seconds, setSeconds] = useState(3600);
    const navigator = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const now = new Date();
        const end = new Date(endTime);
        const left = parseInt((end.getTime() - now.getTime()) / (1000));
        if(left < 0) {
            dispatch(showNotification("이미 도전에 실패한 문제입니다."));
            navigator("/");
        } else {
            setSeconds(left);
        }
    }, [endTime, dispatch, navigator]);

    useEffect(() => {
        const countdown = setInterval(() => {
            if (seconds > 0) {
              setSeconds(prev => prev - 1);
            } else {
                dispatch(showNotification("Time Over!"));
                navigator("/");
                // 타임 오버 post?
            }
          }, 1000);
          return () => clearInterval(countdown);
    }, [seconds, navigator, dispatch])

    return (
        <S.StopWatch>
            {seconds ? 
            <>
                <S.H2>Time remaining...</S.H2>
                <S.P>{`${parseInt(seconds / 60)}분 ${seconds % 60}초`}</S.P>
            </> : null}
        </S.StopWatch>
    );
}

export default StopWatch;