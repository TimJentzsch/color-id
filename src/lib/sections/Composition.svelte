<script>
	import HslComposition from '#lib/compositions/HslComposition.svelte';
	import HsvComposition from '#lib/compositions/HsvComposition.svelte';
	import OklabComposition from '#lib/compositions/OklabComposition.svelte';
	import OklchComposition from '#lib/compositions/OklchComposition.svelte';
	import RgbComposition from '#lib/compositions/RgbComposition.svelte';
	import LinkableHeading from '#lib/LinkableHeading.svelte';
</script>

<LinkableHeading text="Composition" />

<div class="container">
	<div class="row">
		<RgbComposition />
		<HslComposition />
		<HsvComposition />
	</div>
	<div class="row">
		<OklabComposition />
		<OklchComposition />
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-flow: column;
		gap: 30px;
	}

	.row {
		display: flex;
		flex-flow: row wrap;
		justify-content: center;
		align-items: center;
		gap: 30px;
	}
</style>
