import { Arguments, FunctionArea, TestCases, Explanation } from './../../components/RegisterMission';
import S from './RegisterMission.styled';
import { useArguments } from '../../utils/arguments';
import { useRegister } from '../../utils/register';
import { useCallback } from 'react';

const RegisterMission = () => {
    const [argCount, argTypes, handleAddArg, handleRemoveArg, handleArgTypes] = useArguments();
    const [registerData, handleExplanation, handleCode, handleAddTestCase, handleRemoveTestCase] = useRegister();

    const submitMission = useCallback(() => {
        const completeData = {...registerData, argTypes};
        console.log(completeData);
    }, [registerData, argTypes]);

    return (
    <S.RegisterMission>
        <Arguments handleAddArg={handleAddArg} handleRemoveArg={handleRemoveArg} argCount={argCount} argTypes={argTypes} handleArgTypes={handleArgTypes}/>
        <S.Section>
            <Explanation handleExplanation={handleExplanation}/>
            <FunctionArea handleCode={handleCode}/>
        </S.Section>
        <TestCases testcases={registerData.testcases} handleAddTestCase={handleAddTestCase} handleRemoveTestCase={handleRemoveTestCase}/>
        <S.Button onClick={submitMission}>문제 등록하기</S.Button>
    </S.RegisterMission>
    );
}

export default RegisterMission;