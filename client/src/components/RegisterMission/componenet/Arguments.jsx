import S from "./Arguments.styled";
import Argument from "./Argument";


const Arguments = ( { handleAddArg, handleRemoveArg, argCount, argTypes, handleArgTypes } ) => {
    return (
        <S.Arguments>
            <S.P>이 함수에 필요한 인자 개수는 : {argCount}</S.P>
            {argTypes.map((el, idx) => <Argument key={idx} index={idx} handleArgTypes={handleArgTypes}/>)}
            <S.Button onClick={handleAddArg}>Arg +</S.Button>
            <S.Button onClick={handleRemoveArg}>Arg -</S.Button>
        </S.Arguments>
    );
}

export default Arguments;