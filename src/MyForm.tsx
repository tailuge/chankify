import React from 'react';

function MyForm() {

  const handleButtonClick = () => {
    console.log("test");
    alert("any");
  };

  function sayHello() {
    alert('You clicked me!');
  }

  return (
    <div>
      <button onClick={() => console.log("test")}>Echo</button>
      <button onClick={sayHello}>Default</button>
    </div>
  );
}

export default MyForm;
