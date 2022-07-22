<script lang="ts">
	import ColorInputForm from '$lib/ColorInputForm.svelte';
	import { colorName } from '$stores/color-stores';

	function onColorInput(color: string) {
		$colorName = color;
	}
</script>

<ColorInputForm colorName={$colorName} {onColorInput} />
