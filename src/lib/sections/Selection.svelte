<script lang="ts">
	import ColorInputForm from '$lib/ColorInputForm.svelte';
	import ColorBig from '$lib/color-preview/ColorBig.svelte';
	import type { PrimaryColor } from '$stores/color-store.svelte';
	import { formatHex, random } from 'culori';

	const { primary } = $props<{ primary: PrimaryColor }>();

	function onColorInput(color: string) {
		primary.name = color;
	}
</script>

<div class="container">
	<ColorBig
		name={primary.name}
		rgbColor={primary.rgb}
		hslColor={primary.hsl}
		hsvColor={primary.hsv}
	/>
	<ColorInputForm
		colorName={primary.name}
		promptText="Choose a color to identify:"
		generateButtonText="random"
		generateColor={() => formatHex(random())}
		{onColorInput}
	/>
</div>

<style>
	.container {
		display: flex;
		flex-flow: row wrap;
		align-items: center;
		justify-content: center;
		width: 100%;
		gap: 30px;

		margin-top: 20px;
	}
</style>
