import S from "./WriteTestCase.styled";
import { useCallback, useEffect, useState } from "react";

const makeArr = (num) => {
    const arr = [];
    for(let i = 0; i < num; i++){
        arr.push("");
    }
    return arr;
}

const WriteTestCase = ( {argCount, handleAddTestCase, handleTestcase} ) => {
    const [argArr, setArgArr] = useState([]);
    const [output, setOutut] = useState("");

    useEffect(() => {
        setArgArr(makeArr(argCount));
    }, [argCount])

    const handleArgs = useCallback((event,idx) => {
        const newArr = [...argArr];
        newArr[idx] = event.target.value;
        setArgArr(newArr);
    }, [argArr]);
    // 테스트 케이스 최소 5개 50개
    return (
        <S.WriteTestCase>
            {argArr.map((el, idx) => {
                return <S.TextArea key={idx} placeholder={`${idx + 1}번째 arg`} defaultValue={argArr[idx]} onChange={(e) => handleArgs(e, idx)}/>
            })}
            <S.TextArea placeholder="output" defaultValue={output} onChange={e => setOutut(e.target.value)}/>
            <S.Button type="submit" onClick={() => {handleAddTestCase(argArr, output)}}>테스트 케이스 등록</S.Button> 
        </S.WriteTestCase>
    );
}

export default WriteTestCase;