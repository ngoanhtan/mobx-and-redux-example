import React from 'react';
import logo from './logo.svg';
import './assets/App.css';
import './assets/Style.css';

const App: React.FC = () => {
  return (
    <div>
      <table className="root">
        <tbody>
          <tr>
            <td className="left">
              <div className="left-content-wrapper">
                <div className="left-content">
                  <div className="App">
                    <header className="App-header">
                      <img src={logo} className="App-logo" alt="logo" />
                      <p>
                        Edit <code>src/App.tsx</code> and save to reload.
                      </p>
                      <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Learn React
                      </a>
                    </header>
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
