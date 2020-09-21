import React, { useContext, useEffect, useState } from 'react';
import { ChromePicker } from 'react-color';
import { ArtFocus, ArtList } from './Art';
import './App.css';

const DEFAULT_COLOR = '#333';

function ColorPicker() {
  const [pickedColor, setPickedColor] = useState(DEFAULT_COLOR);
  const [artList, setArtList] = useState([]);
  const [artFocus, setArtFocus] = useState({});
 
  function handleClick(artList) {
    const newArtFocus = artList.length > 0 ? artList[0] : {};
    const newArtList = artList.length > 0 ? artList.slice(1) : artList;
    setArtFocus(newArtFocus);
    setArtList(newArtList);
  }

  return (
    <div className="App">
      <div className="color-container">
        <ChromeColorPicker pickedColor={(pickedColor) => { setPickedColor(pickedColor) }}/>
        <GetArt pickedColor={pickedColor} handleClick={handleClick} />
      </div>
      <ArtFocus objectInfo={artFocus}/>
      <ArtList artList={artList}/>
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

    async function handleClick() {
      console.log('handling click');
      const res = await fetch('/result', {
        method: 'POST',
        cache: 'no-cache',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(pickedColor)
      });
  
      const artList = await res.json()
      console.log('current art list', artList);
      // setArtList(artList);
      props.handleClick(artList);
    }

  return (
    <button onClick={handleClick}>
      Get me an artwork
    </button>
  )
}

export default ColorPicker;
