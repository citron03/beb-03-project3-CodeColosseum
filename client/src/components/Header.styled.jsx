import styled from 'styled-components';

const S = {};

S.Header = styled.div`
    font-family: "NanumBarunGothic";
    border-bottom: 1px solid black;
    background-color: white;
    display: flex;
    justify-content: space-evenly;
    padding: 30px;
    background-color: var(--background-theme-gray);
    color: var(--font-theme);
    border-bottom: 1px solid var(--dark-yellow);
`

S.Title = styled.div`
    display: flex;
`

S.Span = styled.span`
    font-size: 25px;    
`

S.SpanDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    &:hover {
        color: var(--highlight-yellow);
        cursor: pointer;
    }
`

S.Image = styled.img`
    width: 130px;
    height: auto;
    margin: 20px;
    cursor: pointer;
    &:hover {
        transform: translate(-1px, -1px);
    }
    &:active {
        transform: translate(0.5px, 0.5px);
    }
`

S.Div = styled.div`
    width: fit-content;
    margin: 0 25px;
    font-size: 30px;
    text-align: center;
`

S.LinkDiv = styled.div`
    display: flex;
    align-items: center;
    a {
        text-decoration: none;
    color: var(--font-theme);
        &:hover {
            color: var(--highlight-yellow);
        }
    }
`

S.AccountDiv = styled.div`
    margin: 30px;
    text-align: center;
    display: flex;
`

S.CasementSpan = styled(S.Span)`
    font-size: 35px;
    &:hover{
        cursor: pointer;
        color: var(--highlight-yellow);
    }
`

S.ClosedDiv = styled.div`
    height: 40px;
    text-align: center;
    font-size: 20px;
    background-color: var(--background-theme-gray);
    border-bottom: 1px solid var(--universal);
    line-height: 2;
    &:hover {
        cursor: pointer;
    border-bottom: 2px solid var(--dark-yellow);
    }
`

export default S;