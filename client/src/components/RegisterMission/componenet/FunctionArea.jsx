import Editor from './../../Editor';
import S from './FunctionArea.styled';
import { defautCode } from '../../../assets/constants';

const FunctionArea = ({handleCode}) => {
    return (
        <S.FunctionArea>
            <Editor handleCode={handleCode} defautCode={defautCode}/>
        </S.FunctionArea>
    );
}

export default FunctionArea;