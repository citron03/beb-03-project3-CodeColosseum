import styled from 'styled-components';

const S = {};

S.Introduce = styled.div`

`

S.H1 = styled.h1`
    line-height: 5;
    font-size: 70px;
    text-align: center;
    margin-bottom: 20px;
`
S.TextDiv = styled.div`
    display: flex;
    flex-direction: column;
    margin: 30px;
    padding: 20px;
    border: 3px solid var(--highlight-yellow);
    text-align: center;
`

S.Div = styled.div`
    display: flex;
    justify-content: center;
`

S.H2 = styled.h2`
    font-size: 30px;
    border-bottom: 1px solid var(--dark-yellow);
`

S.P = styled.p`
    font-size: 22px;
`

export default S;