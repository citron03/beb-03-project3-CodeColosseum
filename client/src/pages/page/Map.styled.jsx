import styled from 'styled-components';

const S = {};

S.Map = styled.div`
    position: relative;
    height: 1380px;
    &::after {
        width: 100%;
        height: 100%;
        content: "";
        background-image: ${({mapImg}) => `url(${mapImg})`};
        background-size: 100%;
        background-repeat: no-repeat;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        opacity: 0.2;
    }
`

S.Image = styled.img`
    position: absolute;
    height: auto;
    border-radius: 100px;
    &:hover{
        cursor: pointer;
    }
`

S.ColosseumImg = styled(S.Image)`
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    &:hover{
        transform: translate(-50%, -50%) scale(1.1);
    }
`

S.TradeImg = styled(S.Image)`
    top: 35%;
    right: 20%;
    width: 250px;
    &:hover{
        transform: scale(1.1);
    }
`

S.BankImg = styled(S.Image)`
    top: 15%;
    right: 45%;
    width: 200px;
    &:hover{
        transform: scale(1.1);
    }
`

S.MineImg = styled(S.Image)`
    bottom: 15%;
    right: 5%;
    width: 250px;
    &:hover{
        transform: scale(1.1);
    }
`

export default S;