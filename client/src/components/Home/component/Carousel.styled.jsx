import styled from 'styled-components';

const S = {};

S.Carousel = styled.div`
    width: 800px;
    height: auto;
`

S.ContentDiv = styled.div`
    position: relative;
    img {
        width: 700px;
        height: auto;
    }
`

S.H2 = styled.h2`
    text-decoration: underline;
`

S.H3 = styled.h3`
    position: absolute;
    top: 10%;
    right: 20%;
`

export default S;
