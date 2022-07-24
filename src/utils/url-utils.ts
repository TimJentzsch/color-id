import { browser } from '$app/env';
import { parseColor } from './color-parsing';

export function setUrlHash(hash: string) {
	window.location.hash = hash;
}

export function setUrlQueryParams(params: Record<string, string | undefined>) {
	const query = Object.entries(params)
		.filter((entry) => entry[1] !== undefined)
		.map(([key, value]) => {
			const encodedKey = encodeURIComponent(key);
			const encodedValue = encodeURIComponent(value as string);

			return `${encodedKey}=${encodedValue}`;
		})
		.join('&');

	const loc = window.location;

	const url = `?${query}${loc.hash}`;
	history.replaceState(params, 'Color ID', url);
}

export function extractUrlQueryParamColorName(key: string): string | undefined {
	if (!browser) {
		return undefined;
	}

	const params = new URLSearchParams(window.location.search);
	const value = params.get(key);

	// Check if parameter exists
	if (!value) {
		return undefined;
	}

	const color = parseColor(value);

	// Check if value is valid color
	if (!color) {
		return undefined;
	}

	return value;
}
