import styled from 'styled-components';

const S = {};

S.Navigator = styled.div`
    margin: 80px 0px;
`

S.H2 = styled.h2`
    text-align: center;
    font-size: 50px;
`

S.NavDiv = styled.div`
    display: flex;
    justify-content: center;
    font-size: 30px;
`

S.Div = styled.div`
    margin: 20px;
    border: 2px solid var(--warning-light);
    padding: 50px;
    &:hover {
        border: 1px solid var(--warning);
        transform: scale(1.05);
        cursor: pointer;
    }
`

export default S;