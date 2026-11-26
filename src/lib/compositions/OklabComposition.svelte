<script lang="ts">
	import { colorName, oklabColor } from '#stores/color-stores.js';
	import { clampToSrgb } from '#utils/color-conversion.js';
	import CompositionSlider from './CompositionSlider.svelte';

	/** The value that CSS treats as 100% for a and b. */
	const FULL_RANGE = 0.4;

	function toPercent(value: number): number {
		return (value / FULL_RANGE) * 100.0;
	}

	function fromPercent(percentage: number): number {
		return (percentage / 100.0) * FULL_RANGE;
	}

	function getName(lightness: number, a: number, b: number): string {
		return `oklab(${lightness}% ${a}% ${b}%)`;
	}

	$: l = Math.round($oklabColor.l * 100.0);
	$: a = Math.round(toPercent($oklabColor.a));
	$: b = Math.round(toPercent($oklabColor.b));

	function setColor(lightness: number, newA: number, newB: number, updateUrl: boolean) {
		const clamped = clampToSrgb({
			mode: 'oklab',
			l: lightness / 100.0,
			a: fromPercent(newA),
			b: fromPercent(newB)
		});
		// Truncating keeps a clamped value from being pushed back out of the sRGB gamut.
		colorName.set(
			getName(lightness, Math.trunc(toPercent(clamped.a)), Math.trunc(toPercent(clamped.b))),
			updateUrl
		);
	}

	function updateLightness(lightness: number, updateUrl = true) {
		setColor(lightness, a, b, updateUrl);
	}

	function updateA(newA: number, updateUrl = true) {
		setColor(l, newA, b, updateUrl);
	}

	function updateB(newB: number, updateUrl = true) {
		setColor(l, a, newB, updateUrl);
	}
</script>

<div class="container">
	<span>{getName(l, a, b)}</span>

	<div class="input-box">
		<div class="input-labels">
			<div class="line-wrapper"><label for="oklab-l">lightness</label></div>
			<div class="line-wrapper"><label for="oklab-a">a</label></div>
			<div class="line-wrapper"><label for="oklab-b">b</label></div>
		</div>
		<div class="inputs">
			<div class="line-wrapper">
				<CompositionSlider
					id="oklab-l"
					hueName="lightness"
					value={l}
					min={0}
					max={100}
					onChange={updateLightness}
					onInput={(value) => updateLightness(value, false)}
				/>
			</div>
			<div class="line-wrapper">
				<CompositionSlider
					id="oklab-a"
					hueName="oklab-a"
					value={a}
					min={-100}
					max={100}
					onChange={updateA}
					onInput={(value) => updateA(value, false)}
				/>
			</div>
			<div class="line-wrapper">
				<CompositionSlider
					id="oklab-b"
					hueName="oklab-b"
					value={b}
					min={-100}
					max={100}
					onChange={updateB}
					onInput={(value) => updateB(value, false)}
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
