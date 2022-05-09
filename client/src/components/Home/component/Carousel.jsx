import S from "./Carousel.styled";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {img1, img2, img3, img4} from './../../../assets';

const Carousel = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <S.Carousel>
            <S.H2>Images</S.H2>
            <Slider {...settings}>
                <S.ContentDiv>
                    <S.H3>맑은 날의 콜로세움</S.H3>
                    <img src={img1} alt="img1"/>
                </S.ContentDiv>
                <S.ContentDiv>
                    <S.H3>그냥 콜로세움</S.H3>
                    <img src={img2} alt="img2"/>
                </S.ContentDiv>
                <S.ContentDiv>
                    <S.H3>땅콩 마크</S.H3>
                    <img src={img3} alt="img3"/>
                </S.ContentDiv>
                <S.ContentDiv>
                    <S.H3>땅콩 그림</S.H3>
                    <img src={img4} alt="img4"/>
                </S.ContentDiv>
            </Slider>
        </S.Carousel>
    );
}

export default Carousel;