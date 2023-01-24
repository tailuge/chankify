import React, { useState } from 'react';

function MyForm() {
  const [inputText, setInputText] = useState('');
  const [displayText, setDisplayText] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleButtonClick = () => {
    setDisplayText(inputText);
  };

  return (
    <div>
      <input type="text" onChange={handleInputChange} value={inputText} />
      <button onClick={handleButtonClick}>Echo</button>
      {displayText !== '' && (
        <div style={{ backgroundColor: 'lightgray', padding: '1rem' }}>
          <code>{displayText}</code>
        </div>
      )}
    </div>
  );
}

export default MyForm;
