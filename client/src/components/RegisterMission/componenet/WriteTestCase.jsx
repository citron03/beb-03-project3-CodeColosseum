import S from "./WriteTestCase.styled";
import { useState } from "react";

const parseArgument = (input) => {
    try {
        const tmp = window.eval('[' + input  +']');
        return tmp;
    }
    catch {
        alert("ERROR! \n문자열을 '로 감싸주세요.");
        return '';
    }
}

const WriteTestCase = ( {handleAddTestCase, argTypes} ) => {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");

    const submitTestCase = () => {
        const arrInput = parseArgument(input);
        const arrOutput = parseArgument(output);
        console.log(arrOutput);
        if(!arrOutput || !arrInput){
            return;
        }
        if(arrOutput.length === 0){
            alert("output이 필요합니다!");
            return;
        }
        if(arrInput.length !== argTypes.length){
            alert("필요한 인자의 개수가 일치하지 않습니다.");
            return;
        }
        let i = 0;
        if(argTypes.length > 0){
            for(i = 0; i < argTypes.length; i++){
                if(argTypes[i] === 'array'){
                    if(!Array.isArray(arrInput[i])){
                        alert(`${i + 1}번째 인자의 타입이 올바르지 않습니다.`);
                        break;
                    }
                } else if(argTypes[i] === 'object'){
                    if(Array.isArray(arrInput[i])){
                        alert(`${i + 1}번째 인자의 타입이 올바르지 않습니다.`);
                        break;
                    }
                } else {
                    if(argTypes[i] !== typeof arrInput[i]){
                        alert(`${i + 1}번째 인자의 타입이 올바르지 않습니다.`);
                        break;
                    }
                }
            }
        }
        if(i === argTypes.length){
            handleAddTestCase(arrInput, arrOutput);
            setInput("");
            setOutput("");
        }
    }

    return (
        <S.WriteTestCase>
            <S.TextArea placeholder="input" onChange={(e) => setInput(e.target.value)} value={input}/>
            <S.TextArea placeholder="output" onChange={(e) => setOutput(e.target.value)} value={output}/>
            <S.Button type="submit" onClick={submitTestCase}>테스트 케이스 등록</S.Button> 
        </S.WriteTestCase>
    );
}

export default WriteTestCase;