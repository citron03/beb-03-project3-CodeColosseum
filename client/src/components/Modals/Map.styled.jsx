import styled from 'styled-components';
import { BiPencil } from 'react-icons/bi';

const S = {};

S.Map = styled.div`
    display: ${({state}) => state ? "block" : "none"};
    position: fixed;
    top: 10%;
    left: 10%;
    height: 80%;
    width: 80%;
    z-index: 11;
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
        opacity: 0.9;
    }
`

S.Image = styled.img`
    position: absolute;
    height: auto;
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
    right: 40%;
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

S.MypageImg = styled(S.Image)`
    bottom: 28%;
    left: 20%;
    width: 150px;
    &:hover{
        transform: scale(1.1);
    }
`

S.RegisterMission = styled(BiPencil)`
    position: absolute;
    top: 18%;
    left: 31%;
    height: auto;
    width: 150px;
    color: black;
    &:hover{
        cursor: pointer;
        transform: scale(1.1);
    }
`

S.H2 = styled.h2`
    position: absolute;
    top: 10%;
    left: 10%;
    color: black;
    padding: 10px;
    font-size: 2rem;
    border: 3px solid black;
`


export default S;