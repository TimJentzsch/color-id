// Adapted from culori
// See <https://github.com/Evercoder/culori/blob/441e792f1266cba1337b159fd3e439e231c69235/src/hsl/parseHsl.js>
import type { Hsv } from 'culori';
import hueToDeg from './parse-hue';
import { c, hue, hue_none, num_per, num_per_none, per, per_none, s } from './parser-regex';
import type { HueUnit } from './types';

const hsv_old = new RegExp(
	`^hsva?\\(\\s*${hue}${c}${per}${c}${per}\\s*(?:,\\s*${num_per}\\s*)?\\)$`
);
const hsv_new = new RegExp(
	`^hsva?\\(\\s*${hue_none}${s}${per_none}${s}${per_none}\\s*(?:\\/\\s*${num_per_none}\\s*)?\\)$`
);

/** Try to parse the given color string as HSV. */
export function parseHsv(color: string): Hsv | undefined {
	const match = color.match(hsv_old) || color.match(hsv_new);

	if (!match) {
		return undefined;
	}

	let h;

	if (match[3] !== undefined) {
		h = Number(match[3]);
	} else if (match[1] !== undefined && match[2] !== undefined) {
		h = hueToDeg(Number(match[1]), match[2] as HueUnit);
	}

	const s = Math.min(Math.max(0, Number(match[4]) / 100), 1);
	const v = Math.min(Math.max(0, Number(match[5]) / 100), 1);

	let alpha: number | undefined = undefined;

	if (match[6] !== undefined) {
		alpha = Number(match[6]) / 100;
	} else if (match[7] !== undefined) {
		alpha = Number(match[7]);
	}

	return {
		mode: 'hsv',
		h,
		s,
		v,
		alpha
	};
}
