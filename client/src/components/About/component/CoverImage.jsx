import S from "./CoverImage.styled";
import image from "./../../../assets/Colosseum-68343-_1_.gif";

const CoverImage = ({introduceRef}) => {

    const goToTextTop = () => {
        window.scrollTo({top: introduceRef.current.offsetTop + 100, behavior:'smooth'});
    }

    return (
        <S.CoverImage>
            <S.Image src={image} alt="커버 이미지"/>
            <S.ScollDiv onClick={goToTextTop}>☟</S.ScollDiv>
        </S.CoverImage>
    );
}

export default CoverImage;