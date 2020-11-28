import React, { useState } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { ArtFocus, ArtList, ArtObject } from './Art';
import { SuggestedColors } from './Colors';
import { Header, Footer } from './HeaderAndFooter';
import './style/App.css';
import ColorSearch from './ColorSearch';

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

	console.log('app art list', artList);

	const queryParams = new URLSearchParams(useLocation().search);
	const color = queryParams.get('color') || '';
	console.log('app color', color);

	return ( 
		// BrowserRouter needs to be in index.tsx because you can't use the hooks from within the same component
		// that puts the router into the tree
		<div className="App">
			<Switch>
				<Route exact path="/">
					<Header />
					<ColorSearch pickedColor={pickedColor} setPickedColor={setPickedColor} handleClick={handleClick}/>
					<SuggestedColors handleClick={handleClick} numResults={numResults} />
					<Footer />
				</Route>
				<Route path="/images">
					<Header />
					<ColorSearch pickedColor={pickedColor} setPickedColor={setPickedColor} handleClick={handleClick}/>
					{!artFocus && <SuggestedColors handleClick={handleClick} numResults={numResults} />}
					{artFocus && <ArtFocus objectInfo={artFocus} artList={artList} handleClick={handleClick} />}
					{artList.length > 0 && <ArtList artList={artList} handleClick={handleClick} />}
					<Footer />
				</Route>
			</Switch>
		</div>
	)
}

export default ColorExplorer;
