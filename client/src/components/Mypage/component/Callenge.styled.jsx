import styled from 'styled-components';

const S = {};

S.Callenge = styled.div`
    border: 1px solid var(--highlight-yellow);
    padding: 15px;
    margin: 15px;
    height: fit-content;
`

S.P = styled.p`
    font-size: 1rem;
`

S.TitleP = styled.p`
    font-size: 1.1rem;
    &:hover {
        color: var(--dark-yellow);
        cursor: pointer;
    }
`

export default S;