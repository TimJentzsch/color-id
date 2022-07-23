<script lang="ts">
	import ColorInputForm from '$lib/ColorInputForm.svelte';
	import ColorBig from '$lib/color-preview/ColorBig.svelte';
	import { colorName, hslColor, hsvColor, rgbColor } from '$stores/color-stores';
	import { formatHex, random } from 'culori';

	function onColorInput(color: string) {
		$colorName = color;
	}
</script>

<div class="container">
	<ColorBig name={$colorName} rgbColor={$rgbColor} hslColor={$hslColor} hsvColor={$hsvColor} />
	<ColorInputForm
		colorName={$colorName}
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
