<script lang="ts">
	import type { PrimaryColor } from '$stores/color-store.svelte';
	import { hsvName } from '$utils/color-name';
	import CompositionSlider from './CompositionSlider.svelte';
	import HueSlider from './HueSlider.svelte';

	const { primary } = $props<{ primary: PrimaryColor }>();

	function updateHue(hue: number, updateUrl = true) {
		primary.hsv.h = hue;
	}

	function updateSaturation(saturation: number, updateUrl = true) {
		primary.hsv.s = saturation;
	}

	function updateValue(value: number, updateUrl = true) {
		primary.hsv.v = value;
	}
</script>

<div class="container">
	<span>{hsvName(primary.hsv)}</span>

	<div class="input-box">
		<div class="input-labels">
			<div class="line-wrapper"><label for="hsv-h">hue</label></div>
			<div class="line-wrapper"><label for="hsv-s">saturation</label></div>
			<div class="line-wrapper"><label for="hsv-v">value</label></div>
		</div>
		<div class="inputs">
			<div class="line-wrapper">
				<HueSlider
					id="hsv-h"
					hue={primary.hsv.h ?? 0}
					onChange={updateHue}
					onInput={(value) => updateHue(value, false)}
				/>
			</div>
			<div class="line-wrapper">
				<CompositionSlider
					id="hsv-s"
					hueName="hsv-saturation"
					value={primary.hsv.s}
					min={0}
					max={100}
					onChange={updateSaturation}
					onInput={(value) => updateSaturation(value, false)}
				/>
			</div>
			<div class="line-wrapper">
				<CompositionSlider
					id="hsv-v"
					hueName="value"
					value={primary.hsv.v}
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
