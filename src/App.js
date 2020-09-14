import React, { useContext, useEffect, useState } from 'react';
import { ChromePicker } from 'react-color';
import logo from './logo.svg';
import './App.css';

const DEFAULT_COLOR = '#333';

function ColorPicker() {
  const [pickedColor, setPickedColor] = useState(DEFAULT_COLOR);
  console.log('PICKED COLOR', pickedColor);

  return (
    <div>
      <ChromeColorPicker pickedColor={(pickedColor) => { setPickedColor(pickedColor) }}/>
      <GetArt pickedColor={pickedColor}/>
    </div>
  )

}

class ChromeColorPicker extends React.Component {
  state = {
    background: DEFAULT_COLOR
  };

  handleChangeComplete = (color) => {
    this.setState({ background: color.hex });
    this.props.pickedColor(this.state.background);
  };

  render() {
    console.log('picked', this.state.background);

    return (
      <ChromePicker
        color={ this.state.background }
        onChangeComplete={ this.handleChangeComplete }
      />
    );
  }
}

function GetArt(props) {
  const { pickedColor } = props;
  console.log('color in button', pickedColor);

  async function handleClick() {
    const res = await fetch('/result', {
      method: 'POST',
      cache: 'no-cache',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(pickedColor)
    });
    console.log(res);
  }

  return (
    <button onClick={handleClick}>
      Get me an artwork
    </button>
  )
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ColorPicker/>
      </header>
    </div>
  );
}

export default App;
