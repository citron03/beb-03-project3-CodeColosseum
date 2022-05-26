import S from "./Arguments.styled";
import C from "../../CommonStyled";
import Argument from "./Argument";
import Output from "./Output";

const Arguments = ( { handleAddArg, handleRemoveArg, argCount, argTypes, handleArgTypes, handleEmptyTestcase, setOutput } ) => {
    const handleAddArgTestCase = () => {
        handleEmptyTestcase();
        handleAddArg();
    }
    const handleRemoveArgTestCase = () => {
        handleEmptyTestcase();
        handleRemoveArg();
    }

    return (
        <S.Arguments>
            <S.P>이 함수에 필요한 인자 개수는 : {argCount}</S.P>
            {argTypes.map((el, idx) => <Argument key={idx} index={idx} handleArgTypes={handleArgTypes} handleEmptyTestcase={handleEmptyTestcase}/>)}
            <C.Button onClick={handleAddArgTestCase}>Arg +</C.Button>
            <C.Button onClick={handleRemoveArgTestCase}>Arg -</C.Button>
            <Output setOutput={setOutput} handleEmptyTestcase={handleEmptyTestcase}/>
        </S.Arguments>
    );
}

export default Arguments;