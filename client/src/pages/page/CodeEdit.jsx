import { TestText } from "./../../components/CodeEdit";
import Editor from "../../components/Editor";
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