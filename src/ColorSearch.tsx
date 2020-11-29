import React from 'react';
import { ChromePicker } from 'react-color';
import { useHistory } from 'react-router-dom';
import { ArtObject, HandleClickFn, createRequest } from './helpers';

const DEFAULT_COLOR = '#646464';

type Color = {
    hex: string;
};

type ColorPickerProps = {
    pickedColor: (background: string) => void;
};

type ColorPickerState = {
    background: string;
};

type GetArtProps = {
    pickedColor: string;
    handleClick: HandleClickFn;
};

type ColorSearchProps = {
    pickedColor: string;
    setPickedColor: React.Dispatch<React.SetStateAction<string>>;
    handleClick: HandleClickFn;
};

/**
 * This is a plugin and only works as a class component
 */
class ChromeColorPicker extends React.Component<ColorPickerProps, ColorPickerState> {
    /* eslint-disable react/state-in-constructor */
    state: ColorPickerState = {
        background: DEFAULT_COLOR,
    };
    /* eslint-enable react/state-in-constructor */

    handleChangeComplete = (color: Color) => {
        this.setState({ background: color.hex });
        const { background } = this.state;
        const { pickedColor } = this.props;
        pickedColor(background);
    };

    render() {
        const { background } = this.state;
        console.log('picked', background);

        return <ChromePicker color={background} onChangeComplete={this.handleChangeComplete} />;
    }
}

function GetArt(props: GetArtProps): JSX.Element {
    const history = useHistory();
    const { pickedColor } = props;
    const urlEncodedColor = encodeURIComponent(pickedColor);

    async function handleClick() {
        const res = await fetch(createRequest(urlEncodedColor));

        try {
            const artList = (await res.json()) as ArtObject[];
            props.handleClick(artList);
            history.push(`/images?color=${urlEncodedColor}`);
            sessionStorage.setItem(pickedColor, JSON.stringify(artList));
        } catch (err) {
            // TODO: actual error handling
            console.log(err);
        }
    }

    return (
        <button className="color-button" onClick={handleClick} type="submit">
            Search
        </button>
    );
}

function ColorSearch(props: ColorSearchProps): JSX.Element {
    const { pickedColor, setPickedColor, handleClick } = props;

    return (
        <div className="color-container">
            <ChromeColorPicker
                pickedColor={(color) => {
                    setPickedColor(color);
                }}
            />
            <GetArt pickedColor={pickedColor} handleClick={handleClick} />
        </div>
    );
}

export default ColorSearch;
