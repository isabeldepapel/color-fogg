import React, { useEffect, useState } from 'react';
import './Art.css';
const R = require('ramda')

function Artists(props) {
    const { artists } = props;
    return (
        <div>
            {artists.map((artist) => {
                const { displayname, displaydate, culture, personid } = artist;
                return <p key={personid}>{`${displayname} (${culture}), ${displaydate}`}</p>
            })}
        </div>
    )
}

function ArtList(props) {
    const { artList } = props;
    console.log(typeof artList);
    console.log('In Art, art list', artList);

    return (
        <div className="Artlist">
            {artList.map((artObject) => {
                const { objectid } = artObject;
                return <ArtObject key={objectid} objectInfo={artObject}/>
            })}
        </div>
    )
}

function ArtObject(props) {
    const { objectInfo } = props;
    const { primaryimageurl: url, title } = objectInfo;

    return (
        <figure className="Art">
            <img className="Art-image" src={url} alt={title}></img>
        </figure>
    );
}

function ArtFocus(props) {
    const { objectInfo} = props;
    const { people: artists, title, dated: year, primaryimageurl: url, technique: medium } = objectInfo;

    console.log('Art focus', JSON.stringify(objectInfo));
    if (R.isNil(title)) {
        return null;
    }
    return (
        <figure className="Art">
            <img className="Art-image" src={url} alt={title}></img>
            <figcaption className="Art-caption">
                {`${title}, ${year}`}<br />
                { R.isNil(artists) ? null : <Artists artists={artists} />}
                {medium}<br />
            </figcaption>
        </figure>
    )
}

export { ArtFocus, ArtList };
