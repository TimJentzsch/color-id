<script lang="ts">
	import WcagPreview from '$lib/accessibility/WcagPreview.svelte';
	import ColorBig from '$lib/color-preview/ColorBig.svelte';
	import ColorInputForm from '$lib/ColorInputForm.svelte';
	import LinkableHeading from '$lib/LinkableHeading.svelte';
	import {
		secColorName,
		secRgbColor,
		secHslColor,
		secHsvColor,
		secColorHex
	} from '$stores/secondary-color-stores';
	import { colorName, colorHex, rgbColor, hslColor } from '$stores/color-stores';
	import { wcagContrast } from 'culori';
	import ContrastChecks from '$lib/accessibility/ContrastChecks.svelte';

	function onColorInput(color: string) {
		$secColorName = color;
	}

	$: contrast = wcagContrast($rgbColor, $secRgbColor);
</script>

<LinkableHeading text="Accessibility" />

<div class="container">
	<div class="input">
		<ColorBig
			name={$secColorName}
			rgbColor={$secRgbColor}
			hslColor={$secHslColor}
			hsvColor={$secHsvColor}
		/>
		<ColorInputForm
			colorName={$secColorName}
			promptText="Choose a color for contrast checks:"
			generateButtonText="auto"
			generateColor={() => 'auto'}
			{onColorInput}
		/>
	</div>

	<div class="previews">
		<WcagPreview
			foregroundHex={$colorHex}
			foregroundName={$colorName}
			backgroundHex={$secColorHex}
			backgroundName={$secColorName}
		/>
		<WcagPreview
			foregroundHex={$secColorHex}
			foregroundName={$secColorName}
			backgroundHex={$colorHex}
			backgroundName={$colorName}
		/>
	</div>

	<div class="contrast">
		Contrast ratio <strong>{contrast.toFixed(2)}:1</strong>
	</div>

	<ContrastChecks
		{contrast}
		hslColor={$hslColor}
		secHslColor={$secHslColor}
		onSelectColor={(color) => {
			$colorName = color;
		}}
		onSelectSecColor={(color) => {
			$secColorName = color;
		}}
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

	.input {
		display: flex;
		gap: 20px;
		flex-flow: row wrap;
		align-items: center;
	}

	.previews {
		display: flex;
		flex-flow: row wrap;
		gap: 10px;
		align-items: center;
	}
</style>
