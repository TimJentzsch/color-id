import type { Rgb } from 'culori';
import type { Cmyk } from './types';

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
