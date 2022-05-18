import S from "./StopWatch.styled";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux";
import { showNotification } from "./../../../redux/action";

const StopWatch = ({endTime}) => {

    const [seconds, setSeconds] = useState(3600);
    const [stopWatchText, setStopWatchText] = useState("Time remaining...");
    const navigator = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const now = new Date();
        const end = new Date(endTime);
        const left = parseInt((end.getTime() - now.getTime()) / (1000));
        if(left < 0) {
            console.log(left);
            dispatch(showNotification("이미 도전에 실패한 문제입니다."));
            setStopWatchText("Time Over!");
            setSeconds(0);
            // navigator("/");
        } else {
            setSeconds(left);
        }
    }, [endTime, dispatch, navigator]);

    useEffect(() => {
        const countDown = setInterval(() => {
            if (seconds > 0) {
              setSeconds(prev => prev - 1);
            } else {
                setStopWatchText("Time Over!");
                clearInterval(countDown);
                // dispatch(showNotification("Time Over!"));
                // navigator("/");
            }
          }, 1000);
          return () => clearInterval(countDown);
    }, [seconds, navigator, dispatch])

    return (
        <S.StopWatch>
            <S.H2 isStop={stopWatchText === "Time Over!"}>{stopWatchText}</S.H2>
            {seconds ? 
                <S.P>{`${parseInt(seconds / 60)}분 ${seconds % 60}초`}</S.P> : null}
        </S.StopWatch>
    );
}

export default StopWatch;