import { colorToCulori, rgbToCmyk } from '#utils/color-conversion.js';
import { parseColor } from '#utils/color-parsing.js';
import { getClosestNamedColors } from '#utils/named-colors.js';
import type { Color } from '#utils/types.js';
import { extractUrlQueryParamColorName, updateUrlQueryParams } from '#utils/url-utils.js';
import {
	clampRgb,
	formatHex,
	hsl,
	hsv,
	oklab,
	oklch,
	random,
	rgb,
	type Color as CuloriColor,
	type Hsl
} from 'culori';
import { derived, writable, type Readable, type Writable } from 'svelte/store';

/**
 * A writable store whose `set` can optionally skip updating the URL query parameter.
 */
export interface ColorNameStore extends Readable<string> {
	set(value: string, updateUrl?: boolean): void;
	update: Writable<string>['update'];
}

function createColorName(): ColorNameStore {
	const { subscribe, set, update } = writable(
		extractUrlQueryParamColorName('color') || formatHex(random())
	);

	function newSet(value: string, updateUrl = true) {
		if (updateUrl) {
			updateUrlQueryParams({ color: value });
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
 */
export const colorName = createColorName();

export const color: Readable<Color> = derived(colorName, ($colorName) => {
	const parsedColor = parseColor($colorName);

	if (parsedColor === undefined) {
		throw Error(`Color name "${$colorName}" is not valid!`);
	}

	return parsedColor;
});

export const culoriColor: Readable<CuloriColor> = derived(color, ($color) => colorToCulori($color));

// Color representations
/**
 * The color clipped to the sRGB gamut.
 *
 * Oklab and Oklch can describe colors outside of sRGB, so the sRGB-based representations
 * show the closest displayable color instead.
 */
export const rgbColor = derived(culoriColor, ($culoriColor) => clampRgb(rgb($culoriColor)));
export const hslColor = derived(rgbColor, ($rgbColor) => hsl($rgbColor));
export const hsvColor = derived(rgbColor, ($rgbColor) => hsv($rgbColor));
export const oklabColor = derived(culoriColor, ($culoriColor) => oklab($culoriColor));
export const oklchColor = derived(culoriColor, ($culoriColor) => oklch($culoriColor));
export const cmykColor = derived(rgbColor, ($rgbColor) => rgbToCmyk($rgbColor));

// Hex color name
export const colorHex = derived(rgbColor, ($rgbColor) => formatHex($rgbColor));

// Similar CSS colors
export const similarNamedColors = derived(rgbColor, ($rgbColor) =>
	getClosestNamedColors($rgbColor)
);

// Theme colors
export const darkThemeColor: Readable<Hsl> = derived(hslColor, ($hslColor) => {
	const threshold = 0.8;

	return {
		...$hslColor,
		l: $hslColor.l < threshold ? threshold : $hslColor.l
	};
});
export const lightThemeColor: Readable<Hsl> = derived(hslColor, ($hslColor) => {
	const threshold = 0.38;

	return {
		...$hslColor,
		l: $hslColor.l > threshold ? threshold : $hslColor.l
	};
});

// Theme color hex strings
export const darkThemeHex = derived(darkThemeColor, ($darkThemeColor) =>
	formatHex($darkThemeColor)
);
export const lightThemeHex = derived(lightThemeColor, ($lightThemeColor) =>
	formatHex($lightThemeColor)
);
