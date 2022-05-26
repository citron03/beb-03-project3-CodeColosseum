import styled from 'styled-components';

const S = {};

S.SignUp = styled.div`
    display: ${({isVisible}) => isVisible ? "block" : "none"};
    background-color: var(--background-theme-modal);
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 350px;
    height: 200px;
    color: var(--font-theme);
    border: 1px solid var(--font-theme);
    text-align: center;
    z-index: 5;
`

S.H2 = styled.h2`
    
`

export default S;