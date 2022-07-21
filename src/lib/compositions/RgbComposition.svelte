<script lang="ts">
	import { colorName, rgbColor } from '$stores/color-stores';
	import CompositionSlider from './CompositionSlider.svelte';

	function numToPercentage(num: number): number {
		return num / 255.0;
	}

	function percentageToNum(percentage: number): number {
		return Math.round(percentage * 255.0);
	}

	function getName(red: number, green: number, blue: number): string {
		return `rgb(${red}, ${green}, ${blue})`;
	}

	$: r = percentageToNum($rgbColor.r);
	$: g = percentageToNum($rgbColor.g);
	$: b = percentageToNum($rgbColor.b);

	$: name = `rgb(${r}, ${g}, ${b})`;

	function updateColorRed(red: number) {
		$colorName = getName(red, g, b);
	}

	function updateColorGreen(green: number) {
		$colorName = getName(r, green, b);
	}

	function updateColorBlue(blue: number) {
		$colorName = getName(r, g, blue);
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
				hueName="red"
				value={r}
				min={0}
				max={255}
				onChange={updateColorRed}
			/>
		</div>
		<div class="line-wrapper">
			<CompositionSlider
				id="rgb-g"
				hueName="green"
				value={g}
				min={0}
				max={255}
				onChange={updateColorGreen}
			/>
		</div>
		<div class="line-wrapper">
			<CompositionSlider
				id="rgb-b"
				hueName="blue"
				value={b}
				min={0}
				max={255}
				onChange={updateColorBlue}
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
