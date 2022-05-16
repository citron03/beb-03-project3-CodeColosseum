import S from "./Timer.styled";
import C from "../../CommonStyled";

const getTimes = () => {
    const times = [];
    for(let i = 20; i <= 60; i++){
        times.push(i);
    }
    return times;
}

const Timer = ({handleTime}) => {
    const times = getTimes();
    return (
        <S.Timer>
            <S.P>문제 해결에 주어질 시간을 설정하세요 (최소 20분, 최대 60분)</S.P>
            <C.Select name="timer" onChange={(e) => handleTime(e)}>
                {times.map((el, idx) => {
                    return (<C.Option value={el} key={idx}>{el} 분</C.Option>);
                })}
            </C.Select>
        </S.Timer>
    );
}

export default Timer;