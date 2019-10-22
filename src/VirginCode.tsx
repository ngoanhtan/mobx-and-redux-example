import React, { useState, useEffect } from 'react';
import AceEditor, { IEditorProps } from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
const runCodeInit = `
  todoStore.addTodo("read MobX tutorial");
  console.log(todoStore.report());

  todoStore.addTodo("try MobX");
  console.log(todoStore.report());

  todoStore.todos[0].completed = true;
  console.log(todoStore.report());

  todoStore.todos[1].task = "try MobX in own project";
  console.log(todoStore.report());

  todoStore.todos[0].task = "grok MobX tutorial";
  console.log(todoStore.report());
`;

interface Props {
  setResultValue: any;
}

const VirginCode: React.FC<Props> = ({ setResultValue }) => {
  const [basicStoreCode, setBasicStoreCode] = useState('Loading code...');
  const [runCode, setRunCode] = useState(runCodeInit);

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/code/BasicStore.js`)
      .then(response => response.text())
      .then(text => setBasicStoreCode(text));
  }, []);

  const onChangeCode = setStateFunc => {
    return (value: string, event?: any) => {
      setStateFunc(value);
    };
  };

  const onLoadCode = (editor: IEditorProps) => {};

  const renderCodeText = (text: string, onChangeCallback) => {
    return (
      <AceEditor
        placeholder='Placeholder Text'
        mode='javascript'
        theme='monokai'
        name='blah2'
        onLoad={onLoadCode}
        onChange={onChangeCallback}
        fontSize={14}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        setOptions={{
          enableBasicAutocompletion: false,
          enableLiveAutocompletion: false,
          enableSnippets: false,
          showLineNumbers: true,
          tabSize: 2,
        }}
        style={{ width: '100%' }}
        value={text}
      />
    );
  };
  return (
    <React.Fragment>
      {renderCodeText(basicStoreCode, onChangeCode(setBasicStoreCode))}
      <p></p>
      {renderCodeText(runCode, onChangeCode(setRunCode))}
      <button
        onClick={() => {
          eval('console.logs.length=0');
          setResultValue([]);
          let result = eval(basicStoreCode + runCode);
          setTimeout(() => setResultValue(eval('console.logs')), 100);
        }}
        className='btn-run'
      >
        Run Code
      </button>
    </React.Fragment>
  );
};

export default VirginCode;
