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
    border-radius: 100px;
    border: 10px solid black;
`

const rotate = keyframes`
    from{

    }
    to{
        transform: rotate(360deg);
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