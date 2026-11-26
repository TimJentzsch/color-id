<script lang="ts">
	export let id: string | undefined = undefined;
	export let value: number;
	export let min: number = 0;
	export let max: number = 100;
	/** A CSS gradient for the track, running from `min` on the left to `max` on the right. */
	export let gradient: string;
	export let onInput: ((value: number) => void) | undefined = undefined;
	export let onChange: ((value: number) => void) | undefined = undefined;

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
	style="--track-background: {gradient}"
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
		--thumb-background: transparent;
		/* A ring rather than a border, so the track size and thumb alignment stay the same */
		--track-border: 0 0 0 1px var(--muted-color);
		/* Matches the corner radius used elsewhere in the app */
		--track-radius: 5px;
		--thumb-radius: 2px;
	}

	input[type='range']::-moz-range-track {
		height: 15px;
		cursor: col-resize;
		background: var(--track-background);
		box-shadow: var(--track-border);
		border-radius: var(--track-radius);
	}

	input[type='range']::-moz-range-thumb {
		cursor: col-resize;
		outline: solid var(--text-color) 2px;
		border: solid var(--background-color) 2px;
		border-radius: var(--thumb-radius);
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
		box-shadow: var(--track-border);
		border-radius: var(--track-radius);
	}

	input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
		cursor: col-resize;
		width: 7px;
		height: 18px;
		margin-top: -1px;
		outline: solid var(--text-color) 2px;
		border: solid var(--background-color) 2px;
		border-radius: var(--thumb-radius);
		background-color: var(--thumb-background);
		text-align: center;
	}
</style>
