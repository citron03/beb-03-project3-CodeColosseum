import S from "./WriteTestCase.styled";
import { useState } from "react";

const parseArgument = (input) => {
    const tmp = window.eval('[' + input  +']');
    return tmp;
}

const WriteTestCase = ( {handleAddTestCase} ) => {
    const [input, setInput] = useState("");
    const [output, setOutut] = useState("");

    const submitTestCase = () => {
        handleAddTestCase(parseArgument(input), parseArgument(output));
        setInput("");
        setOutut("");
    }

    return (
        <S.WriteTestCase>
            <S.TextArea placeholder="input" onChange={(e) => setInput(e.target.value)} value={input}/>
            <S.TextArea placeholder="output" onChange={(e) => setOutut(e.target.value)} value={output}/>
            <S.Button type="submit" onClick={submitTestCase}>테스트 케이스 등록</S.Button> 
        </S.WriteTestCase>
    );
}

export default WriteTestCase;