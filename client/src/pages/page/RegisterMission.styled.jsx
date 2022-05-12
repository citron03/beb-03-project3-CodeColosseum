import styled from 'styled-components';

const S = {};

S.RegisterMission = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    position: relative;
    &::after {
        width: 100%;
        height: 100%;
        content: "";
        background-image: ${({bgImg}) => `url(${bgImg})`};
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        opacity: 0.3;
    }
`

S.Section = styled.section`
    display: flex;
    width: 100%;
    justify-content: center;
`

S.Input = styled.input`
    width: 40%;
    margin: 15px;
    font-size: 30px;
`

S.Label = styled.label`
    font-size: 2.3rem;
    padding: 10px;
`

S.Title = styled.div`
    width: 100%;
`

S.Div = styled.div`
    width: 100%;
    display: block;
`

export default S;