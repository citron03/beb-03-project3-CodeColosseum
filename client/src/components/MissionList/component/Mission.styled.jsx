import styled from 'styled-components';

const S = {};

S.Mission = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    margin: 30px;
    border: 1px solid var(--highlight-yellow);
    &:hover {
    border: 1px solid gray;
        box-shadow: 1px 1.5px var(--highlight-yellow);
        transform: translate(1px, 0.5px);
        background-color: #f5f5f515;
        cursor: pointer;
    }
`

S.P = styled.p`
    
`

S.H3 = styled.h3`
    
`

export default S;