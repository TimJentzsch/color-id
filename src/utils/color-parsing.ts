import { parse } from 'culori';
import { parseHsv } from './parse-hsv';
import type { Color } from './types';

/** Try to parse the given color string. */
export function parseColor(color: string): Color | undefined {
	// First, see if culori can figure it out
	const culoriColor = parse(color);

	if (culoriColor !== undefined) {
		return culoriColor;
	}

	const hsvColor = parseHsv(color);

	if (hsvColor !== undefined) {
		return hsvColor;
	}

	// Could not parse the color
	return undefined;
}
