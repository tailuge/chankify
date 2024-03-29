import React from 'react';
import { VocabularyFormState } from './VocabularyFormState';
import dict from './dict.json';
import dict_rank from './dict_rank.json';
import { Translate } from './Translate';
import { Statistics } from './Statistics'
import { Entry } from './Entry';
import { HanDict } from './HanDict';

export class VocabularyForm extends React.Component<{}, VocabularyFormState>
{

  constructor(props: {} | Readonly<{}>) {
    super(props);
    const hanDict = HanDict.fromDictAndRanking(dict as Entry[], dict_rank)
    this.translate = new Translate(hanDict)
    this.statistics = new Statistics(hanDict)
  }

  readonly translate: Translate
  readonly statistics: Statistics

  state: VocabularyFormState = { inputText: '', outputText: '', skipCount: 1000 }

  handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({ inputText: event.target.value, outputText: '' });
  };

  extractVocabStats = () => {
    this.statistics.skipCount = this.state.skipCount
    const text = this.statistics.getReport(this.state.inputText)
    this.setState({ outputText: text })
  }

  extractVocab = () => {
    this.translate.skipCount = this.state.skipCount
    const text = this.translate.getTabDelimitedRows(this.state.inputText).join("\n")
    this.setState({ outputText: text })
  }

  handleButtonClick = () => {
    this.extractVocab()
  };

  handleStatisticsButtonClick = () => {
    this.extractVocabStats()
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
    this.extractVocab()
    this.storeAndRedirect(encodeURIComponent(JSON.stringify(this.translate.getAnkiData(this.state.inputText))))
  }

  handleExportSentenceClick = () => {
    this.extractVocab()
    this.storeAndRedirect(encodeURIComponent(JSON.stringify(this.translate.getAnkiSentenceData(this.state.inputText))))
  }

  handleExportClozeClick = () => {
    this.extractVocab()
    this.storeAndRedirect(encodeURIComponent(JSON.stringify(this.translate.getAnkiClozeData(this.state.inputText))))
  }

  storeAndRedirect(data: string) {
    const date = new Date();
    var sessionUUID = Math.floor(date.getTime() / 1000).toString()
    sessionStorage.setItem(sessionUUID, data)
    window.location.href = `./sample/index.html?sessionId=${sessionUUID}`
  }

  handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ skipCount: parseInt(event.target.value) })
  }

  render() {
    return (

      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', padding: '10px', width: '90%', border: '10px' }}>
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
          <br />
          <button onClick={this.handleButtonClick}>Extract Vocabulary</button>
          <button onClick={this.handleStatisticsButtonClick}>Extract Statistics</button>
          <br />
          <br />
          <button onClick={this.handleDownloadClick} disabled={this.state.outputText.length === 0}>Download Tab seperated vocabulary</button>
          <br />
          <button onClick={this.handleExportClick} disabled={this.state.outputText.length === 0}>Export as single word vocab Anki deck.apkg</button>
          <br />
          <button onClick={this.handleExportSentenceClick} disabled={this.state.outputText.length === 0}>Export whole sentence Anki deck.apkg</button>
          <br />
          <button onClick={this.handleExportClozeClick} disabled={this.state.outputText.length === 0}>Export cloze Anki deck.apkg</button>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: this.state.outputText ? "none" : "block" }}>
            e.g. Paste the following text: 近來「人工智慧製圖」在網上蔚為一陣風潮，透過輸入相關關鍵字，AI就能經過大數據的計算，生成使用者所要的圖片。
          </div>
          <pre>{this.state.outputText}</pre>
          <div> { }
          </div>
        </div>
      </div>

    )
  }
}

