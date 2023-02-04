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


  extractVocab = () => {
    const text = this.translate.getTabDelimitedRows(this.state.inputText).join("\n")
    this.setState({ inputText: this.state.inputText, outputText: text })
  }

  handleButtonClick = () => {
    this.extractVocab()
  };

  handleDownloadClick = () => {
    this.extractVocab()
    const blob = new Blob([this.state.outputText], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "vocab.txt";
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  render() {
    return (

      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', padding: '20px', width: '100%', border: '20px' }}>
        <div style={{ flex: 1 }}>
          <textarea rows={5} value={this.state.inputText} style={{ width: '100%' }} onChange={this.handleInputChange}></textarea>
          <br />
          <button onClick={this.handleButtonClick}>Extract Vocabulary</button>
          <button onClick={this.handleDownloadClick} disabled={this.state.outputText.length === 0}>Download Vocabulary</button>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: this.state.outputText ? "none" : "block" }}>
            e.g. Paste the following text: 近來「AI製圖」在網上蔚為一陣風潮，透過輸入相關關鍵字，AI就能經過大數據的計算，生成使用者所要的圖片。
          </div>
          <pre>{this.state.outputText}</pre>
        </div>
      </div>

    )
  }
}

