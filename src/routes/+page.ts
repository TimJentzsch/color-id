import { extractUrlQueryParamColorName } from '$utils/url-utils';
import type { PageLoad } from './$types';
import { formatHex, random } from 'culori';
import { redirect } from '@sveltejs/kit';

export const load = (({ url }) => {
	const params = url.searchParams;

	const color = extractUrlQueryParamColorName('color', params);

	if (color === undefined) {
		const newColor = formatHex(random());
		params.set('color', newColor);

		throw redirect(302, `?${params}`);
	}

	return {
		color,
		secondaryColor: extractUrlQueryParamColorName('secondaryColor', params) || 'auto'
	};
}) satisfies PageLoad;
