<script lang="ts">
	import ColorInputForm from '$lib/ColorInputForm.svelte';
	import ColorPreview from '$lib/ColorPreview.svelte';
	import { colorName } from '$stores/color-stores';

	function onColorInput(color: string) {
		$colorName = color;
	}
</script>

<div class="container">
	<ColorInputForm colorName={$colorName} {onColorInput} />
	<ColorPreview />
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
