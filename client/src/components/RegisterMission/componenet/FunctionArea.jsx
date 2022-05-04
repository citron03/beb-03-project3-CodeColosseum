import Editor from './../../Editor';
import S from './FunctionArea.styled';

const FunctionArea = ({handleCode}) => {
    return (
        <S.FunctionArea>
            <Editor handleCode={handleCode}/>
        </S.FunctionArea>
    );
}

export default FunctionArea;