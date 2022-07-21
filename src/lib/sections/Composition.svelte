<script>
	import HslComposition from '$lib/compositions/HslComposition.svelte';
	import RgbComposition from '$lib/compositions/RgbComposition.svelte';
</script>

<h2>Composition</h2>

<div class="container">
	<RgbComposition />

	<HslComposition />
</div>

<style>
	.container {
		display: flex;
		gap: 30px;
	}
</style>
