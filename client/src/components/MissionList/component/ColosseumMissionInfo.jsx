import S from "./ColosseumMissionInfo.styled";
import { parseDateOnlyHour }  from "./../../../utils/date";

const getChallengers = (data) => {
    if(data.length === 0) {
        return "도전 중인 사람이 없습니다.";
    }
    const challengers = data.map(el => el.account.slice(el.account.length - 4));
    if(challengers.length > 10){
        return challengers.slice(challengers.length - 10).join(", ") + `등 ${challengers.length}명이 도전 중...`;
    } else {
        return challengers.join(", ") + " 님이 도전 중...";
    }
}

const ColosseumMissionInfo = ({data}) => {

    return (
        <S.ColosseumMissionInfo>
            <S.P>예상되는 Token 획득량: {data.tokenExpectation}</S.P>
            <S.Player data={getChallengers(data.challengerList)}>도전한 사람들 {`( ${data.challengerList.length} )`}</S.Player>
            <S.P>시간제한 : {parseInt(data.limitSeconds / 60)}분</S.P>
            <S.P>Open Time : {parseDateOnlyHour(data.openTime)}</S.P>
        </S.ColosseumMissionInfo>
    );
}

export default ColosseumMissionInfo;
