import React, { MouseEvent } from 'react';
import { Artist, ArtObject, HandleClickFn } from './helpers';
import { ColorList } from './Colors';
import './style/Art.css';

type ArtistsProps = {
    artists: Artist[];
};

type ArtFocusProps = {
    artList: ArtObject[];
    handleClick: HandleClickFn;
};

type ArtImageProps = {
    artList: ArtObject[];
    /** Index of the art object in the ArtList array */
    index: number;
    handleClick: HandleClickFn;
};

export type ArtListProps = {
    artList: ArtObject[];
    handleClick: HandleClickFn;
};

function Artists(props: ArtistsProps) {
    const { artists } = props;
    return (
        <div>
            {artists.map((artist) => {
                const { displayname, displaydate, culture, personid } = artist;
                const cultureInfo = culture ? ` (${culture})` : '';
                const dateInfo = displaydate ? `, ${displaydate}` : '';
                return <p key={personid}>{`${displayname}${cultureInfo}${dateInfo}`}</p>;
            })}
        </div>
    );
}

function ArtImage(props: ArtImageProps) {
    const { artList, index } = props;
    const objectInfo = artList[index];
    const { primaryimageurl: imageUrl, title } = objectInfo;

    function handleClick(event: MouseEvent) {
        event.preventDefault();
        // Swap current art focus and art object
        console.log('artlist pre-swap', artList);
        const currentArtFocus = artList[0];
        const newArtList = [objectInfo, ...artList.slice(1, index), currentArtFocus, ...artList.slice(index + 1)];
        console.log('art list post swap', newArtList);
        props.handleClick(newArtList);
    }

    return (
        <figure className="Art">
            <button type="button" tabIndex={0} onClick={handleClick} className="Art-image">
                <img className="Art-image" src={imageUrl} alt={title} title={title} />
            </button>
        </figure>
    );
}

function ArtList(props: ArtListProps): JSX.Element {
    const { artList } = props;

    return (
        <div className="Artlist">
            {artList.slice(1).map((artObject, index) => {
                const { objectid } = artObject;
                // Add one to each index to get actual index since we're omitting 0th index
                return <ArtImage key={objectid} artList={artList} index={index + 1} handleClick={props.handleClick} />;
            })}
        </div>
    );
}

function ArtFocus(props: ArtFocusProps): JSX.Element {
    const { artList } = props;
    const objectInfo = artList[0];
    const {
        people: artists,
        title,
        dated: year,
        primaryimageurl: imageUrl,
        url: objectUrl,
        technique: medium,
        colors,
    } = objectInfo;

    console.log('ART FOCUS', JSON.stringify(objectInfo));
    const titleInfo = title || 'Untitled';
    const yearInfo = year ? `, ${year}` : '';

    let colorCircles;
    if (colors && colors.length > 0) {
        colorCircles = <ColorList colors={colors} handleClick={props.handleClick} />;
    }

    return (
        <div className="Art-focus">
            <figure>
                <a href={objectUrl} target="blank" rel="noreferrer noopener" tabIndex={0}>
                    <img className="Art-image" src={imageUrl} alt={title} />
                    <figcaption className="Art-caption">
                        {`${titleInfo}${yearInfo}`}
                        <br />
                        {artists && <Artists artists={artists} />}
                        {medium}
                        <br />
                    </figcaption>
                </a>
            </figure>
            {colorCircles}
        </div>
    );
}

export { ArtFocus, ArtList };
