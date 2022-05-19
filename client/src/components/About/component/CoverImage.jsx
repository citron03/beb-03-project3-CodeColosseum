import S from "./CoverImage.styled";
import image from "./../../../assets/Colosseum-68343-_1_.gif";

const CoverImage = () => {
    return (
        <S.CoverImage>
            <S.Image src={image} alt="커버 이미지"/>
        </S.CoverImage>
    );
}

export default CoverImage;