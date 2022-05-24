import styled, { keyframes } from 'styled-components';

const S = {};

S.Loading = styled.div`
    display: ${({isLoading}) => isLoading ? "block" : "none"};
    background-color: var(--dark-yellow);
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 200px;
    height: 200px;
    line-height: 1;
    border-radius: 100px;
    border: 10px solid black;
    z-index: 6;
`

const rotate = keyframes`
    0% {
        transform: rotate(0deg);
    } 
    50% {
        transform: rotate(-30deg);
    }
    100% {
        transform: rotate(20deg);
    }
`

S.Div = styled.div`
    text-align: center;
    color: white;
    margin-top: 70px;
    font-size: 30px;
    animation: ${rotate} 1s;
`

export default S;