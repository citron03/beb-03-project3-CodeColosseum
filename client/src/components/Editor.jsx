import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-solarized_light";
import "ace-builds/src-noconflict/ext-language_tools";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const ace = require('ace-builds/src-noconflict/ace');
ace.config.set("basePath", "https://cdn.jsdelivr.net/npm/ace-builds@1.4.3/src-noconflict/");
ace.config.setModuleUrl('ace/mode/javascript_worker', "https://cdn.jsdelivr.net/npm/ace-builds@1.4.3/src-noconflict/worker-javascript.js");

const editorStyle = {
    width: "100%",
    maxWidth: "1200px"
}

const Editor = ({handleCode, defautCode = null, setSyntaxError}) => {
    const isDarkMode = useSelector(state => state.darkMode).isDarkMode;

    useEffect(() => {
        setTimeout(() => {
            const editor = ace.edit(document.getElementById('edit_code'));
            const errArr = editor.getSession().getAnnotations();
            setSyntaxError(errArr);
        }, 1000);
    })

    return (
        <AceEditor
            mode="javascript"
            theme={isDarkMode ? "monokai" : "solarized_light"}
            onChange={e => handleCode(e)}
            placeholder={`코드를 작성하세요`}
            name="edit_code"
            fontSize={24}
            editorProps={{ $blockScrolling: true }}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            style={editorStyle}
            defaultValue={defautCode}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showLineNumbers: true,
              tabSize: 2
            }}
        />
    );
}

export default Editor;