<script lang="ts">
	export let id: string | undefined = undefined;
	export let value: number;
	export let min: number = 0;
	export let max: number = 100;
	export let onChange: (() => void) | undefined = undefined;
	export let colorName: string;

	$: percentage = ((value - min) / (max - min)) * 100.0;
</script>

<input
	{id}
	style="--slider-color: var(--{colorName}); --slider-muted-color: var(--{colorName}-muted); --slider-percentage: {percentage}%"
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
			var(--slider-color) 0%,
			var(--slider-color) var(--slider-percentage),
			var(--slider-muted-color) var(--slider-percentage),
			var(--slider-muted-color) 100%
		);
	}

	input[type='range']::-moz-range-thumb {
		-webkit-appearance: none;
		cursor: col-resize;
		border: solid var(--text-color) 1px;
		border-radius: 0;
		background-color: black;
		color: black;
		width: 4px;
		height: 15px;
		text-align: center;
		margin-top: -5.5px;
	}
</style>
