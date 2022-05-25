import S from "./Grade.styled";
import { IoMdStarHalf, IoMdStarOutline, IoMdStar } from 'react-icons/io';
import { getStar } from "../../../utils/grade";

const Grade = ({text, score}) => {
    const starScore = getStar(score);
    return (
        <S.Grade>
            <S.Span>{text}: </S.Span>
            {starScore.map((el, idx) => {
               return el === 0 ?  <IoMdStar key={idx}/>
               : el === 1 ? <IoMdStarHalf key={idx}/>
               : <IoMdStarOutline key={idx}/>
            })}
        </S.Grade>
    )
}

export default Grade;