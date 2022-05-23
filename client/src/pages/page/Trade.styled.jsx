import styled from 'styled-components';
import { FaRegHandshake } from 'react-icons/fa';

const S = {};

S.Trade = styled.div`
    margin: 30px;
    font-size: 2.5rem;
    text-align: center;
`

S.H1 = styled.h1`
    text-align: center;
    font-size: 3rem;
`

S.Handshake = styled(FaRegHandshake)`
    margin-right: 10px;
`

export default S;