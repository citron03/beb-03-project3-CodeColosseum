import { useState } from "react";

export const useRegister = () => {
    const [registerData, setRegisterData] = useState({"testcases": []}); 

    const handleExplanation = (e) => {
        setRegisterData(Object.assign({...registerData}, {"explanation" : e.target.value}));
    }
    
    const handleCode = (e) => {
        setRegisterData(Object.assign({...registerData}, {"code" : e}));
    }

    const handleAddTestCase = (input, output) => {
        // 함수 인자과 아웃풋
        const AddedTestCase = [[...registerData.testcases, {
            input, output
        }]];
        setRegisterData(Object.assign({...registerData}, { "testcases": AddedTestCase }));
    }

    const handleRemoveTestCase = (idx) => {
        const RemovedTestCase = [...registerData.testcases.splice(idx, 1)];
        setRegisterData(Object.assign({...registerData}, { "testcases": RemovedTestCase }));
    }

    return [registerData, handleExplanation, handleCode, handleAddTestCase, handleRemoveTestCase];
}