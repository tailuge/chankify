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
        </a>
        <VocabularyForm />
      </header>
    </div>
  );
}

export default App;
