<script lang="ts">
	import { colorName, hslColor } from '$stores/color-stores';
	import CompositionSlider from './CompositionSlider.svelte';
	import HueSlider from './HueSlider.svelte';

	function percentageToNum(percentage: number): number {
		return Math.round(percentage * 100.0);
	}

	function getName(hue: number, saturation: number, lightness: number): string {
		return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
	}

	let h = 0.0;

	$: if ($hslColor.h) {
		h = Math.round($hslColor.h);
	}

	$: s = percentageToNum($hslColor.s);
	$: l = percentageToNum($hslColor.l);

	function updateHue(hue: number) {
		$colorName = getName(hue, s, l);
	}

	function updateSaturation(saturation: number) {
		$colorName = getName(h, saturation, l);
	}

	function updateLightness(lightness: number) {
		$colorName = getName(h, s, lightness);
	}
</script>

<div class="container">
	<span>{getName(h, s, l)}</span>

	<div class="input-box">
		<div class="input-labels">
			<div class="line-wrapper"><label for="rgb-r">hue</label></div>
			<div class="line-wrapper"><label for="rgb-g">saturation</label></div>
			<div class="line-wrapper"><label for="rgb-b">lightness</label></div>
		</div>
		<div class="inputs">
			<div class="line-wrapper">
				<HueSlider id="hsl-h" hue={h} onInput={updateHue} />
			</div>
			<div class="line-wrapper">
				<CompositionSlider
					id="hsl-s"
					hueName="green"
					value={s}
					min={0}
					max={100}
					onInput={updateSaturation}
				/>
			</div>
			<div class="line-wrapper">
				<CompositionSlider
					id="hsl-l"
					hueName="blue"
					value={l}
					min={0}
					max={100}
					onInput={updateLightness}
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
