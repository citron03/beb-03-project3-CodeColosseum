import S from "./ColosseumMissionInfo.styled";

const getChallengers = (data) => {
    if(data.length > 10){
        return data.slice(data.length - 10).join(", ") + `외 ${data.length - 10}명이 도전 중...`;
    } else {
        return data.join(", ") + "가 도전 중...";
    }
}

const ColosseumMissionInfo = ({data}) => {
    return (
        <S.ColosseumMissionInfo>
            <S.P>예상되는 토큰 획득량: {data.tokenExpectation}</S.P>
            <S.Player data={getChallengers(data.challengerList)}>이 문제를 푸는 사람들</S.Player>
            <S.P>시간제한 : 20분</S.P>
        </S.ColosseumMissionInfo>
    );
}

export default ColosseumMissionInfo;
