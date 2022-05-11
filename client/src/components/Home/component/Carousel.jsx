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
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        pauseOnHover: true,
        lazyLoad: true
    };
    return (
        <S.Carousel>
            <S.H1>News & Event</S.H1>
            <Slider {...settings}>
                <S.ContentDiv>
                    <S.CarouselText>
                        <S.H2>오늘 N개의 문제가 새로 출제되었습니다.</S.H2>
                    </S.CarouselText>
                    <img src={img1} alt="img1"/>
                </S.ContentDiv>
                <S.ContentDiv>
                    <S.CarouselText>
                        <S.H2>현재 Code Colosseum은 총 N개의 문제를 제공하고 있습니다.</S.H2>
                    </S.CarouselText>
                    <img src={img2} alt="img2"/>
                </S.ContentDiv>
                <S.ContentDiv>
                    <S.CarouselText>
                        <S.H2>오늘 발행된 토큰의 개수는 N개 입니다.</S.H2>
                    </S.CarouselText>
                    <img src={img3} alt="img3"/>
                </S.ContentDiv>
                <S.ContentDiv>
                    <S.CarouselText>
                        <S.H2>Code Colosseum 미션의 평균 정답률은 N.N % 입니다.</S.H2>
                    </S.CarouselText>
                    <img src={img4} alt="img4"/>
                </S.ContentDiv>
            </Slider>
        </S.Carousel>
    );
}

export default Carousel;