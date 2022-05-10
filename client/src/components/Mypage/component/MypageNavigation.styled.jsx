import styled from 'styled-components';

const S = {};

S.MypageNavigation = styled.div`
    width: 70%;
    height: 70px;
    display: flex;
    justify-content: center;
    margin: 20px;
    border: 2px solid black;
`

S.Div = styled.div`
    border: 1px solid black;
    flex: 1 1 0;
    text-align: center;
    padding: 15px;
    cursor: pointer;
    &:hover {
        background-color: #f2e6d7;
    }
    background-color: ${({focus}) => focus ? "#fadd92" : "white"};
    font-size: ${({focus}) => focus ? "1.4rem" : "1.3rem"};

`

export default S;
