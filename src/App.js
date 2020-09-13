import React, { useEffect, useState } from 'react';
import { ChromePicker } from 'react-color';
import logo from './logo.svg';
import './App.css';

class ColorPicker extends React.Component {
  state = {
    background: '#333',
  };

  handleChangeComplete = (color) => {
    this.setState({ background: color.hex });
  };

  handleClick = async () => {
    const color = this.state.background;
    console.log('color', color);
    const res = await fetch('/result', {
      method: 'POST',
      cache: 'no-cache',
      headers: { 'content_type': 'application/json' },
      body: JSON.stringify(color)
    });
    console.log(res);
  };

  render() {
    console.log('picked', this.state.background);

    return (
      <div>
        <ChromePicker
          color={ this.state.background }
          onChangeComplete={ this.handleChangeComplete }
        />
        <button onClick={this.handleClick}>
          Get me an artwork
        </button>
      </div>
    );
  }
}

function App() {

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
        <ColorPicker />
      </header>
    </div>
  );
}

export default App;
