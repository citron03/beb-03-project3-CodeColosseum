import S from "./MissionRating.styled";
import StarScore from "./StarScore";

const MissionRating = ({missionRating, handleMissionRating}) => {
    return (
        <S.MissionRating>
            <S.H3>실력 향상에 도움이 되는 좋은 문제였다면, 별을 잔뜩 주세요!</S.H3> 
            <StarScore title={"mission"} rating={missionRating} handler={handleMissionRating}/>
        </S.MissionRating>
    );
}

export default MissionRating;