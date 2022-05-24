import styled from 'styled-components';
import { BiPencil } from 'react-icons/bi';

const S = {};

S.Map = styled.div`
    display: ${({state}) => state ? "block" : "none"};
    position: fixed;
    top: 10%;
    left: 10%;
    height: 760px;
    width: 1480px;
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
    height: auto;
    &:hover{
        cursor: pointer;
    }
`

S.ColosseumDiv = styled.div`
    position: absolute;
    top: 40%;
    left: 40%;
`

S.ColosseumImg = styled(S.Image)`
    /* transform: translate(-50%, -50%); */
    width: 300px;
    &:hover{
        /* transform: translate(-50%, -50%) scale(1.1); */
        transform: scale(1.1);
    }
`

S.TradeDiv = styled.div`
    position: absolute;
    top: 35%;
    right: 20%;
`

S.TradeImg = styled(S.Image)`
    width: 150px;
    &:hover{
        transform: scale(1.1);
    }
`

S.BankDiv = styled.div`
    position: absolute;
    top: 15%;
    right: 40%;
`

S.BankImg = styled(S.Image)`
    width: 100px;
    &:hover{
        transform: scale(1.1);
    }
`

S.MineDiv = styled.div`
    position: absolute;
    bottom: 20%;
    right: 10%;
`

S.MineImg = styled(S.Image)`
    width: 150px;
    &:hover{
        transform: scale(1.1);
    }
`

S.MypageDiv = styled.div`
    position: absolute;
    bottom: 28%;
    left: 18%;
`

S.MypageImg = styled(S.Image)`
    width: 150px;
    &:hover{
        transform: scale(1.1);
    }
`

S.RegisterMissionDiv = styled.div`
    position: absolute;
    top: 18%;
    left: 28%;
`

S.RegisterMission = styled(BiPencil)`
    height: auto;
    width: 150px;
    color: black;
    &:hover{
        cursor: pointer;
        transform: scale(1.1);
    }
`

S.H2 = styled.h2`
    position: relative;
    color: black;
    font-size: 2rem;
    text-align: center;
    margin: 0;
`


export default S;