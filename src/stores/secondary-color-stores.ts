import { colorToCulori, rgbToCmyk } from '$utils/color-conversion';
import { parseColor } from '$utils/color-parsing';
import type { Color } from '$utils/types';
import { derived, writable, type Readable, type Writable } from 'svelte/store';
import { hsl, hsv, rgb, type Color as CuloriColor } from 'culori';

/**
 * The input name of the color.
 *
 * This MUST be a valid color representation!
 * This can also be "auto" to calculate a fitting color automatically.
 */
export const secColorName: Writable<string> = writable('auto');

export const secColor: Readable<Color> = derived(secColorName, ($secColorName) => {
	let colorName = $secColorName;

	// Automatically select a color for good contrast
	if (colorName === 'auto') {
		// TODO: Do this properly
		colorName = 'black';
	}

	const parsedColor = parseColor(colorName);

	if (parsedColor === undefined) {
		throw Error(`Color name "${$secColorName}" is not valid!`);
	}

	return parsedColor;
});

export const secCuloriColor: Readable<CuloriColor> = derived(secColor, ($secColor) => {
	return colorToCulori($secColor);
});

// Color representations
export const secRgbColor = derived(secCuloriColor, ($secCuloriColor) => rgb($secCuloriColor));
export const secHslColor = derived(secCuloriColor, ($secCuloriColor) => hsl($secCuloriColor));
export const secHsvColor = derived(secCuloriColor, ($secCuloriColor) => hsv($secCuloriColor));
export const secCmykColor = derived(secRgbColor, ($rgbColor) => rgbToCmyk($rgbColor));
