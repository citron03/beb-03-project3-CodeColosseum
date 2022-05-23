import styled from 'styled-components';

const S = {};

S.MapNav = styled.div`
    position: fixed;
    bottom: 1%;
    right: 1%;
    width: 150px;
    height: 150px;
    font-size: 70px;
    text-align: center;
    line-height: 2;
    &:hover {
        transform: scale(1.1);
        cursor: pointer;
    }
`

export default S;