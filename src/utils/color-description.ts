import type { Hsl, Hsv } from 'culori';

const HUE_NAMES: [number, string][] = [
	[0, 'red'],
	[39, 'orange'],
	[60, 'yellow'],
	[120, 'green'],
	[180, 'cyan'],
	[240, 'blue'],
	[300, 'purple'],
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
	let hueDistance = Number.MAX_VALUE;

	for (const [curHue, curName] of HUE_NAMES) {
		const distance = Math.abs(curHue - h);

		if (distance < hueDistance) {
			hueName = curName;
			hueDistance = distance;
		}
	}

	let lightness = '';

	if (l <= 0.2) {
		lightness = 'Very dark';
	} else if (l <= 0.4) {
		lightness = 'Dark';
	} else if (l >= 0.8) {
		lightness = 'Very light';
	} else if (l >= 0.6) {
		lightness = 'Light';
	}

	return `${lightness} ${hueName}`;
}
