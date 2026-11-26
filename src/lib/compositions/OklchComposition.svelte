<script lang="ts">
	import { colorName, oklchColor } from '#stores/color-stores.js';
	import GradientSlider from './GradientSlider.svelte';
	import { channelGradient } from '#utils/gradients.js';

	/** The value that CSS treats as 100% for chroma. */
	const FULL_RANGE = 0.4;

	function toPercent(value: number): number {
		return (value / FULL_RANGE) * 100.0;
	}

	function getName(lightness: number, chroma: number, hue: number): string {
		return `oklch(${lightness}% ${chroma}% ${hue})`;
	}

	let h = 0.0;

	$: if ($oklchColor.h) {
		h = Math.round($oklchColor.h);
	}

	$: l = Math.round($oklchColor.l * 100.0);
	$: c = Math.round(toPercent($oklchColor.c));

	function setColor(lightness: number, chroma: number, hue: number, updateUrl: boolean) {
		// Out-of-gamut values are kept as is, so each slider only ever changes its own channel.
		colorName.set(getName(lightness, chroma, hue), updateUrl);
	}

	function updateLightness(lightness: number, updateUrl = true) {
		setColor(lightness, c, h, updateUrl);
	}

	function updateChroma(chroma: number, updateUrl = true) {
		setColor(l, chroma, h, updateUrl);
	}

	function updateHue(hue: number, updateUrl = true) {
		setColor(l, c, hue, updateUrl);
	}

	// Each track is the current color with only that slider's channel varied.
	$: lGradient = channelGradient(0, 100, (x) => `oklch(${x}% ${c}% ${h})`);
	$: cGradient = channelGradient(0, 100, (x) => `oklch(${l}% ${x}% ${h})`);
	$: hGradient = channelGradient(0, 360, (x) => `oklch(${l}% ${c}% ${x})`);
</script>

<div class="container">
	<span>{getName(l, c, h)}</span>

	<div class="input-box">
		<div class="input-labels">
			<div class="line-wrapper"><label for="oklch-l">lightness</label></div>
			<div class="line-wrapper"><label for="oklch-c">chroma</label></div>
			<div class="line-wrapper"><label for="oklch-h">hue</label></div>
		</div>
		<div class="inputs">
			<div class="line-wrapper">
				<GradientSlider
					id="oklch-l"
					gradient={lGradient}
					value={l}
					min={0}
					max={100}
					onChange={updateLightness}
					onInput={(value) => updateLightness(value, false)}
				/>
			</div>
			<div class="line-wrapper">
				<GradientSlider
					id="oklch-c"
					gradient={cGradient}
					value={c}
					min={0}
					max={100}
					onChange={updateChroma}
					onInput={(value) => updateChroma(value, false)}
				/>
			</div>
			<div class="line-wrapper">
				<GradientSlider
					id="oklch-h"
					gradient={hGradient}
					value={h}
					min={0}
					max={360}
					onChange={updateHue}
					onInput={(value) => updateHue(value, false)}
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
