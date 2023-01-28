import './App.css';
import { VocabularyForm } from './VocabularyForm';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <a
          className="App-link"
          href="https://github.com/tailuge/chankify"
          target="_blank"
          rel="noopener noreferrer"
        >
          Chankify
        </a> - generate tab seperated vocab list from chinese texts
      </header>
      <VocabularyForm />
    </div>
  );
}

export default App;
