import type { Color as CuloriColor } from 'culori';

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
