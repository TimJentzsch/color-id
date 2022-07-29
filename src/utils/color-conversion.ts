import type { Rgb, Color as CuloriColor } from 'culori';
import type { Cmyk, Color } from './types';

/**
 * Converts a color to a culori color.
 *
 * This converts types that culori doesn't know about to RGB.
 * Otherwise it's a no-op.
 */
export function colorToCulori(color: Color): CuloriColor {
	const mode = color.mode;

	switch (mode) {
		case 'cmyk':
			return cymkToRgb(color);
		default:
			return color;
	}
}

/** Converts an RGB color to a CYMK color. */
export function rgbToCmyk(rgb: Rgb): Cmyk {
	const { r, g, b, alpha } = rgb;

	const k = 1 - Math.max(r, g, b);
	const invK = 1 - k;
	const c = k === 1 ? 0 : (invK - r) / invK;
	const m = k === 1 ? 0 : (invK - g) / invK;
	const y = k === 1 ? 0 : (invK - b) / invK;

	return {
		mode: 'cmyk',
		c,
		m,
		y,
		k,
		alpha
	};
}

/** Converts a CYMK color to an RGB color. */
export function cymkToRgb(cymk: Cmyk): Rgb {
	const { c, y, m, k, alpha } = cymk;
	const invK = 1 - k;
	const r = (1 - c) * invK;
	const g = (1 - m) * invK;
	const b = (1 - y) * invK;

	return {
		mode: 'rgb',
		r,
		g,
		b,
		alpha
	};
}
