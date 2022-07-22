<script lang="ts">
	import { parseColor } from '$utils/color-parsing';

	import { formatHex, random } from 'culori';

	export let colorName: string;
	export let onColorInput: (color: string) => void;

	/** Choose a new random color. */
	function onRandomColor() {
		onColorInput(formatHex(random()));
	}

	/** Set a new color based on the input. */
	function onSubmitColorInput(ev: SubmitEvent) {
		ev.preventDefault();

		const parsedColor = parseColor(colorName);

		if (parsedColor) {
			onColorInput(colorName);
		}
	}
</script>

<form on:submit={onSubmitColorInput}>
	<label for="color-input">Choose a color to identify:</label>
	<input id="color-input" type="text" bind:value={colorName} />
	<input type="submit" value="identify" />
	or
	<input type="button" value="random" on:click={onRandomColor} />
</form>
