<script lang="ts">
	export let id: string | undefined = undefined;
	export let value: number;
	export let min: number = 0;
	export let max: number = 100;
	export let onChange: (() => void) | undefined = undefined;
	export let hueName: string;

	$: percentage = ((value - min) / (max - min)) * 100.0;
</script>

<input
	{id}
	style="--slider-hue: var(--{hueName}-hue); --slider-percentage: {percentage}%"
	type="range"
	bind:value
	{min}
	{max}
	on:change={onChange}
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
			hsla(var(--slider-hue), 80%, var(--lightness), 1) 0%,
			hsla(var(--slider-hue), 80%, var(--lightness), 1) var(--slider-percentage),
			hsla(var(--slider-hue), 80%, var(--lightness), 0.4) var(--slider-percentage),
			hsla(var(--slider-hue), 80%, var(--lightness), 0.4) 100%
		);
	}

	input[type='range']::-moz-range-thumb {
		-webkit-appearance: none;
		cursor: col-resize;
		border: solid var(--text-color) 2px;
		border-radius: 0;
		background-color: var(--background-color);
		width: 4px;
		height: 15px;
		text-align: center;
		margin-top: -5.5px;
	}
</style>
