import S from "./StarScore.styled"
import {AiFillStar} from 'react-icons/ai';

const StarScore = ({title, rating, handler}) => {
    return (
        <S.StarScore>
            <S.Fieldset onChange={handler} value={rating}>
                <legend>{title}</legend>
                <S.Input type="radio" name={`rating${title}`} value="5" id={`${title}5`}/>
                <S.Label htmlFor={`${title}5`}>
                    <AiFillStar/>
                </S.Label>
                <S.Input type="radio" name={`rating${title}`} value="4" id={`${title}4`}/>
                <S.Label htmlFor={`${title}4`}>
                    <AiFillStar/>                    
                </S.Label>
                <S.Input type="radio" name={`rating${title}`} value="3" id={`${title}3`}/>
                <S.Label htmlFor={`${title}3`}>
                    <AiFillStar/>                    
                </S.Label>
                <S.Input type="radio" name={`rating${title}`} value="2" id={`${title}2`}/>
                <S.Label htmlFor={`${title}2`}>
                    <AiFillStar/>                    
                </S.Label>
                <S.Input type="radio" name={`rating${title}`} value="1" id={`${title}1`}/>
                <S.Label htmlFor={`${title}1`}>
                    <AiFillStar/>                    
                </S.Label>
            </S.Fieldset>
        </S.StarScore>
    );
}

export default StarScore;