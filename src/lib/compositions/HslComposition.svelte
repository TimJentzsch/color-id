<script lang="ts">
	import { colorName, hslColor } from '#stores/color-stores.js';
	import GradientSlider from './GradientSlider.svelte';
	import { channelGradient } from '#utils/gradients.js';

	function percentageToNum(percentage: number): number {
		return Math.round(percentage * 100.0);
	}

	function getName(hue: number, saturation: number, lightness: number): string {
		return `hsl(${hue} ${saturation}% ${lightness}%)`;
	}

	let h = 0.0;

	$: if ($hslColor.h) {
		h = Math.round($hslColor.h);
	}

	$: s = percentageToNum($hslColor.s);
	$: l = percentageToNum($hslColor.l);

	function updateHue(hue: number, updateUrl = true) {
		colorName.set(getName(hue, s, l), updateUrl);
	}

	function updateSaturation(saturation: number, updateUrl = true) {
		colorName.set(getName(h, saturation, l), updateUrl);
	}

	function updateLightness(lightness: number, updateUrl = true) {
		colorName.set(getName(h, s, lightness), updateUrl);
	}

	// Each track is the current color with only that slider's channel varied.
	$: hGradient = channelGradient(0, 360, (x) => `hsl(${x} ${s}% ${l}%)`);
	$: sGradient = channelGradient(0, 100, (x) => `hsl(${h} ${x}% ${l}%)`);
	$: lGradient = channelGradient(0, 100, (x) => `hsl(${h} ${s}% ${x}%)`);
</script>

<div class="container">
	<span>{getName(h, s, l)}</span>

	<div class="input-box">
		<div class="input-labels">
			<div class="line-wrapper"><label for="hsl-h">hue</label></div>
			<div class="line-wrapper"><label for="hsl-s">saturation</label></div>
			<div class="line-wrapper"><label for="hsl-l">lightness</label></div>
		</div>
		<div class="inputs">
			<div class="line-wrapper">
				<GradientSlider
					id="hsl-h"
					gradient={hGradient}
					value={h}
					min={0}
					max={360}
					onChange={updateHue}
					onInput={(value) => updateHue(value, false)}
				/>
			</div>
			<div class="line-wrapper">
				<GradientSlider
					id="hsl-s"
					gradient={sGradient}
					value={s}
					min={0}
					max={100}
					onChange={updateSaturation}
					onInput={(value) => updateSaturation(value, false)}
				/>
			</div>
			<div class="line-wrapper">
				<GradientSlider
					id="hsl-l"
					gradient={lGradient}
					value={l}
					min={0}
					max={100}
					onChange={updateLightness}
					onInput={(value) => updateLightness(value, false)}
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
