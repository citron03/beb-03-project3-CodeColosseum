import styled, { keyframes } from 'styled-components';

const S = {};

S.Carousel = styled.div`
    width: 1200px;
    height: auto;
`

const zoomInOut = keyframes`
    from {
        transform: scale(0.9);
    }
    to {
        transform: scale(1);
    }
`

S.ContentDiv = styled.div`
    position: relative;
    img {
        animation: ${zoomInOut} 1s;
        width: 1000px;
        height: 600px;
        margin: auto;
    }
`

S.H1 = styled.h1`
    text-decoration: underline;
`

const appear = keyframes`
    from {
        left: 0%;
    }
    to {
        left: 15%;
    }
`

S.CarouselText = styled.div`
    position: absolute;
    bottom: 10%;
    left: 15%;
    z-index: 5;
    animation: ${appear} 1s;
`

S.H2 = styled.h2`
    color: white;
`

export default S;
