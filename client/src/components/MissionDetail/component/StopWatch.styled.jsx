import styled from 'styled-components';

const S = {};

S.StopWatch = styled.div`
    border: 1px solid var(--warning-light);
    border-radius: 50px;
    padding: 10px 20px;
    margin: 20px 10px;
`

S.H2 = styled.h2`
    color: ${({isStop}) => isStop ? "var(--warning-light)" : "var(--font-theme)"};    
`

S.P = styled.p`

`

export default S;