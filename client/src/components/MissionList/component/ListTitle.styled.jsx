import styled, { keyframes } from 'styled-components';

const S = {};

const appear = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`

S.ListTitle = styled.div`
    text-align: center;
`

S.ColosseumH1 = styled.h1`
    &::before {
        content: "🛡️";
        margin-right: 10px;
        animation: ${appear} 2s;
    }
    &::after {
        content: "🪓";
        margin-left: 10px;
        animation: ${appear} 2s;
    }
`

S.H1 = styled.h1`   
    &::before {
        content: "👏";
        margin-right: 10px;
        animation: ${appear} 2s;
    }
`

export default S;