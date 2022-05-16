import styled from 'styled-components';

const S = {};

S.MissionDetail = styled.div`
    display: flex;
    flex-direction: column;
`

S.EditorDiv = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-evenly;
`

S.FunctionDiv = styled.div`
    width: 50%;
`

S.SupportDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

S.P = styled.p`
    font-size: 1.1rem;
`

S.ArgDiv = styled.div`
    padding: 15px;
    max-width: 500px;
    border: 1px solid var(--dark-yellow);
    white-space: pre-line;
`

export default S;