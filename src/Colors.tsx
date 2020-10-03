import React, { MouseEvent } from 'react';
import './Colors.css';
import { ArtObject } from './Art';

export type HandleClickFn = (artList: ArtObject[]) => void;

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

export type ArtColor = {
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

type ColorCircleProps = {
    color: string,
    css3: string,
    handleClick: HandleClickFn
};

function ColorCircle(props: ColorCircleProps) {
    const { color } = props;

    function handleMouseOver(event: MouseEvent) {
        event.preventDefault();
    }

    async function handleClick(event: MouseEvent) {
        event.preventDefault();

        const res = await fetch('/result', {
            method: 'POST',
            cache: 'no-cache',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(color)
        });
        const artList = await res.json()
        props.handleClick(artList)
    }

    const colorCircleStyle = {
        backgroundColor: color,
    }

    return (
        <span key={color}
            title={color}
            tabIndex={0}
            style={colorCircleStyle}
            className="Color-circle"
            onMouseOver={handleMouseOver}
            onClick={handleClick}>
        </span>
    )
}

type ColorListProps = {
    colors: ArtColor[],
    handleClick: HandleClickFn
};

function ColorList(props: ColorListProps) {
    const { colors } = props;

    return (
        <figure className="Color-list">
            {colors.map((colorObj) => {
                const { color, css3 } = colorObj;
                return <ColorCircle key={color} color={color} css3={css3} handleClick={props.handleClick} />
            })}
        </figure>
    )
}

export {
    ColorList
};