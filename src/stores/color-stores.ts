import { rgbToCmyk } from '$utils/color-conversion';
import { formatHex, hsl, hsv, parse, random, rgb, type Color, type Hsl } from 'culori';
import { derived, writable, type Readable, type Writable } from 'svelte/store';

/** The input name of the color.
 *
 * This MUST be a valid color representation!
 */
export const colorName: Writable<string> = writable(formatHex(random()));

export const color: Readable<Color> = derived(colorName, ($colorName) => {
	const parsedColor = parse($colorName);

	if (parsedColor === undefined) {
		throw Error('Color name is not valid!');
	}

	return parsedColor;
});

// Color representations
export const rgbColor = derived(color, ($color) => rgb($color));
export const hslColor = derived(color, ($color) => hsl($color));
export const hsvColor = derived(color, ($color) => hsv($color));
export const cmykColor = derived(rgbColor, ($rgbColor) => rgbToCmyk($rgbColor));

// Hex color name
export const colorHex = derived(rgbColor, ($rgbColor) => formatHex($rgbColor));

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
