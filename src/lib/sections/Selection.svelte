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
	<ColorInputForm
		colorName={$colorName}
		promptText="Choose a color to identify:"
		generateButtonText="random"
		generateColor={() => formatHex(random())}
		{onColorInput}
	/>
	<ColorBig name={$colorName} rgbColor={$rgbColor} hslColor={$hslColor} hsvColor={$hsvColor} />
</div>

<style>
	.container {
		display: flex;
		flex-flow: column;
		align-items: center;
		width: 100%;
		gap: 30px;
	}
</style>
