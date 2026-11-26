import type { Oklch } from 'culori';
import { capitalize } from './string-utils';

/** A named color that other colors are described relative to. */
interface ReferenceColor {
	name: string;
	/** Oklch lightness, 0 to 1. */
	l: number;
	/** Oklch chroma, roughly 0 to 0.37. */
	c: number;
	/** Oklch hue in degrees. */
	h: number;
}

/**
 * The colors used as basis for the description.
 *
 * Every color gets described as the closest reference plus modifiers for the difference.
 * Besides the pure hues, it contains names that only fit a certain lightness or chroma
 * (e.g. brown is a dark, muted orange).
 */
const REFERENCE_COLORS: ReferenceColor[] = [
	// Pure hues
	{ name: 'red', l: 0.6, c: 0.23, h: 27 },
	{ name: 'orange', l: 0.76, c: 0.18, h: 62 },
	{ name: 'yellow', l: 0.93, c: 0.19, h: 105 },
	{ name: 'lime', l: 0.88, c: 0.24, h: 128 },
	{ name: 'green', l: 0.7, c: 0.22, h: 145 },
	{ name: 'turquoise', l: 0.8, c: 0.14, h: 178 },
	{ name: 'cyan', l: 0.88, c: 0.15, h: 200 },
	{ name: 'sky blue', l: 0.78, c: 0.13, h: 232 },
	{ name: 'blue', l: 0.5, c: 0.27, h: 264 },
	{ name: 'purple', l: 0.5, c: 0.24, h: 302 },
	{ name: 'magenta', l: 0.7, c: 0.26, h: 330 },
	{ name: 'pink', l: 0.76, c: 0.16, h: 355 },
	// Names tied to a specific lightness or chroma
	{ name: 'maroon', l: 0.38, c: 0.14, h: 25 },
	{ name: 'brown', l: 0.45, c: 0.1, h: 55 },
	{ name: 'gold', l: 0.8, c: 0.16, h: 88 },
	{ name: 'olive', l: 0.55, c: 0.12, h: 110 },
	{ name: 'teal', l: 0.55, c: 0.1, h: 195 },
	{ name: 'navy', l: 0.3, c: 0.17, h: 266 },
	// Dark magenta is commonly called purple
	{ name: 'purple', l: 0.42, c: 0.19, h: 328 },
	{ name: 'beige', l: 0.92, c: 0.045, h: 85 },
	{ name: 'lavender', l: 0.8, c: 0.08, h: 300 }
];

/** Below this chroma, a color is described as a grey. */
const ACHROMATIC_CHROMA = 0.025;

/** Grey names with the maximum lightness they apply to. */
const GREYS: [number, string][] = [
	[0.2, 'black'],
	[0.45, 'dark grey'],
	[0.7, 'grey'],
	[0.93, 'light grey'],
	[1, 'white']
];

/** How strongly chroma and hue differences count compared to lightness differences. */
const CHROMA_WEIGHT = 1;
const HUE_WEIGHT = 2;
/**
 * Chroma at which the hue difference counts fully.
 * Below it, the hue matters less, as it's barely visible.
 */
const FULL_HUE_CHROMA = 0.05;

/** Lightness modifiers with the minimum lightness difference to the reference. */
const LIGHTER: [number, string][] = [
	[0.2, 'very light'],
	[0.1, 'light']
];
const DARKER: [number, string][] = [
	[0.2, 'very dark'],
	[0.1, 'dark']
];

/** Chroma ratios to the reference, below which the color is less colorful. */
const GREYISH_RATIO = 0.4;
const MUTED_RATIO = 0.7;
/** Chroma ratio to the reference, above which the color is more colorful. */
const VIVID_RATIO = 1.5;

/**
 * Distance between the color and a reference.
 *
 * The hue is compared by angle rather than by position in the color space,
 * so that a muted color still gets matched to the reference of its hue.
 */
function referenceDistance(color: ReferenceColor, ref: ReferenceColor): number {
	const hueAngle = Math.abs(color.h - ref.h) % 360;
	const hueDiff = Math.min(hueAngle, 360 - hueAngle) / 180;
	const hueVisibility = Math.min(1, color.c / FULL_HUE_CHROMA);

	return Math.hypot(
		color.l - ref.l,
		CHROMA_WEIGHT * (color.c - ref.c),
		HUE_WEIGHT * hueDiff * hueVisibility
	);
}

function getClosestReference(color: ReferenceColor): ReferenceColor {
	let closest = REFERENCE_COLORS[0];
	let closestDistance = Infinity;

	for (const ref of REFERENCE_COLORS) {
		const distance = referenceDistance(color, ref);

		if (distance < closestDistance) {
			closest = ref;
			closestDistance = distance;
		}
	}

	return closest;
}

function getGreyName(l: number): string {
	return GREYS.find(([maxL]) => l <= maxL)?.[1] ?? 'white';
}

function getLightnessModifier(l: number, ref: ReferenceColor): string | undefined {
	const diff = l - ref.l;
	const steps = diff >= 0 ? LIGHTER : DARKER;
	return steps.find(([minDiff]) => Math.abs(diff) >= minDiff)?.[1];
}

function getChromaModifier(c: number, ref: ReferenceColor): string | undefined {
	const ratio = c / ref.c;

	if (ratio < GREYISH_RATIO) {
		return 'greyish';
	} else if (ratio < MUTED_RATIO) {
		return 'muted';
	} else if (ratio > VIVID_RATIO) {
		return 'vivid';
	}
}

/** Describe the color in human-readable form, e.g. "Light muted blue". */
export function getColorDescription(color: Oklch): string {
	const { l, c, h } = color;

	if (c < ACHROMATIC_CHROMA || h === undefined) {
		return capitalize(getGreyName(l));
	}

	const ref = getClosestReference({ name: '', l, c, h });

	let lightness = getLightnessModifier(l, ref);
	let chroma = getChromaModifier(c, ref);

	// Light colors with little chroma look pale rather than greyish
	if (chroma === 'greyish' && l >= ref.l) {
		lightness = lightness === 'very light' ? 'very pale' : 'pale';
		chroma = undefined;
	}

	const words = [lightness, chroma, ref.name].filter((word) => word !== undefined);

	return capitalize(words.join(' '));
}
