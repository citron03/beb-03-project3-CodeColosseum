import TestCase from "./TestCase";
import WriteTestCase from "./WriteTestCase";
import S from "./TestCases.styled";

const TestCases = ({testcases, handleAddTestCase, handleRemoveTestCase, argTypes, handleTestCaseHide}) => {

    return (
        <S.TestCases>
            {testcases.length > 0 ? testcases.map((el, idx) => {
                return <TestCase key={idx} data={el} handleRemoveTestCase={handleRemoveTestCase} index={idx} handleTestCaseHide={handleTestCaseHide}/>
            }) : null}
            <WriteTestCase handleAddTestCase={handleAddTestCase} argTypes={argTypes}/>
        </S.TestCases>
    );
}

export default TestCases;