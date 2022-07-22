<script lang="ts">
	import ColorInputForm from '$lib/ColorInputForm.svelte';
	import ColorPreview from '$lib/color-preview/ColorBig.svelte';
	import { colorName, hslColor, hsvColor, rgbColor } from '$stores/color-stores';

	function onColorInput(color: string) {
		$colorName = color;
	}
</script>

<div class="container">
	<ColorInputForm colorName={$colorName} {onColorInput} />
	<ColorPreview name={$colorName} rgbColor={$rgbColor} hslColor={$hslColor} hsvColor={$hsvColor} />
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
