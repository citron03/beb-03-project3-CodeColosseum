import styled from 'styled-components';

const S = {};

S.Footer = styled.div`
    position: relative;
    bottom: 0%;
    width: 100%;
    height: 60px;
    background-color: #2c2a2a;
    color: white;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    border-top: 1px solid black;
    margin-top: 40px;
`

S.Div = styled.div`
    
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