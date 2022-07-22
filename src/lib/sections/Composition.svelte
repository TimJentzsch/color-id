<script>
	import HslComposition from '$lib/compositions/HslComposition.svelte';
	import HsvComposition from '$lib/compositions/HsvComposition.svelte';
	import RgbComposition from '$lib/compositions/RgbComposition.svelte';
	import LinkableHeading from '$lib/LinkableHeading.svelte';
</script>

<LinkableHeading text="Composition" />

<div class="container">
	<RgbComposition />
	<HslComposition />
	<HsvComposition />
</div>

<style>
	.container {
		display: flex;
		gap: 30px;
	}
</style>
