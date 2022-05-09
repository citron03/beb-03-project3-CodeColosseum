import styled from 'styled-components';

const S = {};

S.Mission = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    margin: 30px;
    border: 1px solid #e58e26;
    &:hover {
        box-shadow: 1px 1.5px black;
        transform: translate(1px, 0.5px);
        background-color: #f5f5f5;
        cursor: pointer;
    }
`

S.P = styled.p`
    
`

S.H3 = styled.h3`
    
`

export default S;