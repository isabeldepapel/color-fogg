import React, { useEffect, useState } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { ArtFocus, ArtList } from './Art';
import { SuggestedColors } from './Colors';
import { Header, Footer } from './HeaderAndFooter';
import ColorSearch from './ColorSearch';
import { ArtObject } from './helpers';
import './style/App.css';

const DEFAULT_COLOR = '#646464';

function ColorExplorer(): JSX.Element {
    const [pickedColor, setPickedColor] = useState<string>(DEFAULT_COLOR);
    const [artList, setArtList] = useState<ArtObject[]>([]);
    const [numResults, setNumResults] = useState<number | undefined>();
    const artFocus = artList[0];

    function handleClick(newArtList: ArtObject[]) {
        setArtList(newArtList);
        setNumResults(newArtList.length);
    }

    const queryParams = new URLSearchParams(useLocation().search);
    const color = queryParams.get('color') || '';

    /**
     * On browser refresh/back/forward update from cache
     *
     * State is saved in the cache using the color as the key. This means that someone could search for the same color
     * twice, get two different results (because the API returns the images in a random sort), but the cache will only
     * save the LATEST search (overwriting the first one), so the same result will be returned twice when exact history
     * would return the two different sets of results. Either the API call needs to be changed so it's not a random return
     * or this needs to be better caching. For the time being though, this gets most of the way there in terms of updating
     * the URL and enabling expected browser behavior.
     */
    useEffect(() => {
        const cachedArtList = sessionStorage.getItem(color);
        if (color.length > 0 && cachedArtList) {
            // TODO: better color hex validation
            const updatedArtList = JSON.parse(cachedArtList) as ArtObject[];
            setArtList(updatedArtList);
            setNumResults(updatedArtList.length);
        }
    }, [color]);

    return (
        // BrowserRouter needs to be in index.tsx because you can't use the hooks from within the same component
        // that puts the router into the tree
        <div className="App">
            <Switch>
                <Route exact path="/">
                    <Header />
                    <ColorSearch pickedColor={pickedColor} setPickedColor={setPickedColor} handleClick={handleClick} />
                    <SuggestedColors handleClick={handleClick} numResults={numResults} />
                    <Footer />
                </Route>
                <Route path="/images">
                    <Header />
                    <ColorSearch pickedColor={pickedColor} setPickedColor={setPickedColor} handleClick={handleClick} />
                    {!artFocus && <SuggestedColors handleClick={handleClick} numResults={numResults} />}
                    {artFocus && <ArtFocus artList={artList} handleClick={handleClick} />}
                    {artList.length > 0 && <ArtList artList={artList} handleClick={handleClick} />}
                    <Footer />
                </Route>
            </Switch>
        </div>
    );
}

export default ColorExplorer;
