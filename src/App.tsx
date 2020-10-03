import React, { useState } from 'react';
import { ChromePicker } from 'react-color';
import { ArtFocus, ArtList, ArtObject } from './Art';
import { HandleClickFn } from './Colors';
import './App.css';

const DEFAULT_COLOR = '#333';

export type Color = {
	hex: string;
};

function ColorPicker() {
	const [pickedColor, setPickedColor] = useState<string>(DEFAULT_COLOR);
	const [artList, setArtList] = useState<ArtObject[]>([]);
	const artFocus = artList[0];

	function handleClick(newArtList: ArtObject[]) {
		setArtList(newArtList);
	}

	return (
		<div className="App">
			<div className="color-container">
				<ChromeColorPicker pickedColor={(pickedColor: string) => { setPickedColor(pickedColor) }} />
				<GetArt pickedColor={pickedColor} handleClick={handleClick} />
			</div>
			{ artFocus && <ArtFocus objectInfo={artFocus} artList={artList} handleClick={handleClick} />}
			<ArtList artList={artList} handleClick={handleClick} />
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
	handleClick: HandleClickFn
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
		const res = await fetch('/result', {
			method: 'POST',
			cache: 'no-cache',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify(pickedColor)
		});

		const artList = await res.json()
		console.log('current art list', artList);
		props.handleClick(artList);
	}

	return (
		<button onClick={handleClick}>
			Get me an artwork
		</button>
	)
}

export default ColorPicker;
