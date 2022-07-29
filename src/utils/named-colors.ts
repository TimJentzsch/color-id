import {
	colorsNamed,
	differenceCiede2000,
	lab65,
	nearest,
	parse,
	rgb,
	type Color as CuloriColor
} from 'culori';
import type { NamedColor } from './types';

const NAMED_COLORS: NamedColor[] = Object.entries(colorsNamed)
	// Exclude duplicate colors
	.filter(([name]) => !name.includes('gray'))
	.map(([name, hexNum]) => {
		const hex = '#' + hexNum.toString(16).padStart(6, '0');
		const color = parse(hex);

		if (color === undefined) {
			throw Error(`Failed to parse named color ${name} with hex ${hex}!`);
		}

		const rgbColor = rgb(color);
		const lab65Color = lab65(rgbColor);

		return {
			name,
			rgb: rgbColor,
			lab65: lab65Color,
			hex
		};
	});

const getNearest = nearest(NAMED_COLORS, differenceCiede2000(), (c) => c.lab65);

export function getClosestNamedColors(color: CuloriColor): NamedColor[] {
	return getNearest(color, 8);
}
