import styled from 'styled-components';

const S = {};

S.Output = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

S.Select = styled.select`
    margin: 10px;
    height: 40px;
`

S.Option = styled.option`

`

S.TextArea = styled.textarea`
    margin: 15px;
    font-size: 1.3rem;
    min-width: 100px;
    max-width: 250px;
    min-height: 50px;
    max-height: 100px;
`

S.Label = styled.label`

`

S.P = styled.p`
    font-size: 1.3rem;
`

export default S;

