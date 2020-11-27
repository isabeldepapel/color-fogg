import React from 'react';
import { ChromePicker } from 'react-color';
import { Link, useLocation } from 'react-router-dom';
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

type ColorSearchProps = {
    pickedColor: string;
    setPickedColor: React.Dispatch<React.SetStateAction<string>>;
    handleClick: HandleClickFn;
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
    const { getArtProps } = props.location.state;
    const { pickedColor } = getArtProps;

	async function handleClick() {
		const res = await fetch(createRequest(pickedColor));

		try {
			const artList = await res.json()
			console.log('current art list', artList);
			getArtProps.handleClick(artList);
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
    const getArtProps: GetArtProps = { pickedColor, handleClick };
    // const queryParams = new URLSearchParams(useLocation().search);
	// const color = queryParams.get('color');
	// const path = `/images?color=${color}`;

    return (
        <div className="color-container">
            <ChromeColorPicker pickedColor={(pickedColor: string) => { setPickedColor(pickedColor) }} />
            <Link 
                to={{
                    pathname: '/images',
                    search: `?color=${pickedColor}`,
                    state: { getArtProps }
                }}
                component={GetArt}
            />
            {/* <GetArt pickedColor={pickedColor} handleClick={handleClick} /> */}
        </div>

    )
}

export default ColorSearch;