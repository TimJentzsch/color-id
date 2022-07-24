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
