import React from 'react';
import { VocabularyFormState } from './VocabularyFormState';

export class VocabularyForm extends React.Component<{}, VocabularyFormState>
{

  state: VocabularyFormState = { inputText: '', outputText: '' }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputText: event.target.value, outputText: '' });
  };


  handleButtonClick = () => {
    alert(this.state.inputText);
  };

  render() {
    return (<div>
      <label htmlFor="firstName">First Name</label>
      <input name="firstName" value={this.state.inputText} onChange={this.handleInputChange} />
      <button onClick={this.handleButtonClick}>Echo</button>

    </div>
    )
  }
}

