import S from "./WriteTestCase.styled";
import C from "../../CommonStyled";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { showNotification } from "../../../redux/action";

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

const checkValidType = (item, type) => {
    if(type === 'array'){
        if(!Array.isArray(item)){
            return false;
        }
    } else if(type === 'object'){
        if(Array.isArray(item) || type !== typeof item){
            return false;
        }
    } else {
        if(type !== typeof item){
            return false;
        }
    }
    return true;
}

const WriteTestCase = ( {handleAddTestCase, argTypes, outputType, testcases} ) => {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const dispatch = useDispatch();

    const submitTestCase = () => {
        const arrInput = parseArgument(input);
        const arrOutput = parseArgument(output);
        console.log(testcases, input);
        if(testcases.some(el => el === `[${input}]`)){
            dispatch(showNotification("이미 등록한 inputs의 테스트 케이스입니다!"));
            return;
        }
        if(!arrOutput || !arrInput){
            return;
        }
        if(arrOutput.length === 0){
            dispatch(showNotification("output이 필요합니다!"));
            return;
        }
        if(!checkValidType(arrOutput[0], outputType.type)){
            dispatch(showNotification("output의 type이 일치하지 않습니다."));
            return;
        }
        if(arrInput.length !== argTypes.length){
            dispatch(showNotification("필요한 인자의 개수가 일치하지 않습니다."));
            return;
        }
        let i = 0;
        if(argTypes.length > 0){
            for(i = 0; i < argTypes.length; i++){
                if(!checkValidType(arrInput[i], argTypes[i])){
                    dispatch(showNotification(`${i + 1}번째 인자의 타입이 올바르지 않습니다.`));
                    break;
                }
            }
        }
        if(i === argTypes.length){
            handleAddTestCase(arrInput, arrOutput[0]);
            setInput("");
            setOutput("");
        }
    }

    return (
        <S.WriteTestCase>
            <S.TextArea placeholder="input" onChange={(e) => setInput(e.target.value)} value={input}/>
            <S.TextArea placeholder="output" onChange={(e) => setOutput(e.target.value)} value={output}/>
            <C.Button type="submit" onClick={submitTestCase}>테스트 케이스 등록</C.Button> 
        </S.WriteTestCase>
    );
}

export default WriteTestCase;