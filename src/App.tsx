import './App.css';
import dict from './dict.json';
import { Translate } from './Translate';
import { Entry } from './Entry';
import { VocabularyForm } from './VocabularyForm';


function App() {

  const translate = new Translate(dict as Entry[]);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          {`dict: ${JSON.stringify(translate.getVocab("近來「AI製圖」在網上蔚為一陣風潮"))}`}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <VocabularyForm />
      </header>
    </div>
  );
}

export default App;
