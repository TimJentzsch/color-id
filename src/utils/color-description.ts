import type { Hsl, Hsv } from 'culori';
import { capitalize } from './string-utils';

const HUE_NAMES: [number, string][] = [
	[23, 'red'],
	[47, 'orange'],
	[63, 'yellow'],
	[141, 'green'],
	[193, 'turquoise'],
	[240, 'blue'],
	[327, 'purple'],
	[360, 'red']
];

export function getColorDescription(hsl: Hsl, hsv: Hsv): string {
	const { h, s, v } = hsv;
	const { l } = hsl;

	// Greys
	if (s <= 0.1 || v <= 0.2 || h === undefined) {
		if (v <= 0.1) {
			return 'Black';
		} else if (v <= 0.3) {
			return 'Dark grey';
		} else if (v <= 0.7) {
			return 'Grey';
		} else if (v <= 0.9) {
			return 'Light grey';
		} else {
			return 'White';
		}
	}

	let hueName = 'unknown';

	// Find the name for the hue
	for (const [curHue, curName] of HUE_NAMES) {
		if (curHue >= h) {
			hueName = curName;
			break;
		}
	}

	let lightness = '';

	if (l <= 0.2) {
		if (hueName === 'orange') {
			hueName = 'brown';
			lightness = 'dark';
		} else if (hueName === 'turquoise') {
			hueName = 'teal';
			lightness = 'dark';
		} else {
			lightness = 'very dark';
		}
	} else if (l <= 0.4) {
		if (hueName === 'orange') {
			hueName = 'brown';
		} else if (hueName === 'turquoise') {
			hueName = 'teal';
		} else {
			lightness = 'dark';
		}
	} else if (l >= 0.8) {
		lightness = 'very light';
	} else if (l >= 0.6) {
		lightness = 'light';
	}

	let saturation = '';

	if (hsl.s <= 0.5) {
		saturation = 'pale ';
	}

	return capitalize(`${saturation}${lightness} ${hueName}`.trim());
}
