import styled from 'styled-components';

const S = {};

S.MypageNavigation = styled.div`
    width: 70%;
    height: 70px;
    display: flex;
    justify-content: center;
    margin: 20px;
    border: 2px solid var(--font-theme);
`

S.Div = styled.div`
    border: 1px solid var(--font-theme);
    flex: 1 1 0;
    text-align: center;
    padding: 15px;
    cursor: pointer;
    &:hover {
        background-color: #e58e26;
    }
    background-color: ${({focus}) => focus ? "var(--dark-yellow)" : "var(--background-theme)"};
    font-size: ${({focus}) => focus ? "1.4rem" : "1.3rem"};
    font-weight: 500;

`

export default S;
