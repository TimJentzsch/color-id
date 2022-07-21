<script lang="ts">
	export let id: string | undefined = undefined;
	export let hue: number;
	export let onInput: ((value: number) => void) | undefined = undefined;
	export let onChange: ((value: number) => void) | undefined = undefined;

	function internalOnInput() {
		if (onInput !== undefined) {
			onInput(hue);
		}
	}

	function internalOnChange() {
		if (onChange !== undefined) {
			onChange(hue);
		}
	}
</script>

<input
	{id}
	type="range"
	bind:value={hue}
	min={0}
	max={360}
	step={1}
	on:input={internalOnInput}
	on:change={internalOnChange}
/>

<style>
	input[type='range'] {
		background: transparent;
	}

	input[type='range']::-moz-range-track {
		height: 15px;
		cursor: col-resize;
		background: linear-gradient(
			to right,
			hsl(0, 80%, var(--lightness)) 0%,
			hsl(36, 80%, var(--lightness)) 10%,
			hsl(72, 80%, var(--lightness)) 20%,
			hsl(108, 80%, var(--lightness)) 30%,
			hsl(144, 80%, var(--lightness)) 40%,
			hsl(180, 80%, var(--lightness)) 50%,
			hsl(216, 80%, var(--lightness)) 60%,
			hsl(252, 80%, var(--lightness)) 70%,
			hsl(288, 80%, var(--lightness)) 80%,
			hsl(324, 80%, var(--lightness)) 90%,
			hsl(360, 80%, var(--lightness)) 100%
		);
	}

	input[type='range']::-moz-range-thumb {
		-webkit-appearance: none;
		cursor: col-resize;
		outline: solid var(--text-color) 2px;
		border: solid var(--background-color) 2px;
		border-radius: 0;
		background-color: transparent;
		width: 3px;
		height: 14px;
		text-align: center;
		margin-top: -5.5px;
	}
</style>
