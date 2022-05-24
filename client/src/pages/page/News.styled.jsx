import styled from 'styled-components';

const S = {};

S.News = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

S.HeadDiv = styled.div`
    width: 100%;
    height: 820px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

S.Div = styled.div`
    font-size: 2.2rem;
    margin: 10px 30px 80px 30px;
    &:hover {
        color: var(--warning-light);
        cursor: pointer;
    }
`

export default S;