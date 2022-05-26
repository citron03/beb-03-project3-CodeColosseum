import S from "./DifficultyRating.styled";
import StarScore from "./StarScore";

const DifficultyRating = ({difficulty, handleDifficulty}) => {
    return (
        <S.DifficultyRating>
            <S.H3>문제가 어려웠다면 별을 많이 주세요</S.H3>
            <StarScore title={"difficluty"} rating={difficulty} handler={handleDifficulty}/>
        </S.DifficultyRating>
    );
}

export default DifficultyRating;