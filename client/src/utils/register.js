import { useState } from "react";
import { defautCode } from "../assets/constants";

export const useRegister = () => {
    const [registerData, setRegisterData] = useState({"testcases": [], "title" : "",
         "explanation": "", "code": defautCode, "time": 20, "description": "", "openTime": 0}); 

    const handleExplanation = (e) => {
        setRegisterData(Object.assign({...registerData}, {"explanation" : e.target.value}));
    }
    
    const handleCode = (e) => {
        setRegisterData(Object.assign({...registerData}, {"code" : e}));
    }

    const handleAddTestCase = (input = null, output = null) => {
        // 함수 인자과 아웃풋
        const AddedTestCase = [...registerData.testcases, {
            inputs: input, output, isExample: false,
        }];
        setRegisterData(Object.assign({...registerData}, { "testcases": AddedTestCase }));
    }

    const handleTestCaseIsExample = (e, index) => {
        registerData.testcases[index].isExample = e.target.checked;
        setRegisterData({...registerData});
    }

    const handleRemoveTestCase = (idx) => {
        registerData.testcases.splice(idx, 1);
        setRegisterData(Object.assign({...registerData}, { "testcases": registerData.testcases }));
    }

    const handleTitle = (e) => {
        const ChangedTitle = {"title" : e.target.value};
        setRegisterData(Object.assign({...registerData}, ChangedTitle));
    }

    const handleEmptyTestcase = () => {
        setRegisterData(Object.assign({...registerData}, { "testcases": [] }));
    }

    const handleTime = (e) => {
        setRegisterData(Object.assign({...registerData}, { "time": parseInt(e.target.value) }));
    }

    const handleDescription = (e) => {
        setRegisterData(Object.assign({...registerData}, { "description": e.target.value}));
    }

    const handleOpenTime = (e) => {
        setRegisterData(Object.assign({...registerData}, { "openTime": parseInt(e.target.value) }));
    }

    return [registerData, handleExplanation, handleCode, handleAddTestCase, 
            handleRemoveTestCase, handleTitle, handleTestCaseIsExample, 
            handleEmptyTestcase, handleTime, handleDescription, handleOpenTime];
}