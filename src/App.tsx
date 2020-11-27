import React, { useState } from 'react';
import { BrowserRouter, Route, Switch, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { ChromePicker } from 'react-color';
import { ArtFocus, ArtList, ArtObject } from './Art';
import { SuggestedColors, createRequest } from './Colors';
import { Header, Footer } from './HeaderAndFooter';
import { HandleClickFn } from './Colors';
import './style/App.css';
import ColorSearch from './ColorSearch';

const DEFAULT_COLOR = '#646464';

export type Color = {
	hex: string;
};

function ColorExplorer() {
	const [pickedColor, setPickedColor] = useState<string>(DEFAULT_COLOR);
	const [artList, setArtList] = useState<ArtObject[]>([]);
	const [numResults, setNumResults] = useState<number | undefined>();
	const artFocus = artList[0];

	function handleClick(newArtList: ArtObject[]) {
		setArtList(newArtList);
		setNumResults(newArtList.length);
	}

	return (
		<div className="App">
			<BrowserRouter>
				<Switch>
					<Route exact path="/">
						<Header />
						<ColorSearch pickedColor={pickedColor} setPickedColor={setPickedColor} handleClick={handleClick}/>
						<Footer />
					</Route>
					<Route>

					</Route>
				</Switch>
			</BrowserRouter>

			<div className="color-container">
				<ChromeColorPicker pickedColor={(pickedColor: string) => { setPickedColor(pickedColor) }} />
				<GetArt pickedColor={pickedColor} handleClick={handleClick} />
			</div>
			{!artFocus && <SuggestedColors handleClick={handleClick} numResults={numResults} />}
			{artFocus && <ArtFocus objectInfo={artFocus} artList={artList} handleClick={handleClick} />}
			{artList.length > 0 && <ArtList artList={artList} handleClick={handleClick} />}
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
		const res = await fetch(createRequest(pickedColor));

		try {
			const artList = await res.json()
			console.log('current art list', artList);
			props.handleClick(artList);
		} catch (err) {
			// TODO: actual error handling
			console.log(err);
		}
	}

	return (
		<button className="color-button" onClick={handleClick}>
			Search
		</button>
	)
}

function App() {
	const queryParams = new URLSearchParams(useLocation().search);
	const color = queryParams.get('color');
	const path = `/images?color=${color}`;

	return (
	// <BrowserRouter>
		<Switch>
			<Route exact path="/">
				<ColorExplorer />
			</Route>
			<Route path={path}>
				<ColorExplorer />
			</Route>
		</Switch>
	// </BrowserRouter>
	)
}

export default App;
