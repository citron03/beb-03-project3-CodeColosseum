import {Editor, TestText} from "./../../components/CodeEdit";
import S from "./CodeEdit.styled";

const CodeEdit = () => {

    return (
        <S.CodeEdit>
            <TestText/>
            <Editor/>
        </S.CodeEdit>
    );
}

export default CodeEdit;