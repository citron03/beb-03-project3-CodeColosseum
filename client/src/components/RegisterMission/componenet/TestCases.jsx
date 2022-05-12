import TestCase from "./TestCase";
import WriteTestCase from "./WriteTestCase";
import S from "./TestCases.styled";

const TestCases = ({testcases, handleAddTestCase, handleRemoveTestCase, argTypes, handleTestCaseIsExample, output}) => {
    const types = argTypes.map(el => el.type);
    const testcasesInputs = testcases.map(el => JSON.stringify(el.inputs));
    return (
        <S.TestCases>
            {testcases.length > 0 ? testcases.map((el, idx) => {
                return <TestCase key={idx} data={el} handleRemoveTestCase={handleRemoveTestCase} index={idx} handleTestCaseIsExample={handleTestCaseIsExample}/>
            }) : null}
            <WriteTestCase handleAddTestCase={handleAddTestCase} argTypes={types} outputType={output} testcases={testcasesInputs}/>
        </S.TestCases>
    );
}

export default TestCases;