import styled from 'styled-components';

const S = {};

S.ColosseumMissionInfo = styled.div`
    border-top: 1px solid white;
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
            color: white; 
            background: #252424; 
            position: absolute; 
            top: 80%; 
            left: 50%; 
            width: 200px; 
            height: fit-content; 
            padding: 15px; 
            border: 1px solid white; 
            overflow: hidden;
            white-space: pre-line;
            z-index: 10; 
        }
    }

`

export default S;