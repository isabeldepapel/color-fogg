import React from 'react';
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

enum Hues {
    'Red',
    'Orange',
    'Yellow',
    'Green',
    'Blue',
    'Violet',
    'Brown',
    'Grey',
    'Black',
    'White'
};

type ArtColor = {
    /** CSS hex color code */
    color: string;
    /** Closest match to the Fogg's design color spectrum (hex code)  */
    spectrum: string;
    /** Color hex code mapped to the name of a hue. One of:
     * Red, Orange, Yellow, Green, Blue, Violet, Brown, Grey, Black, White */
    hue: keyof typeof Hues;
    /** Amount of the color found in the image. Decimal value between 0 and 1 */
    percent: number;
    /** Closest match to the colors in the CSS3 color module specfication */
    css3: string;
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

type ArtObjectProps = {
    objectInfo: ArtObject;
};

export type ArtListProps = {
    artList: ArtObject[];
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
    console.log(typeof artList);
    console.log('In Art, art list', artList);

    return (
        <div className="Artlist">
            {artList.map((artObject) => {
                const { objectid } = artObject;
                return <ArtObject key={objectid} objectInfo={artObject} />
            })}
        </div>
    )
}

function ArtObject(props: ArtObjectProps) {
    const { objectInfo } = props;
    const { primaryimageurl: url, title } = objectInfo;

    return (
        <figure className="Art">
            <img className="Art-image" src={url} alt={title}></img>
        </figure>
    );
}

function ArtFocus(props: ArtObjectProps) {
    const { objectInfo } = props;
    const { people: artists, title, dated: year, primaryimageurl: url, technique: medium } = objectInfo;

    console.log('Art focus', JSON.stringify(objectInfo));
    if (!title) {
        return null;
    }

    return (
        <figure className="Art">
            <img className="Art-image" src={url} alt={title}></img>
            <figcaption className="Art-caption">
                {`${title}, ${year}`}<br />
                {artists && <Artists artists={artists} />}
                {medium}<br />
            </figcaption>
        </figure>
    )
}

export { ArtFocus, ArtList };
