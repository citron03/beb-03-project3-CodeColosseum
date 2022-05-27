import styled from 'styled-components';

const S = {};

S.UnOpened = styled.div`
    display: flex;
    flex-direction: column;
    border: 2px solid var(--highlight-yellow);
    width: fit-content;
    padding: 30px;
    margin: 50px auto;
`

S.P = styled.p`
    text-align: center;
    font-size: 2rem;
`

export default S;