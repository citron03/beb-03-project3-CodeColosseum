import S from "./WriteTestCase.styled";
import { useState } from "react";

// function looseJsonParse(obj){
//     return Function('"use strict";return (' + obj + ')')();
// }

const parseArgument = (input) => {
    const tmp = window.eval('[' + input  +']');
    // console.log(tmp);
    return tmp;
}

const WriteTestCase = ( {handleAddTestCase} ) => {
    const [input, setInput] = useState("");
    const [output, setOutut] = useState("");

    // 테스트 케이스 최소 5개 50개
    return (
        <S.WriteTestCase>
            <S.TextArea placeholder={`input`} defaultValue={input} onChange={(e) => setInput(e.target.value)}/>
            <S.TextArea placeholder="output" defaultValue={output} onChange={e => setOutut(e.target.value)}/>
            <S.Button type="submit" onClick={() => handleAddTestCase(parseArgument(input), parseArgument(output))}>테스트 케이스 등록</S.Button> 
        </S.WriteTestCase>
    );
}

export default WriteTestCase;