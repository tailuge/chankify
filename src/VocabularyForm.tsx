import React from 'react';
import { VocabularyFormState } from './VocabularyFormState';
import dict from './dict_rank.json';
import { Translate } from './Translate';
import { Entry } from './Entry';

export class VocabularyForm extends React.Component<{}, VocabularyFormState>
{

  translate = new Translate(dict as Entry[])
  state: VocabularyFormState = { inputText: '', outputText: '', skipCount: 1000 }

  handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({ inputText: event.target.value, outputText: '' });
  };


  extractVocab = () => {
    this.translate.skipCount = this.state.skipCount
    const text = this.translate.getTabDelimitedRows(this.state.inputText).join("\n")
    this.setState({ outputText: text })
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

  handleExportClick = () => {
    const date = new Date();
    var data = encodeURIComponent(JSON.stringify(this.translate.getAnkiData(this.state.inputText)))
    var sessionUUID = Math.floor(date.getTime() / 1000).toString()
    sessionStorage.setItem(sessionUUID, data)
    window.location.href = `./sample/index.html?sessionId=${sessionUUID}`
  }

  handleExportSentenceClick = () => {
    const date = new Date();
    var translation = JSON.stringify(this.translate.getAnkiSentenceData(this.state.inputText))
    console.log(translation)
    var data = encodeURIComponent(translation)
    var sessionUUID = Math.floor(date.getTime() / 1000).toString()
    sessionStorage.setItem(sessionUUID, data)
    window.location.href = `./sample/index.html?sessionId=${sessionUUID}`
  }

  handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ skipCount: parseInt(event.target.value) })
  }

  render() {
    return (

      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', padding: '20px', width: '100%', border: '20px' }}>
        <div style={{ flex: 1 }}>
          <textarea rows={8} value={this.state.inputText} style={{ width: '100%' }} onChange={this.handleInputChange}></textarea>
          <br />
          <input
            id="typeinp"
            type="range"
            min="0" max="5000"
            value={this.state.skipCount}
            onChange={this.handleSliderChange}
            style={{ width: '100%' }}
            step="100" /> skip {this.state.skipCount} most common dictionary words from vocab
          <br />
          <button onClick={this.handleButtonClick}>Extract Vocabulary</button>
          <br />
          <button onClick={this.handleDownloadClick} disabled={this.state.outputText.length === 0}>Download Tab seperated vocabulary</button>
          <br />
          <button onClick={this.handleExportClick} disabled={this.state.outputText.length === 0}>Export as vocab Anki Deck.apkg</button>
          <br />
          <button onClick={this.handleExportSentenceClick} disabled={this.state.outputText.length === 0}>Export sentence Anki Deck.apkg</button>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: this.state.outputText ? "none" : "block" }}>
            e.g. Paste the following text: 近來「人工智慧製圖」在網上蔚為一陣風潮，透過輸入相關關鍵字，AI就能經過大數據的計算，生成使用者所要的圖片。
          </div>
          <pre>{this.state.outputText}</pre>
        </div>
      </div>

    )
  }
}

