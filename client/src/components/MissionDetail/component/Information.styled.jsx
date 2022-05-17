import styled from 'styled-components';

const S = {};

S.Information = styled.div`
    display: flex;
    flex-direction: column;
    margin: 70px;
    padding: 30px;
`

S.P = styled.p`
    font-size: 1.1rem;
    text-decoration: underline;
`

S.Div = styled.div`
    border: 1px solid var(--highlight-yellow);
    width: fit-content;
    padding: 15px;
    margin: 10px;
`

S.TestCasesDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
`

S.H1 = styled.h1`
    border-bottom: 1px solid black;
`

S.H2 = styled.h2`
    
`

S.Pre = styled.pre`
    font-size: 1.3rem;
    white-space: pre-line;
`

export default S;