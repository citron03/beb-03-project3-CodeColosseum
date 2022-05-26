import Editor from './../../Editor';
import S from './FunctionArea.styled';
import { defautCode } from '../../../assets/constants';

const FunctionArea = ({handleCode, setSyntaxError}) => {

    return (
        <S.FunctionArea>
            <Editor handleCode={handleCode} defautCode={defautCode} setSyntaxError={setSyntaxError}/>
        </S.FunctionArea>
    );
}

export default FunctionArea;