import styled from 'styled-components';

const S = {};

S.Header = styled.div`
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
    width: 250px;
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

S.P = styled.p`
    
`

S.AccountDiv = styled.div`
    margin: 30px;
    text-align: center;
    display: flex;
`

export default S;