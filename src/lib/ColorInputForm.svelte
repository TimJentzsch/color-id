<script lang="ts">
	import { parseColor } from '$utils/color-parsing';

	let { colorName, promptText, generateButtonText, generateColor, onColorInput } = $props<{
		colorName: string;
		promptText: string;
		generateButtonText: string;
		generateColor: () => string;
		onColorInput: (color: string) => void;
	}>();

	const id = crypto.randomUUID();

	/** Generate a color via the given function. */
	function onGenerateColor() {
		onColorInput(generateColor());
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
	<label for={id}>{promptText}</label><br />
	<input {id} type="text" bind:value={colorName} />
	<input type="submit" value="identify" />
	or
	<input type="button" value={generateButtonText} on:click={onGenerateColor} />
</form>
