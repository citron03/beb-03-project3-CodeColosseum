import { useState } from "react";

export const useArguments = () => {
    const [argCount, setArgCount] = useState(0); // 함수 인자의 개수
    const [argTypes, setArgTypes] = useState([]);

    const handleAddArg = () => {
        setArgCount(prev => prev + 1);
        setArgTypes(prev => prev.concat(['string']));
    }

    const handleRemoveArg = () => {
        if(argCount > 0) {
            setArgCount(prev => prev - 1);
            setArgTypes(prev => prev.slice(0, prev.length - 1));
        }
    }

    const handleArgTypes = (idx, value) => {
        const newArr = [...argTypes];
        newArr[idx] = value;
        setArgTypes(newArr);
    }

    return [argCount, argTypes, handleAddArg, handleRemoveArg, handleArgTypes];
}