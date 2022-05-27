import S from "./Timer.styled";
import C from "../../CommonStyled";
import { getMinutes, getHours } from "../../../utils/date";

const Timer = ({handleTime, handleOpenTime}) => {
    const times = getMinutes();
    const openTimes = getHours();
    return (
        <S.Timer>
            <S.P>문제 해결에 주어질 시간을 설정하세요 (최소 20분, 최대 60분)</S.P>
            <C.Select name="timer" onChange={(e) => handleTime(e)}>
                {times.map((el, idx) => {
                    return (<C.Option value={el} key={idx}>{el} 분</C.Option>);
                })}
            </C.Select>
            <S.P>문제가 열리는 시간을 정해주세요 (문제는 제출시간을 기준으로 다음 날 열립니다)</S.P>
            <C.Select name="open_time" onChange={(e) => handleOpenTime(e)}>
                {openTimes.map((el, idx) => {
                    return (<C.Option value={el} key={idx}>정각 {el} 시</C.Option>);
                })}
            </C.Select>
        </S.Timer>
    );
}

export default Timer;