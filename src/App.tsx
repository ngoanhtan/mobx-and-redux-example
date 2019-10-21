import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import logo from './logo.svg';

import './assets/App.css';
import './assets/Style.css';

import VirginCode from './VirginCode';
import MobXCode from './MobXCode';
import MobXReactCode from './MobXReactCode';

export function readTextFile(file, callBack) {
  var rawFile = new XMLHttpRequest();
  rawFile.open('GET', file, false);
  rawFile.onreadystatechange = function() {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status == 0) {
        console.log('TCL: rawFile', rawFile);
        var allText = rawFile.responseText;
        callBack(allText);
      }
    }
  };
  rawFile.send(null);
}

const overrideCode = `
  console.stdlog = console.log.bind(console);
  console.logs = [];
  console.log = function(){
      console.logs.push(Array.from(arguments));
      console.stdlog.apply(console, arguments);
  }
`;

const Mode = {
  VIRGIN: 'Virgin',
  REDUX: 'Redux',
  MOBX: 'MobX',
  MOBX_REACT: 'mobxReact',
};
const App: React.FC = () => {
  const [resultValue, setResultValue] = useState([]);
  const [mode, setMode] = useState(Mode.VIRGIN);

  useEffect(() => {
    eval(overrideCode);
  }, []);

  const renderResultText = (text: Array<string>) => {
    return text.map((item, index) => <div key={`${index}${item}`}>${item}</div>);
  };

  const clearLog = () => {
    eval('console.logs.length=0');
    setResultValue([]);
  };

  return (
    <Router>
      <div>
        <table className='root'>
          <tbody>
            <tr>
              <td className='left'>
                <div className='left-content-wrapper'>
                  <div className='left-content'>
                    <div className='App'>
                      <header>
                        <a href='index.html' style={{ float: 'left' }}></a>
                        <h3
                          id='project_tagline'
                          style={{ float: 'right', cursor: 'pointer' }}
                          onClick={() => setMode(Mode.VIRGIN)}
                        >
                          <Link to={`/${Mode.VIRGIN}`}>{Mode.VIRGIN}</Link>
                        </h3>
                        <h3 id='project_tagline' style={{ float: 'right' }}>
                          |
                        </h3>
                        <h3
                          id='project_tagline'
                          style={{ float: 'right', cursor: 'pointer' }}
                          onClick={() => setMode(Mode.REDUX)}
                        >
                          <Link to={`/${Mode.REDUX}`}>{Mode.REDUX}</Link>
                        </h3>
                        <h3 id='project_tagline' style={{ float: 'right' }}>
                          |
                        </h3>
                        <h3
                          id='project_tagline'
                          style={{ float: 'right', cursor: 'pointer' }}
                          onClick={() => setMode(Mode.MOBX)}
                        >
                          <Link to={`/${Mode.MOBX}`}>{Mode.MOBX}</Link>
                        </h3>
                        <h3 id='project_tagline' style={{ float: 'right' }}>
                          |
                        </h3>
                        <h3
                          id='project_tagline'
                          style={{ float: 'right', cursor: 'pointer' }}
                          onClick={() => setMode(Mode.MOBX_REACT)}
                        >
                          <Link to={`/${Mode.MOBX_REACT}`}>{Mode.MOBX_REACT}</Link>
                        </h3>
                        <h1 id='project_title'>{mode}</h1>
                        {
                          <Switch>
                            <Route path='/virgin'>
                              <h2 id='project_tagline' style={{ fontSize: '18pt' }}>
                                Without using Redux and MobX
                              </h2>
                            </Route>
                            <Route path='/mobx'>
                              <h2 id='project_tagline' style={{ fontSize: '18pt' }}>
                                With using MobX
                              </h2>
                            </Route>
                            <Route path='/redux'>
                              <h2 id='project_tagline' style={{ fontSize: '18pt' }}>
                                With using Redux
                              </h2>
                            </Route>
                            <Route path='/mobxReact'>
                              <h2 id='project_tagline' style={{ fontSize: '18pt' }}>
                                MobX in React
                              </h2>
                            </Route>
                          </Switch>
                        }
                        <hr />
                      </header>
                      <section id='main_content'>
                        {
                          <Switch>
                            <Route path='/virgin'>
                              <VirginCode setResultValue={setResultValue} />
                            </Route>
                            <Route path='/mobx'>
                              <MobXCode setResultValue={setResultValue} />
                            </Route>
                            <Route path='/mobxReact'>
                              <MobXReactCode setResultValue={setResultValue} />
                            </Route>
                            <Route path='/redux'>
                              <VirginCode setResultValue={setResultValue} />
                            </Route>
                          </Switch>
                        }
                      </section>
                    </div>
                  </div>
                </div>
              </td>
              <td className='right'>
                <div className='right-content'>
                  <h3>
                    Console log
                    <button id='clear-btn' onClick={clearLog}>
                      clear
                    </button>
                  </h3>
                  <div id='consoleout'>{renderResultText(resultValue)}</div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Router>
  );
};

export default App;
