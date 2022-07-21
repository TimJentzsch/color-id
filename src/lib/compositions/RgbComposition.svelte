<script lang="ts">
	import { colorName, rgbColor } from '$stores/color-stores';
	import CompositionSlider from './CompositionSlider.svelte';

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
			<CompositionSlider
				id="rgb-r"
				colorName="red"
				bind:value={r}
				min={0}
				max={255}
				onChange={updateColor}
			/>
		</div>
		<div class="line-wrapper">
			<CompositionSlider
				id="rgb-g"
				colorName="green"
				bind:value={g}
				min={0}
				max={255}
				onChange={updateColor}
			/>
		</div>
		<div class="line-wrapper">
			<CompositionSlider
				id="rgb-b"
				colorName="blue"
				bind:value={b}
				min={0}
				max={255}
				onChange={updateColor}
			/>
		</div>
	</div>
</div>

<style>
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
