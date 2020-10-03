import React, { MouseEvent } from 'react';
import { ArtColor, ColorList, HandleClickFn } from './Colors';
import './Art.css';

export type Artist = {
    personid: number;
    displayname: string;
    displaydate?: number;
    culture?: string;
};

type ArtistsProps = {
    artists: Artist[];
};

export type ArtObject = {
    objectid: number;
    primaryimageurl: string;
    title?: string;
    people?: Artist[];
    dated?: number;
    technique?: string;
    colors: ArtColor[];
};

type ArtFocusProps = {
    objectInfo: ArtObject;
    artList: ArtObject[];
    handleClick: HandleClickFn;
};

type ArtObjectProps = {
    objectInfo: ArtObject;
    artList: ArtObject[];
    /** Index of the art object in the ArtList array */
    index: number;
    handleClick: HandleClickFn
};

export type ArtListProps = {
    artList: ArtObject[];
    handleClick: HandleClickFn
};

function Artists(props: ArtistsProps) {
    const { artists } = props;
    return (
        <div>
            {artists.map((artist) => {
                const { displayname, displaydate, culture, personid } = artist;
                const cultureInfo = culture ? ` (${culture})` : '';
                const dateInfo = displaydate ? `, ${displaydate}` : '';
                return <p key={personid}>{`${displayname}${cultureInfo}${dateInfo}`}</p>
            })}
        </div>
    )
}

function ArtList(props: ArtListProps) {
    const { artList } = props;

    return (
        <div className="Artlist">
            {artList.slice(1).map((artObject, index) => {
                const { objectid } = artObject;
                // Add one to each index to get actual index since we're omitting 0th index
                return <ArtObject key={objectid} artList={artList} objectInfo={artObject} index={index + 1} handleClick={props.handleClick} />
            })}
        </div>
    )
}

function ArtObject(props: ArtObjectProps) {
    const { artList, index } = props;
    const objectInfo = artList[index];
    const { primaryimageurl: url, title } = objectInfo;

    function handleClick(event: MouseEvent) {
        event.preventDefault();
        // Swap current art focus and art object
        console.log('artlist pre-swap', artList);
        const currentArtFocus = artList[0];
        const newArtList = [objectInfo, ...artList.slice(1, index), currentArtFocus, ...artList.slice(index + 1)]
        console.log('art list post swap', newArtList);
        props.handleClick(newArtList);
    }

    return (
        <figure className="Art">
            <img className="Art-image" src={url} alt={title} tabIndex={0} title={title} onClick={handleClick}></img>
        </figure>
    );
}

function ArtFocus(props: ArtFocusProps) {
    const { artList } = props;
    const objectInfo = artList[0];
    const { people: artists, title, dated: year, primaryimageurl: url, technique: medium, colors } = objectInfo;

    console.log('ART FOCUS', JSON.stringify(objectInfo));
    const titleInfo = title ? title : 'Untitled';
    const yearInfo = year ? `, ${year}` : '';

    let colorCircles;
    if (colors && colors.length > 0) {
        colorCircles = <ColorList colors={colors} handleClick={props.handleClick} />
    }

    return (
        <div className="Art">
            <figure>
                <img className="Art-image Art-focus" src={url} alt={title}></img>
                <figcaption className="Art-caption">
                    {`${titleInfo}${yearInfo}`}<br />
                    {artists && <Artists artists={artists} />}
                    {medium}<br />
                </figcaption>
            </figure>
            {colorCircles}
        </div>
    )
}

export { ArtFocus, ArtList };
