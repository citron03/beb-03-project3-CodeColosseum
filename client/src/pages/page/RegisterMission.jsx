import { Arguments, FunctionArea, TestCases, Explanation } from './../../components/RegisterMission';
import S from './RegisterMission.styled';
import { useArguments } from '../../utils/arguments';
import { useRegister } from '../../utils/register';

const RegisterMission = () => {
    const [argCount, handleAddArg, handleRemoveArg] = useArguments();
    const [registerData, handleExplanation, handleCode, handleAddTestCase, handleRemoveTestCase] = useRegister();
    console.log(registerData);
    return (
    <S.RegisterMission>
        <Arguments handleAddArg={handleAddArg} handleRemoveArg={handleRemoveArg}/>
        <S.Section>
            <Explanation handleExplanation={handleExplanation}/>
            <FunctionArea handleCode={handleCode}/>
        </S.Section>
        <TestCases testcases={registerData.testcases} argCount={argCount} handleAddTestCase={handleAddTestCase} handleRemoveTestCase={handleRemoveTestCase}/>
    </S.RegisterMission>
    );
}

export default RegisterMission;