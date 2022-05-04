import S from "./Arguments.styled";


const Arguments = ( { handleAddArg, handleRemoveArg } ) => {
    return (
        <S.Arguments>
            <S.Button onClick={handleAddArg}>Arg +</S.Button>
            <S.Button onClick={handleRemoveArg}>Arg -</S.Button>
        </S.Arguments>
    );
}

export default Arguments;