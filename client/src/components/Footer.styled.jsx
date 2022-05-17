import styled from 'styled-components';

const S = {};

S.Footer = styled.div`
    position: relative;
    bottom: 0%;
    width: 100%;
    height: fit-content;
    background-color: #2c2a2a;
    color: white;
    display: flex;
    flex-direction: column;
    border-top: 1px solid black;
    padding-top: 15px;
`

S.Div = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    border-bottom: 1px solid var(--dark-yellow);
`

S.P = styled.p`
    text-align: center;
    margin: 12px;
`

S.A = styled.a`
    text-decoration: none;
    color: white;
    &:hover {
        color: #f0b81c;
        cursor: pointer;
    }
`

export default S;