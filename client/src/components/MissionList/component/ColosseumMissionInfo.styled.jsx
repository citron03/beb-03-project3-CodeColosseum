import styled from 'styled-components';

const S = {};

S.ColosseumMissionInfo = styled.div`
    border-top: 1px solid var(--font-theme);
`

S.P = styled.p`
    
`

S.Player = styled.p`
    &:hover {
        color: var(--dark-yellow);
        &::after { 
            content: attr(data); 
            text-align: center; 
            font-size: 15px; 
            color: var(--font-theme); 
            background: var(--background-theme-modal); 
            position: absolute; 
            top: 65%; 
            left: 45%; 
            width: 200px; 
            height: fit-content; 
            padding: 15px; 
            border: 1px solid var(--font-theme); 
            overflow: hidden;
            white-space: pre-line;
            z-index: 10; 
        }
    }

`

export default S;