import S from "./CoverImage.styled";
import image from "./../../../assets/Colosseum-68343-_1_.gif";
import { BsArrowDownCircle } from 'react-icons/bs';

const CoverImage = ({introduceRef}) => {

    const goToTextTop = () => {
        window.scrollTo({top: introduceRef.current.offsetTop + 100, behavior:'smooth'});
    }

    return (
        <S.CoverImage>
            <S.Image src={image} alt="커버 이미지"/>
            <S.ScollDiv onClick={goToTextTop}>
                <BsArrowDownCircle/>
            </S.ScollDiv>
        </S.CoverImage>
    );
}

export default CoverImage;