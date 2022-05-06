import styled from 'styled-components';

const S = {};

S.Header = styled.div`
    border-bottom: 1px solid black;
    background-color: white;
    display: flex;
    justify-content: space-between;
`

S.Image = styled.img`
    width: 150px;
    height: auto;
    margin: 20px;
    cursor: pointer;
    &:hover {
        transform: translate(-1px, -1px);
    }
    &:active {
        transform: translate(0.5px, 0.5px);
    }
`

S.Div = styled.div`
    width: 250px;
    font-size: 30px;
    text-align: center;
`

S.LinkDiv = styled.div`
    display: flex;
    align-items: center;
    a {
        text-decoration: none;
        color: black;
        &:hover {
            color: #f0b81c;
        }
    }
`

S.Button = styled.button`
    
`

S.P = styled.p`
    
`

S.AccountDiv = styled.div`
    margin: 15px;
`

export default S;