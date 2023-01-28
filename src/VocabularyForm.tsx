import React from 'react';
import { VocabularyFormState } from './VocabularyFormState';
import dict from './dict.json';
import { Translate } from './Translate';
import { Entry } from './Entry';

export class VocabularyForm extends React.Component<{}, VocabularyFormState>
{


  translate = new Translate(dict as Entry[])
  state: VocabularyFormState = { inputText: '', outputText: '' }

  handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({ inputText: event.target.value, outputText: '' });
  };


  handleButtonClick = () => {
    const vocab = this.translate.getVocab(this.state.inputText)
    const text = vocab.map(entry => `${entry.hanzi}\t${entry.pinyin}\t${entry.meaning}`).join("\n")
    this.setState({ inputText: this.state.inputText, outputText: text })
  };

  render() {
    return (

      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', padding:'20px', width:'100%' , border:'20px' }}>
        <div style={{ flex: 1 }}>
          <textarea rows={5} value={this.state.inputText} style={{ width: '100%' }} onChange={this.handleInputChange}></textarea>
          <br />
          <button onClick={this.handleButtonClick}>Extract Vocabulary</button>
        </div>
        <div style={{ flex: 1 }}>
          <pre>{this.state.outputText}</pre>
        </div>
      </div>

    )
  }
}

