import styled from 'styled-components';

const S = {};

S.MyMission = styled.div`
    border: 1px solid var(--highlight-yellow);
    text-align: center;
    margin: 10px;
    padding: 10px;
    height: fit-content;
`

S.P = styled.p`
    font-size: 1.1rem;
`

S.TitleP = styled.p`
    font-size: 1.2rem;
    &:hover {
        color: var(--dark-yellow);
        cursor: pointer;
    }
`

S.ButtonDiv = styled.div`
    
`


export default S;