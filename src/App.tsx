import React, {useState} from 'react';

import AceEditor, { IEditorProps } from "react-ace";

import logo from './logo.svg';

import './assets/App.css';
import './assets/Style.css';

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";

function readTextFile(file, callBack)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
              
            console.log("TCL: rawFile", rawFile)
                var allText = rawFile.responseText;
                callBack(allText)
            }
        }
    }
    rawFile.send(null);
}

const App: React.FC = () => {
  const [codeValue,setCodeValue] = useState("Loading code...")
  const onChangeCode = (value: string, event?: any) => {
    console.log("TCL: App:React.FC -> e", event)
  }

  const onLoadCode = (editor: IEditorProps) => {
    console.log("TCL: App:React.FC -> e", editor)
    fetch('./stores/BasicStore.ts')
  .then(response => response.text())
  .then(text => console.log(text))
  }

  return (
    <div>
      <table className="root">
        <tbody>
          <tr>
            <td className="left">
              <div className="left-content-wrapper">
                <div className="left-content">
                  <div className="App">
                    <header>
                      <a href="index.html" style={{ float: "left" }}></a>
                      <h1 id="project_title">Example</h1>
                      <h2 id="project_tagline" style={{ fontSize: "18pt" }}>Without using Redux and MobX</h2>
                      <hr />
                    </header>
                    <section id="main_content">
                      {/* <div className="CodeMirror cm-s-xq-light"> */}
                        <AceEditor
                          placeholder="Placeholder Text"
                          mode="javascript"
                          theme="monokai"
                          name="blah2"
                          onLoad={onLoadCode}
                          onChange={onChangeCode}
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
                          style={{ width: "100%" }}
                          value={codeValue}
                        />
                      {/* </div> */}
                    </section>
                  </div>
                </div>
              </div>
            </td>
            <td className="right">
              <div className="right-content">
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  );
}

export default App;
