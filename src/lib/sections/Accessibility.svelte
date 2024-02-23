<script lang="ts">
	import WcagPreview from '$lib/accessibility/WcagPreview.svelte';
	import ColorBig from '$lib/color-preview/ColorBig.svelte';
	import ColorInputForm from '$lib/ColorInputForm.svelte';
	import LinkableHeading from '$lib/LinkableHeading.svelte';
	import { wcagContrast } from 'culori';
	import ContrastChecks from '$lib/accessibility/ContrastChecks.svelte';
	import type { PrimaryColor, SecondaryColor } from '$stores/color-store.svelte';

	const { primary, secondary } = $props<{ primary: PrimaryColor; secondary: SecondaryColor }>();

	function onColorInput(color: string) {
		secondary.name = color;
	}

	const contrast = $derived(wcagContrast(primary.rgb, secondary.rgb));
</script>

<LinkableHeading text="Accessibility" />

<div class="container">
	<div class="input">
		<ColorBig
			name={secondary.name}
			rgbColor={secondary.rgb}
			hslColor={secondary.hsl}
			hsvColor={secondary.hsv}
		/>
		<ColorInputForm
			colorName={secondary.name}
			promptText="Choose a color for contrast checks:"
			generateButtonText="auto"
			generateColor={() => 'auto'}
			{onColorInput}
		/>
	</div>

	<div class="previews">
		<WcagPreview
			foregroundHex={primary.hex}
			foregroundName={primary.name}
			backgroundHex={secondary.hex}
			backgroundName={secondary.name}
		/>
		<WcagPreview
			foregroundHex={secondary.hex}
			foregroundName={secondary.name}
			backgroundHex={primary.hex}
			backgroundName={primary.name}
		/>
	</div>

	<div class="contrast">
		Contrast ratio <strong>{contrast.toFixed(2)}:1</strong>
	</div>

	<ContrastChecks
		{contrast}
		hslColor={primary.hsl}
		secHslColor={secondary.hsl}
		onSelectColor={(color) => {
			primary.name = color;
		}}
		onSelectSecColor={(color) => {
			secondary.name = color;
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
