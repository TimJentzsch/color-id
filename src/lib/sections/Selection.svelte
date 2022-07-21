<script lang="ts">
	import { color, colorHex } from '$stores/color-stores';
	import { parse, random } from 'culori';

	let colorInput = $colorHex;

	/** Set a new color based on the input. */
	function onSubmitColorInput(ev: SubmitEvent) {
		ev.preventDefault();

		const parsedColor = parse(colorInput);

		if (parsedColor) {
			$color = parsedColor;
		}
	}

	/** Choose a new random color. */
	function onRandomColor() {
		$color = random();
		colorInput = $colorHex;
	}
</script>

<form on:submit={onSubmitColorInput}>
	<label for="color-input">Choose a color to identify:</label>
	<input id="color-input" type="text" bind:value={colorInput} />
	<input type="submit" value="identify" />
	or
	<input type="button" value="random" on:click={onRandomColor} />
</form>
