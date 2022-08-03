import { colorToCulori, rgbToCmyk } from '$utils/color-conversion';
import { parseColor } from '$utils/color-parsing';
import type { Color } from '$utils/types';
import { derived, writable, type Readable, type Writable } from 'svelte/store';
import { formatHex, hsl, hsv, rgb, wcagContrast, type Color as CuloriColor } from 'culori';
import { extractUrlQueryParamColorName, updateUrlQueryParams } from '$utils/url-utils';
import { hslColor } from './color-stores';

function createSecColorName(): Writable<string> {
	const { subscribe, set, update } = writable(extractUrlQueryParamColorName('secondary') || 'auto');

	function newSet(value: string, updateUrl = true) {
		if (updateUrl) {
			const secondary = value === 'auto' ? undefined : value;
			updateUrlQueryParams({ secondary });
		}
		set(value);
	}

	return {
		subscribe,
		set: newSet,
		update
	};
}

/**
 * The input name of the color.
 *
 * This MUST be a valid color representation!
 * This can also be "auto" to calculate a fitting color automatically.
 */
export const secColorName = createSecColorName();

export const secColor: Readable<Color> = derived(
	[secColorName, hslColor],
	([$secColorName, $hslColor]) => {
		let colorName = $secColorName;

		// Automatically select a color for good contrast
		if (colorName === 'auto') {
			const blackContrast = wcagContrast('black', $hslColor);
			const whiteContrast = wcagContrast('white', $hslColor);
			colorName = blackContrast >= whiteContrast ? 'black' : 'white';
		}

		const parsedColor = parseColor(colorName);

		if (parsedColor === undefined) {
			throw Error(`Color name "${$secColorName}" is not valid!`);
		}

		return parsedColor;
	}
);

export const secCuloriColor: Readable<CuloriColor> = derived(secColor, ($secColor) => {
	return colorToCulori($secColor);
});

// Color representations
export const secRgbColor = derived(secCuloriColor, ($secCuloriColor) => rgb($secCuloriColor));
export const secHslColor = derived(secCuloriColor, ($secCuloriColor) => hsl($secCuloriColor));
export const secHsvColor = derived(secCuloriColor, ($secCuloriColor) => hsv($secCuloriColor));
export const secCmykColor = derived(secRgbColor, ($rgbColor) => rgbToCmyk($rgbColor));

// Hex color name
export const secColorHex = derived(secRgbColor, ($secRgbColor) => formatHex($secRgbColor));
