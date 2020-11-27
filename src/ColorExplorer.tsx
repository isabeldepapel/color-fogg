import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { ChromePicker } from 'react-color';
import { ArtFocus, ArtList, ArtObject } from './Art';
import { SuggestedColors, createRequest } from './Colors';
import { HandleClickFn } from './Colors';
import './style/App.css';

const DEFAULT_COLOR = '#646464';

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
			<header className="header">
				<div className="header-text">
					<h1>Color Explorer</h1>
					<h4>Find art by color</h4>
				</div>
			</header>
			<div className="color-container">
				<ChromeColorPicker pickedColor={(pickedColor: string) => { setPickedColor(pickedColor) }} />
				<GetArt pickedColor={pickedColor} handleClick={handleClick} />
			</div>
			{!artFocus && <SuggestedColors handleClick={handleClick} numResults={numResults} />}
			{artFocus && <ArtFocus objectInfo={artFocus} artList={artList} handleClick={handleClick} />}
			{artList.length > 0 && <ArtList artList={artList} handleClick={handleClick} />}
			<footer className="footer">
				<div className="about">
					<a href="https://www.github.com/isabeldepapel/color-fogg" target="_blank" rel="noreferrer noopener" tabIndex={0}>
						<FontAwesomeIcon icon={faGithub} size="2x" />
					</a>
					<a href="https://www.linkedin.com/in/isabelsuchanek" target="_blank" rel="noreferrer noopener" tabIndex={0}>
						<FontAwesomeIcon icon={faLinkedinIn} size="2x" />
					</a>
					<span className="copyright">&#169; 2020</span>
				</div>
				<div className="courtesy">All content courtesy of
					<a href="https://www.harvardartmuseums.org/" target="_blank" rel="noreferrer noopener"> Harvard Art Museums</a>
				</div>
			</footer>
		</div>
	)
}

export type Color = {
	hex: string;
};

type ColorPickerProps = {
	pickedColor: (background: string) => void;
};

type ColorPickerState = {
	background: string
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


export {
	ColorExplorer
};

// function App() {
// 	const queryParams = new URLSearchParams(useLocation().search);
// 	const color = queryParams.get('color');
// 	const path = `/images?color=${color}`;

// 	return (
// 	// <BrowserRouter>
// 		<Switch>
// 			<Route exact path="/">
// 				<ColorExplorer />
// 			</Route>
// 			<Route path={path}>
// 				<ColorExplorer />
// 			</Route>
// 		</Switch>
// 	// </BrowserRouter>
// 	)
// }

// export default App;
