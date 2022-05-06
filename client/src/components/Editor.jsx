import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

const ace = require('ace-builds/src-noconflict/ace');
ace.config.set("basePath", "https://cdn.jsdelivr.net/npm/ace-builds@1.4.3/src-noconflict/");
ace.config.setModuleUrl('ace/mode/javascript_worker', "https://cdn.jsdelivr.net/npm/ace-builds@1.4.3/src-noconflict/worker-javascript.js");

const Editor = ({handleCode, defautCode = null}) => {

    return (
        <AceEditor
            mode="javascript"
            theme="monokai"
            onChange={e => handleCode(e)}
            placeholder={`코드를 작성하세요`}
            name="edit_code"
            fontSize={24}
            editorProps={{ $blockScrolling: true }}
            showPrintMargin
            showGutter
            highlightActiveLine
            style={{width: "100%"}}
            defaultValue={defautCode}
        />
    );
}

export default Editor;