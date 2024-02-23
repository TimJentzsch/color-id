import type { Hsl, Hsv, Rgb } from 'culori';
import type { Cmyk } from './types';

function percentageValues(a: number, b: number, c: number, d?: number): string {
	const aPerc = Math.round(a * 100);
	const bPerc = Math.round(b * 100);
	const cPerc = Math.round(c * 100);
	const dPerc = d ? Math.round(d * 100) : undefined;

	if (dPerc === undefined) {
		return `${aPerc}%, ${bPerc}%, ${cPerc}%`;
	}

	return `${aPerc}%, ${bPerc}%, ${cPerc}%, ${dPerc}`;
}

export function rgbName({ r, g, b }: Rgb): string {
	return `rgb(${percentageValues(r, g, b)})`;
}

export function hslName({ h, s, l }: Hsl): string {
	return `hsl(${percentageValues(h ?? 0, s, l)})`;
}

export function hsvName({ h, s, v }: Hsv): string {
	return `hsv(${percentageValues(h ?? 0, s, v)})`;
}

export function cymkName({ c, y, m, k }: Cmyk): string {
	return `cymk(${percentageValues(c, y, m, k)})`;
}
