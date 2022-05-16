import styled from 'styled-components';

const S = {};

S.Description = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 70px;
`

S.TextArea = styled.textarea`
    width: 450px;
    font-size: 20px;
    height: 100px;
    min-width: 350px;
    max-width: 900px;
    min-height: 100px;
    max-height: 300px;
`

S.P = styled.p`
    font-size: 25px;
`

export default S;