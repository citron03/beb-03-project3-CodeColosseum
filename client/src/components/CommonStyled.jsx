import styled from 'styled-components';

const C = {}; // 공통적으로 반복되어 쓰이는 스타일 컴포넌트

C.Button = styled.button`
    background-color: black;
    color: white;
    padding: 10px;
    margin: 15px;
    border-radius: 5px;
    font-size: 1.1rem;
    border-color: var(--highlight-yellow);
`

C.Select = styled.select`
    margin: 10px;
    height: 40px;
    font-size: 1.1rem;
    padding: 10px;
    border-radius: 18px;
`

C.Option = styled.option`
    font-size: 1.1rem;
`

export default C;