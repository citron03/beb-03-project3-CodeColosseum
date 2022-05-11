import styled from 'styled-components';

const S = {};

S.Carousel = styled.div`
    width: 1200px;
    height: auto;
`

S.ContentDiv = styled.div`
    position: relative;
    img {
        width: 1000px;
        height: 600px;
        margin: auto;
    }
`

S.H1 = styled.h1`
    text-decoration: underline;
    color: white;
`

S.CarouselText = styled.div`
    position: absolute;
    bottom: 10%;
    left: 15%;
    z-index: 5;
`

S.H2 = styled.h2`
    color: white;
`

export default S;
