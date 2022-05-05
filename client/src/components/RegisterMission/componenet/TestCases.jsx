import TestCase from "./TestCase";
import WriteTestCase from "./WriteTestCase";
import S from "./TestCases.styled";

const TestCases = ({testcases, handleAddTestCase, handleRemoveTestCase}) => {

    return (
        <S.TestCases>
            {testcases.length > 0 ? testcases.map((el, idx) => {
                return <TestCase key={idx} data={el} handleRemoveTestCase={handleRemoveTestCase}/>
            }) : null}
            <WriteTestCase handleAddTestCase={handleAddTestCase} />
        </S.TestCases>
    );
}

export default TestCases;