import { createPrimaryColorStore, createSecondaryColorStore } from '$stores/color-store.svelte';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = ({ params, url }) => {
	const primaryName = params.primary;
	const primary = createPrimaryColorStore(primaryName);

	const secondaryName = url.searchParams.get('secondary');
	const secondary = createSecondaryColorStore(secondaryName ?? 'auto', primary);

	return {
		primary,
		secondary
	};
};
