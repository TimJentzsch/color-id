<script lang="ts">
	import HslComposition from '$lib/compositions/HslComposition.svelte';
	import HsvComposition from '$lib/compositions/HsvComposition.svelte';
	import RgbComposition from '$lib/compositions/RgbComposition.svelte';
	import LinkableHeading from '$lib/LinkableHeading.svelte';
	import type { PrimaryColor } from '$stores/color-store.svelte';

	const { primary } = $props<{ primary: PrimaryColor }>();
</script>

<LinkableHeading text="Composition" />

<div class="container">
	<RgbComposition {primary} />
	<HslComposition {primary} />
	<HsvComposition {primary} />
</div>

<style>
	.container {
		display: flex;
		flex-flow: row wrap;
		justify-content: center;
		align-items: center;
		gap: 30px;
	}
</style>
