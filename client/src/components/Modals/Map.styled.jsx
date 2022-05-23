import styled from 'styled-components';

const S = {};

S.Map = styled.div`
    display: ${({state}) => state ? "block" : "none"};
    position: fixed;
    top: 10%;
    left: 10%;
    height: 80%;
    width: 80%;
    z-index: 100;
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
        opacity: 0.8;
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
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    &:hover{
        transform: translate(-50%, -50%) scale(1.1);
    }
`

S.TradeImg = styled(S.Image)`
    top: 35%;
    right: 20%;
    width: 150px;
    &:hover{
        transform: scale(1.1);
    }
`

S.BankImg = styled(S.Image)`
    top: 15%;
    right: 45%;
    width: 100px;
    &:hover{
        transform: scale(1.1);
    }
`

S.MineImg = styled(S.Image)`
    bottom: 20%;
    right: 10%;
    width: 150px;
    &:hover{
        transform: scale(1.1);
    }
`

export default S;