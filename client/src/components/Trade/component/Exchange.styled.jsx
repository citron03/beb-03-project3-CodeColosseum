import styled from 'styled-components';

const S = {};

S.Exchange = styled.div`
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

S.H2 = styled.h2`
    text-align: center;
`

S.BorderDiv = styled.div`
    border: 2px solid var(--warning-light);
    width: fit-content;
    padding: 50px;
    margin: 50px;
`

S.RowDiv = styled.div`
    display: flex;
    align-items: center;
`

S.ColDiv = styled.div`
    display: flex;
    flex-direction: column;
`

S.Div = styled.div`
    width: fit-content;
    padding: 50px;
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

S.P = styled.p`
    text-align: center;
    padding: 10px;
    border: 2px solid var(--warning);
`

S.SmallP = styled.p`
    font-size: 1.1rem;
`

S.ArrowSpan = styled.span`
    font-size: 4rem;
    margin: 0;
`

export default S;