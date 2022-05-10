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
        text-shadow: 0 0 0 #F79F1F;
    }   
`

S.Label = styled.label`
    font-size: 2.5em;
    color: transparent;
    text-shadow: 0 0 0 #f0f0f0;
    margin: 5px;
    &:hover{
        text-shadow: 0 0 0 #F79F1F;
    }
    &:hover ~ label{
        text-shadow: 0 0 0 #F79F1F;
    }
`

export default S;
