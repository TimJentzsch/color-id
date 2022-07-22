import { colorToCulori, rgbToCmyk } from '$utils/color-conversion';
import { getColorDescription } from '$utils/color-description';
import { parseColor } from '$utils/color-parsing';
import { getClosestNamedColors } from '$utils/named-colors';
import type { Color } from '$utils/types';
import { formatHex, hsl, hsv, random, rgb, type Color as CuloriColor, type Hsl } from 'culori';
import { derived, writable, type Readable, type Writable } from 'svelte/store';

/**
 * The input name of the color.
 *
 * This MUST be a valid color representation!
 */
export const colorName: Writable<string> = writable(formatHex(random()));

export const color: Readable<Color> = derived(colorName, ($colorName) => {
	const parsedColor = parseColor($colorName);

	if (parsedColor === undefined) {
		throw Error(`Color name "${$colorName}" is not valid!`);
	}

	return parsedColor;
});

export const culoriColor: Readable<CuloriColor> = derived(color, ($color) => colorToCulori($color));

// Color representations
export const rgbColor = derived(culoriColor, ($culoriColor) => rgb($culoriColor));
export const hslColor = derived(culoriColor, ($culoriColor) => hsl($culoriColor));
export const hsvColor = derived(culoriColor, ($culoriColor) => hsv($culoriColor));
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
