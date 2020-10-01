import React, { useState } from 'react';
import { ChromePicker } from 'react-color';
import { ArtFocus, ArtList, ArtObject } from './Art';
import './App.css';

const DEFAULT_COLOR = '#333';

type Color = {
	hex: string;
};

function ColorPicker() {
	const [pickedColor, setPickedColor] = useState<string>(DEFAULT_COLOR);
	const [artList, setArtList] = useState<ArtObject[]>([]);
	const [artFocus, setArtFocus] = useState<ArtObject>();

	function handleClick(artList: ArtObject[]) {
		const newArtFocus = artList.length > 0 ? artList[0] : undefined;
		const newArtList = artList.length > 0 ? artList.slice(1) : artList;
		setArtFocus(newArtFocus);
		setArtList(newArtList);
	}

	return (
		<div className="App">
			<div className="color-container">
				<ChromeColorPicker pickedColor={(pickedColor: string) => { setPickedColor(pickedColor) }} />
				<GetArt pickedColor={pickedColor} handleClick={handleClick} />
			</div>
			{ artFocus && <ArtFocus objectInfo={artFocus} />}
			<ArtList artList={artList} />
		</div>
	)
}

type ColorPickerProps = {
	pickedColor: (background: string) => void;
};

type ColorPickerState = {
	background: string
};

type GetArtProps = {
	pickedColor: string;
	handleClick: (artList: ArtObject[]) => void;
};

class ChromeColorPicker extends React.Component<ColorPickerProps, ColorPickerState> {
	state: ColorPickerState = {
		background: DEFAULT_COLOR
	};

	handleChangeComplete = (color: Color) => {
		this.setState({ background: color.hex });
		this.props.pickedColor(this.state.background);
	};

	render() {
		console.log('picked', this.state.background);

		return (
			<ChromePicker
				color={this.state.background}
				onChangeComplete={this.handleChangeComplete}
			/>
		);
	}
}

function GetArt(props: GetArtProps) {
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
