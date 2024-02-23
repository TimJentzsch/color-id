<script lang="ts">
	let { id, value, min, max, onInput, onChange, hueName } = $props<{
		id?: string;
		value: number;
		min: number;
		max: number;
		onInput?: (value: number) => void;
		onChange?: (value: number) => void;
		hueName: string;
	}>();

	const percentage = $derived(((value - min) / (max - min)) * 100.0);

	function internalOnInput() {
		if (onInput !== undefined) {
			onInput(value);
		}
	}

	function internalOnChange() {
		if (onChange !== undefined) {
			onChange(value);
		}
	}
</script>

<input
	{id}
	style="--slider-hue: var(--{hueName}-hue); --slider-percentage: {percentage}%"
	type="range"
	bind:value
	{min}
	{max}
	on:input={internalOnInput}
	on:change={internalOnChange}
/>

<style>
	input[type='range'] {
		background: transparent;

		--track-background: linear-gradient(
			to right,
			hsla(var(--slider-hue), 80%, var(--lightness), 1) 0%,
			hsla(var(--slider-hue), 80%, var(--lightness), 1) var(--slider-percentage),
			hsla(var(--slider-hue), 80%, var(--lightness), 0.4) var(--slider-percentage),
			hsla(var(--slider-hue), 80%, var(--lightness), 0.4) 100%
		);
		--thumb-background: hsl(var(--slider-hue), 80%, var(--lightness));
	}

	input[type='range']::-moz-range-track {
		height: 15px;
		cursor: col-resize;
		background: var(--track-background);
	}

	input[type='range']::-moz-range-thumb {
		cursor: col-resize;
		outline: solid var(--text-color) 2px;
		border: solid var(--background-color) 2px;
		border-radius: 0;
		background-color: var(--thumb-background);
		width: 3px;
		height: 14px;
		text-align: center;
		margin-top: -5.5px;
	}

	input[type='range'] {
		-webkit-appearance: none;
	}

	input[type='range']::-webkit-slider-runnable-track {
		width: 100%;
		height: 15px;
		background: var(--track-background);
		border: none;
	}

	input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
		cursor: col-resize;
		width: 7px;
		height: 18px;
		margin-top: -1px;
		outline: solid var(--text-color) 2px;
		border: solid var(--background-color) 2px;
		background-color: var(--thumb-background);
		text-align: center;
	}
</style>
