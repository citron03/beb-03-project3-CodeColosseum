import S from "./ColosseumMissionInfo.styled";

const ColosseumMissionInfo = () => {
    return (
        <S.ColosseumMissionInfo>
            <S.P>보상가능한 토큰(최소)</S.P>
            <S.Player data="누구 누구 누구 누구 누구 누구 누가 푸는 중...">이 문제를 푸는 사람들</S.Player>
            <S.P>시간제한 : 20분</S.P>
        </S.ColosseumMissionInfo>
    );
}

export default ColosseumMissionInfo;
