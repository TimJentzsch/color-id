<script lang="ts">
	import ColorBig from '$lib/color-preview/ColorBig.svelte';
	import ColorInputForm from '$lib/ColorInputForm.svelte';
	import LinkableHeading from '$lib/LinkableHeading.svelte';
	import {
		secColorName,
		secRgbColor,
		secHslColor,
		secHsvColor
	} from '$stores/secondary-color-stores';

	function onColorInput(color: string) {
		$secColorName = color;
	}
</script>

<LinkableHeading text="Accessibility" />

<div class="container">
	<ColorInputForm
		colorName={$secColorName}
		promptText="Choose a color for contrast checks:"
		generateButtonText="auto"
		generateColor={() => 'auto'}
		{onColorInput}
	/>
	<ColorBig
		name={$secColorName}
		rgbColor={$secRgbColor}
		hslColor={$secHslColor}
		hsvColor={$secHsvColor}
	/>
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
