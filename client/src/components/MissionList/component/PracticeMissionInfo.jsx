import S from "./PracticeMissionInfo.styled";
import Grade from "./Grade";

const PracticeMissionInfo = ({data, score}) => {
    return (
        <S.PracticeMissionInfo>
            <Grade text="난이도" score={data.difficulty}/>
            <Grade text="문제 평점" score={data.quality}/>
            <S.P>{`이 문제는 ${data.participatedNum}번 평가 되었습니다.`}</S.P>
        </S.PracticeMissionInfo>
    );
}

export default PracticeMissionInfo;