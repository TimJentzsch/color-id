<script lang="ts">
	import { colorName, rgbColor } from '#stores/color-stores.js';
	import GradientSlider from './GradientSlider.svelte';
	import { channelGradient } from '#utils/gradients.js';

	function percentageToNum(percentage: number): number {
		return Math.round(percentage * 255.0);
	}

	function getName(red: number, green: number, blue: number): string {
		return `rgb(${red} ${green} ${blue})`;
	}

	$: r = percentageToNum($rgbColor.r);
	$: g = percentageToNum($rgbColor.g);
	$: b = percentageToNum($rgbColor.b);

	function updateRed(red: number, updateUrl = true) {
		colorName.set(getName(red, g, b), updateUrl);
	}

	function updateGreen(green: number, updateUrl = true) {
		colorName.set(getName(r, green, b), updateUrl);
	}

	function updateBlue(blue: number, updateUrl = true) {
		colorName.set(getName(r, g, blue), updateUrl);
	}

	// Each track is the current color with only that slider's channel varied.
	$: rGradient = channelGradient(0, 255, (x) => `rgb(${x} ${g} ${b})`);
	$: gGradient = channelGradient(0, 255, (x) => `rgb(${r} ${x} ${b})`);
	$: bGradient = channelGradient(0, 255, (x) => `rgb(${r} ${g} ${x})`);
</script>

<div class="container">
	<span>{getName(r, g, b)}</span>

	<div class="input-box">
		<div class="input-labels">
			<div class="line-wrapper"><label for="rgb-r">red</label></div>
			<div class="line-wrapper"><label for="rgb-g">green</label></div>
			<div class="line-wrapper"><label for="rgb-b">blue</label></div>
		</div>
		<div class="inputs">
			<div class="line-wrapper">
				<GradientSlider
					id="rgb-r"
					gradient={rGradient}
					value={r}
					min={0}
					max={255}
					onInput={(value) => updateRed(value, false)}
					onChange={updateRed}
				/>
			</div>
			<div class="line-wrapper">
				<GradientSlider
					id="rgb-g"
					gradient={gGradient}
					value={g}
					min={0}
					max={255}
					onInput={(value) => updateGreen(value, false)}
					onChange={updateGreen}
				/>
			</div>
			<div class="line-wrapper">
				<GradientSlider
					id="rgb-b"
					gradient={bGradient}
					value={b}
					min={0}
					max={255}
					onInput={(value) => updateBlue(value, false)}
					onChange={updateBlue}
				/>
			</div>
		</div>
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-flow: column;
		gap: 10px;
		align-items: center;
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
