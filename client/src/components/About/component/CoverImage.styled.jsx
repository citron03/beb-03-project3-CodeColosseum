import styled from 'styled-components';

const S = {};

S.CoverImage = styled.div`
    position: relative;
`

S.Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`

S.ScollDiv = styled.div`
    position: absolute;
    bottom: 10%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 80px;
    font-weight: bolder;
    width: fit-content;
    &:hover {
        cursor: pointer;
        color: var(--universal);
    }
    color: white;
`

export default S;