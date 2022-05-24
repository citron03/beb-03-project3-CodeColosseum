import S from "./PracticeMissionInfo.styled";

const PracticeMissionInfo = ({data}) => {
    return (
        <S.PracticeMissionInfo>
            <S.P>{`난이도: ${data.difficulty}`}</S.P>
            <S.P>{`문제 평점: ${data.quality}`}</S.P>
            <S.P>{`이 문제는 ${data.participatedNum}번 평가 되었습니다.`}</S.P>
        </S.PracticeMissionInfo>
    );
}

export default PracticeMissionInfo;