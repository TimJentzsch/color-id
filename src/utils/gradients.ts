/**
 * Builds a left-to-right CSS gradient by sampling a channel across its range.
 *
 * `colorAt` gets each sampled channel value and returns the CSS color for it,
 * usually the current color with only that channel changed.
 * Sampling many stops keeps hue sweeps and non-linear channels (e.g. HSV) accurate,
 * independent of the space the browser interpolates in between stops.
 */
export function channelGradient(
	min: number,
	max: number,
	colorAt: (value: number) => string,
	stops = 13
): string {
	const colors = Array.from({ length: stops }, (_, index) =>
		colorAt(min + ((max - min) * index) / (stops - 1))
	);

	return `linear-gradient(to right, ${colors.join(', ')})`;
}
