<script lang="ts">
	export let id: string | undefined = undefined;
	export let hue: number;
	/** The color space whose hue wheel the track shows. */
	export let space: 'hsl' | 'oklch' = 'hsl';
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
	class:oklch={space === 'oklch'}
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

		--track-background: linear-gradient(
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
		--thumb-background: transparent;
	}

	input[type='range'].oklch {
		--track-background: linear-gradient(
			to right,
			oklch(var(--lightness) 0.13 0) 0%,
			oklch(var(--lightness) 0.13 36) 10%,
			oklch(var(--lightness) 0.13 72) 20%,
			oklch(var(--lightness) 0.13 108) 30%,
			oklch(var(--lightness) 0.13 144) 40%,
			oklch(var(--lightness) 0.13 180) 50%,
			oklch(var(--lightness) 0.13 216) 60%,
			oklch(var(--lightness) 0.13 252) 70%,
			oklch(var(--lightness) 0.13 288) 80%,
			oklch(var(--lightness) 0.13 324) 90%,
			oklch(var(--lightness) 0.13 360) 100%
		);
	}

	input[type='range']::-moz-range-track {
		height: 15px;
		cursor: col-resize;
		background: var(--track-background);
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
