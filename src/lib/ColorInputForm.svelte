<script lang="ts">
	import { parseColor } from '$utils/color-parsing';

	import { formatHex, type Color } from 'culori';

	export let colorName: string;
	export let promptText: string;
	export let generateButtonText: string;
	export let generateColor: () => Color;
	export let onColorInput: (color: string) => void;

	/** Generate a color via the given function. */
	function onGenerateColor() {
		onColorInput(formatHex(generateColor()));
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
	<label for="color-input">{promptText}</label>
	<input id="color-input" type="text" bind:value={colorName} />
	<input type="submit" value="identify" />
	or
	<input type="button" value={generateButtonText} on:click={onGenerateColor} />
</form>
