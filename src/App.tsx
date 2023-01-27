import React from 'react';
import logo from './logo.svg';
import './App.css';
import dict from './dict.json';
import { HanDict } from './HanDict';


function App() {

  const dictionary = new HanDict(dict);

  console.log(dict);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {`dict: ${JSON.stringify(dictionary.longestPrefixMatch("12"))}`}
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
  );
}

export default App;
