<script lang="ts">
	import type { PrimaryColor } from '$stores/color-store.svelte';
	import { hslName } from '$utils/color-name';
	import CompositionSlider from './CompositionSlider.svelte';
	import HueSlider from './HueSlider.svelte';

	const { primary } = $props<{ primary: PrimaryColor }>();

	function updateHue(hue: number, updateUrl = true) {
		primary.hsl.h = hue;
	}

	function updateSaturation(saturation: number, updateUrl = true) {
		primary.hsl.s = saturation;
	}

	function updateLightness(lightness: number, updateUrl = true) {
		primary.hsl.l = lightness;
	}
</script>

<div class="container">
	<span>{hslName(primary.hsl)}</span>

	<div class="input-box">
		<div class="input-labels">
			<div class="line-wrapper"><label for="hsl-h">hue</label></div>
			<div class="line-wrapper"><label for="hsl-s">saturation</label></div>
			<div class="line-wrapper"><label for="hsl-l">lightness</label></div>
		</div>
		<div class="inputs">
			<div class="line-wrapper">
				<HueSlider
					id="hsl-h"
					hue={primary.hsl.h ?? 0}
					onChange={updateHue}
					onInput={(value) => updateHue(value, false)}
				/>
			</div>
			<div class="line-wrapper">
				<CompositionSlider
					id="hsl-s"
					hueName="hsl-saturation"
					value={primary.hsl.s}
					min={0}
					max={100}
					onChange={updateSaturation}
					onInput={(value) => updateSaturation(value, false)}
				/>
			</div>
			<div class="line-wrapper">
				<CompositionSlider
					id="hsl-l"
					hueName="lightness"
					value={primary.hsl.l}
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
