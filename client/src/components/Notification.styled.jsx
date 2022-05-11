import styled from 'styled-components';

const S = {};

S.Notification = styled.div`
    display: ${({isVisible}) => isVisible ? "block" : "none"};
    background-color: #fdfcf4;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 350px;
    height: 200px;
    border: 1px solid black;
    z-index: 4;
    /* line-height: 150px; */
    text-align: center;
    font-size: 24px;
    &:hover {
        background-color: #eee8ce;
    }
    -ms-user-select: none; 
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    color: black;
`

S.P = styled.p`
    padding: 30px 15px 0 15px;
`

S.Title = styled.p`
    background-color: black;
    margin-top: 0;
    color: white;
    width: 100%;
`

export default S;