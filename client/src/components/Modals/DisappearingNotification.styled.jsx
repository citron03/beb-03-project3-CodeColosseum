import styled, { keyframes } from 'styled-components';

const S = {};

S.DisappearingNotification = styled.div`
    display: ${({isVisible}) => isVisible ? "block" : "none"};
    background-color: #222f3e;
    position: fixed;
    top: 5px;
    right: 5px;
    width: 350px;
    height: 120px;
    border: 1px solid var(--dark-yellow);
    z-index: 4;
    text-align: center;
    font-size: 24px;
    -ms-user-select: none; 
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    user-select: none;
`
const loading = keyframes`
    from {
        width: 100%;
    }
    to {
        width: 0%;
    }
`

S.Div = styled.div`
    width: 100%;
    height: 8px;
    background-color: var(--dark-yellow);
    position: absolute;
    bottom: 0%;
    left: 0%;
    animation: ${loading} 3s;
`

S.Pre = styled.pre`
    padding: auto;
    white-space: pre-line;
`

S.Span = styled.span`
    position: absolute;
    top: 1px;
    right: 5px;
    &:hover {
        color: var(--dark-yellow);
    }
`

export default S;