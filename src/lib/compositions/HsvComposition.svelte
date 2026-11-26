<script lang="ts">
	import { colorName, hsvColor } from '#stores/color-stores.js';
	import { channelGradient } from '#utils/gradients.js';
	import { formatRgb } from 'culori';
	import GradientSlider from './GradientSlider.svelte';

	function percentageToNum(percentage: number): number {
		return Math.round(percentage * 100.0);
	}

	function getName(hue: number, saturation: number, value: number): string {
		return `hsv(${hue} ${saturation}% ${value}%)`;
	}

	let h = 0.0;

	$: if ($hsvColor.h) {
		h = Math.round($hsvColor.h);
	}

	$: s = percentageToNum($hsvColor.s);
	$: v = percentageToNum($hsvColor.v);

	function updateHue(hue: number, updateUrl = true) {
		colorName.set(getName(hue, s, v), updateUrl);
	}

	function updateSaturation(saturation: number, updateUrl = true) {
		colorName.set(getName(h, saturation, v), updateUrl);
	}

	function updateValue(value: number, updateUrl = true) {
		colorName.set(getName(h, s, value), updateUrl);
	}

	// Each track is the current color with only that slider's channel varied.
	// CSS has no hsv(), so the stops are converted to RGB.
	function hsvToCss(hue: number, saturation: number, value: number): string {
		return formatRgb({ mode: 'hsv', h: hue, s: saturation / 100.0, v: value / 100.0 });
	}

	$: hGradient = channelGradient(0, 360, (x) => hsvToCss(x, s, v));
	$: sGradient = channelGradient(0, 100, (x) => hsvToCss(h, x, v));
	$: vGradient = channelGradient(0, 100, (x) => hsvToCss(h, s, x));
</script>

<div class="container">
	<span>{getName(h, s, v)}</span>

	<div class="input-box">
		<div class="input-labels">
			<div class="line-wrapper"><label for="hsv-h">hue</label></div>
			<div class="line-wrapper"><label for="hsv-s">saturation</label></div>
			<div class="line-wrapper"><label for="hsv-v">value</label></div>
		</div>
		<div class="inputs">
			<div class="line-wrapper">
				<GradientSlider
					id="hsv-h"
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
					id="hsv-s"
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
					id="hsv-v"
					gradient={vGradient}
					value={v}
					min={0}
					max={100}
					onChange={updateValue}
					onInput={(value) => updateValue(value, false)}
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
