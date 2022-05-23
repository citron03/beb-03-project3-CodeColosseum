import styled from 'styled-components';

const S = {};

S.BankNav = styled.div`
    width: fit-content;
    display: flex;
    flex-direction: row;
    justify-content: center;
    border: 2px solid var(--warning-light);
    border-radius: 50px;
    margin: auto;
`

S.ComponentDiv = styled.div`
    margin: 10px 50px;
    text-align: center;
    font-size: 2rem;
    color: ${({selected}) => selected ? "var(--universal)" : "var(--font-theme)"};
    font-weight: ${({selected}) => selected ? "bolder" : "normal"};
`

export default S;