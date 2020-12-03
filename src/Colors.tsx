import React, { MouseEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { ArtColor, ArtObject, createRequest, HandleClickFn } from './helpers';
import './style/Colors.css';

type ColorCircleProps = {
    color: string;
    handleClick: HandleClickFn;
};

function ColorCircle(props: ColorCircleProps): JSX.Element {
    const history = useHistory();
    const { color } = props;
    const urlEncodedColor = encodeURIComponent(color);

    async function handleClick(event: MouseEvent) {
        event.preventDefault();

        const res = await fetch(createRequest(urlEncodedColor));
        const artList = (await res.json()) as ArtObject[];
        props.handleClick(artList);
        history.push(`/images?color=${urlEncodedColor}`);
        sessionStorage.setItem(color, JSON.stringify(artList));
    }

    const colorCircleStyle = {
        backgroundColor: color,
    };

    return (
        <button
            key={color}
            type="button"
            aria-label="Search color"
            title={color}
            tabIndex={0}
            style={colorCircleStyle}
            className="Color-circle"
            onClick={handleClick}
        />
    );
}

type ColorListProps = {
    colors: ArtColor[];
    handleClick: HandleClickFn;
};

function ColorList(props: ColorListProps): JSX.Element {
    const { colors } = props;

    return (
        <figure className="Color-list">
            {colors.map((colorObj) => {
                const { color } = colorObj;
                return <ColorCircle key={color} color={color} handleClick={props.handleClick} />;
            })}
        </figure>
    );
}

type SuggestedColorsProps = {
    numResults: number | undefined;
    handleClick: HandleClickFn;
};

function SuggestedColors(props: SuggestedColorsProps): JSX.Element {
    const suggestedColors: string[] = [
        '#af0019', // red
        '#c86432', // orange
        '#c8af32', // yellow
        '#00644b', // green
        '#19327d', // blue
        '#641964', // purple
        '#96644b', // brown
        '#646464', // grey
        '#000000', // black
    ];

    const noResultsMessage = '0 results. Choose again?';
    const { numResults } = props;

    return (
        <div className="Color-suggestion">
            <div className="message">
                {numResults === 0 && <p>{noResultsMessage}</p>}
                <p>Some suggestions</p>
            </div>
            <figure className="Color-list">
                {suggestedColors.map((color) => (
                    <ColorCircle key={color} color={color} handleClick={props.handleClick} />
                ))}
            </figure>
        </div>
    );
}

export { ColorList, SuggestedColors };
