import styled from 'styled-components';

const S = {};

S.MissionDetail = styled.div`
    display: flex;
    flex-direction: column;
`

S.EditorDiv = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-evenly;
`

S.FunctionDiv = styled.div`
    width: 50%;
`

S.SupportDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

S.Button = styled.button`
    border-radius: 150px;
    background-color: white;
    padding: 20px;
    width: 120px;
    font-size: 20px;
`

S.P = styled.p`

`

export default S;