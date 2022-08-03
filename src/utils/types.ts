import type { Color as CuloriColor, Lab65, Rgb } from 'culori';

export interface Cmyk {
	mode: 'cmyk';
	c: number;
	m: number;
	y: number;
	k: number;
	alpha?: number;
}

export type Color = CuloriColor | Cmyk;

export type HueUnit = 'deg' | 'rad' | 'grad' | 'turn';

export interface NamedColor {
	name: string;
	rgb: Rgb;
	lab65: Lab65;
	hex: string;
}
