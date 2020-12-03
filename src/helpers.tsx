/**
 * Two types of helpers in this file:
 *
 * 1. Helper functions accessed by several modules
 * 2. Types that need to be accessed by several modules to avoid circular depenencies.
 *    E.g. The Art module has a dependency on the Colors module. However, the Colors module
 *    also needs to know about the ArtList type, so even though type ArtList might make more
 *    sense in the Art module, it's been put here so it can be accessed by both modules.
 */

const APP_URL = process.env.REACT_APP_URL;

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
    'White',
}

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

export type Artist = {
    personid: number;
    displayname: string;
    displaydate?: number;
    culture?: string;
};

export type ArtObject = {
    objectid: number;
    /** Url of the image to display */
    primaryimageurl: string;
    title?: string;
    people?: Artist[];
    dated?: number;
    technique?: string;
    colors: ArtColor[];
    /** Url of the object itself (not just image) */
    url: string;
};

export type HandleClickFn = (artList: ArtObject[]) => void;

function createRequest(color: string): Request {
    const url = new URL('/api/images', APP_URL);
    url.search = new URLSearchParams({ color }).toString();

    const request = new Request(url.toString(), {
        method: 'GET',
        cache: 'no-cache',
        headers: { 'content-type': 'application/json' },
    });
    return request;
}

export { createRequest };
