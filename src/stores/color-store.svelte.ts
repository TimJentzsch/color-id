import { colorToCulori, rgbToCmyk } from '$utils/color-conversion';
import { parseColor } from '$utils/color-parsing';
import type { Cmyk } from '$utils/types';
import { hsl, hsv, rgb, type Hsl, type Rgb, type Hsv, formatHex } from 'culori';

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

export function createColorStore(initialName: string) {
	let name = $state(initialName);

	// Internal color representation
	let color = $derived.by(() => {
		const parsedColor = parseColor(name);

		if (parsedColor === undefined) {
			throw Error(`Color name "${name}" is not valid!`);
		}

		return parsedColor;
	});

	// A color that culori can deal with
	let culoriColor = $derived(colorToCulori(color));

	// The different color representations
	let rgbColor = $derived(rgb(culoriColor));
	let hslColor = $derived(hsl(culoriColor));
	let hsvColor = $derived(hsv(culoriColor));
	let cymkColor = $derived(rgbToCmyk(rgbColor));

	// Theme colors
	let darkThemeHex = $derived.by(() => {
		const threshold = 0.8;

		const darkColor = {
			...hslColor,
			l: hslColor.l < threshold ? threshold : hslColor.l
		};

		return formatHex(darkColor);
	});
	let lightThemeHex = $derived.by(() => {
		const threshold = 0.38;

		const lightColor = {
			...hslColor,
			l: hslColor.l > threshold ? threshold : hslColor.l
		};

		return formatHex(lightColor);
	});

	return {
		get name() {
			return name;
		},
		set name(value: string) {
			name = value;
		},

		get hex() {
			return formatHex(rgbColor);
		},

		get rgb() {
			return rgbColor;
		},
		set rbg({ r, g, b }: Rgb) {
			name = `rgb(${percentageValues(r, g, b)})`;
		},

		get hsl() {
			return hslColor;
		},
		set hsl({ h, s, l }: Hsl) {
			name = `hsl(${percentageValues(h ?? 0, s, l)})`;
		},

		get hsv() {
			return hsvColor;
		},
		set hsv({ h, s, v }: Hsv) {
			name = `hsv(${percentageValues(h ?? 0, s, v)})`;
		},

		get cymk() {
			return cymkColor;
		},
		set cymk({ c, y, m, k }: Cmyk) {
			name = `cymk(${percentageValues(c, y, m, k)})`;
		},

		get darkThemeHex() {
			return darkThemeHex;
		},
		get lightThemeHex() {
			return lightThemeHex;
		}
	};
}
