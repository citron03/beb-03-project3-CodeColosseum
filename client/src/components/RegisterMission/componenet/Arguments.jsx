import S from "./Arguments.styled";
import Argument from "./Argument";


const Arguments = ( { handleAddArg, handleRemoveArg, argCount, argTypes, handleArgTypes, handleEmptyTestcase } ) => {
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
            {argTypes.map((el, idx) => <Argument key={idx} index={idx} handleArgTypes={handleArgTypes}/>)}
            <S.Button onClick={handleAddArgTestCase}>Arg +</S.Button>
            <S.Button onClick={handleRemoveArgTestCase}>Arg -</S.Button>
        </S.Arguments>
    );
}

export default Arguments;