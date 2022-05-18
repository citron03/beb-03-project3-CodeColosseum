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
        // console.log(parseInt((end.getTime() - now.getTime()) / (1000*60)) + "분");
        const left = parseInt((end.getTime() - now.getTime()) / (1000));
        setSeconds(left);
    }, [endTime]);

    useEffect(() => {
        const countdown = setInterval(() => {
            if (seconds > 0) {
              setSeconds(prev => prev - 1);
            } else {
                navigator("/");
                dispatch(showNotification("Time Over!"));
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