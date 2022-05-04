import { useState } from "react";

export const useArguments = () => {
    const [argCount, setArgCount] = useState(0); // 함수 인자의 개수

    const handleAddArg = () => {
        setArgCount(prev => prev + 1);
    }

    const handleRemoveArg = () => {
        if(argCount > 0) {
            setArgCount(prev => prev - 1);
        }
    }

    return [argCount, handleAddArg, handleRemoveArg];
}