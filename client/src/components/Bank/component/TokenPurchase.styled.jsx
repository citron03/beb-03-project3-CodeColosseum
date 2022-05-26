import styled from 'styled-components';

const S = {};

S.TokenPurchase = styled.div`
    text-align: center;
    font-size: 1.3rem;
    margin: 30px auto;
    padding: 80px 200px;
    border: 2px solid var(--highlight-yellow);
    display: flex;
    flex-direction: column;
    align-items: center;
    width: fit-content;
`

S.BorderDiv = styled.div`
    border: 2px solid var(--warning-light);
    width: fit-content;
    padding: 50px;
`

S.Div = styled.div`
    width: fit-content;
    padding: 20px;
    display: flex;
`


S.Span = styled.span`
    font-size: 1.5rem;
    margin: 10px;
`

S.SpanHighlight = styled.span`
    font-size: 1.5rem;
    padding: 10px;
    border: 1px solid var(--dark-yellow);
`

S.H2 = styled.h2`
    
`

S.P = styled.p`
    margin: 0;
    font-size: 50px;
`

export default S;