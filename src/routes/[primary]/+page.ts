import { createColorStore } from '$stores/color-store.svelte';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const primaryName = params.primary;

	const primary = createColorStore(primaryName);

	return {
		primary
	};
};
