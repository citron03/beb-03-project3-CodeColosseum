import styled from 'styled-components';

const S = {};

S.StarScore = styled.div`
    margin: 15px;
    text-align: center;
`

S.Fieldset = styled.fieldset`
    display: inline-block; 
    border: 0;
    direction: rtl;
`

S.Input = styled.input`
    display: none;
    &:checked ~ label {
        color: var(--highlight-yellow);
    }   
`

S.Label = styled.label`
    font-size: 50px;
    color: var(--font-theme);
    margin: 5px;
    &:hover{
        color: var(--universal)!important;
    }
    &:hover ~ label{
        color: var(--universal);
    }
`

export default S;
