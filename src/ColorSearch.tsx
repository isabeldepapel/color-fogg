import React from 'react';
import { ChromePicker } from 'react-color';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { createRequest, HandleClickFn } from './Colors';

const DEFAULT_COLOR = '#646464';

type Color = {
	hex: string;
};

type ColorPickerProps = {
	pickedColor: (background: string) => void;
};

type ColorPickerState = {
	background: string
};

type GetArtProps = {
	pickedColor: string;
	handleClick: HandleClickFn
};

type GetArtLinkProps = {
    location: {
        state: GetArtProps
    }
}

type ColorSearchProps = {
    pickedColor: string;
    setPickedColor: React.Dispatch<React.SetStateAction<string>>;
    handleClick: HandleClickFn;
}

type GetArtLocationState = {
    getArtProps: GetArtProps
}

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

function GetArt(props: any) { // TODO: fix typing
    console.log('location', useLocation());
    const history = useHistory();
    // const location = useLocation<GetArtLocationState>();
    // console.log('location', location);
    // const { getArtProps } = location.state;
    // // const { getArtProps } = props.location.state;
    const { pickedColor } = props;
    const urlEncodedColor = encodeURIComponent(pickedColor);
    // console.log('encoded color', urlEncodedColor);

	async function handleClick() {
        console.log('handling click');
		const res = await fetch(createRequest(urlEncodedColor));

		try {
			const artList = await res.json()
			console.log('current art list', artList);
            props.handleClick(artList);
            history.push(`/images?color=${urlEncodedColor}`);
		} catch (err) {
			// TODO: actual error handling
			console.log(err);
		}
	}

	return (
		<button className="color-button" onClick={handleClick}>
			Search
		</button>
	)
}



function ColorSearch(props: ColorSearchProps) {
    const { pickedColor, setPickedColor, handleClick } = props;
    console.log('color search props', props);
    const getArtProps: GetArtProps = { pickedColor, handleClick };
    console.log('get art props', getArtProps);
    // const queryParams = new URLSearchParams(useLocation().search);
	// const color = queryParams.get('color');
	// const path = `/images?color=${color}`;

    return (
        <div className="color-container">
            <ChromeColorPicker pickedColor={(pickedColor: string) => { setPickedColor(pickedColor) }} />
            <GetArt pickedColor={pickedColor} handleClick={handleClick} />
        </div>

    )
}

export default ColorSearch;