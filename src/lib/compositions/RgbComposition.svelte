<script lang="ts">
	import { colorName, rgbColor } from '$stores/color-stores';

	function numToPercentage(num: number): number {
		return num / 255.0;
	}

	function numToCssPercentage(num: number): string {
		return `${numToPercentage(num) * 100.0}%`;
	}

	function percentageToNum(percentage: number): number {
		return Math.round(percentage * 255.0);
	}

	let r = percentageToNum($rgbColor.r);
	let g = percentageToNum($rgbColor.g);
	let b = percentageToNum($rgbColor.b);

	$: name = `rgb(${r}, ${g}, ${b})`;

	function updateColor() {
		$colorName = name;
	}
</script>

<span>{name}</span>

<div class="input-box">
	<div class="input-labels">
		<div class="line-wrapper"><label for="rgb-r">red</label></div>
		<div class="line-wrapper"><label for="rgb-g">green</label></div>
		<div class="line-wrapper"><label for="rgb-b">blue</label></div>
	</div>
	<div class="inputs">
		<div class="line-wrapper">
			<input
				id="rgb-r"
				style="--slider-color: red; --slider-percentage: {numToCssPercentage(r)}"
				type="range"
				bind:value={r}
				min={0}
				max={255}
				on:change={updateColor}
			/>
		</div>
		<div class="line-wrapper">
			<input
				id="rgb-g"
				style="--slider-color: green; --slider-percentage: {numToCssPercentage(g)}"
				type="range"
				bind:value={g}
				min={0}
				max={255}
				on:change={updateColor}
			/>
		</div>
		<div class="line-wrapper">
			<input
				id="rgb-b"
				style="--slider-color: blue; --slider-percentage: {numToCssPercentage(b)}"
				type="range"
				bind:value={b}
				min={0}
				max={255}
				on:change={updateColor}
			/>
		</div>
	</div>
</div>

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
			transparent var(--slider-percentage),
			transparent 100%
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

	.input-box {
		display: flex;
		gap: 10px;
	}

	.input-labels {
		display: flex;
		flex-flow: column;
		align-items: end;
	}

	.inputs {
		max-width: 150px;
		display: flex;
		flex-flow: column;
	}

	.line-wrapper {
		height: 30px;
		align-items: center;
		justify-content: center;
	}
</style>
