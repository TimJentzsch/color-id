<script lang="ts">
	import { colorName, hsvColor } from '$stores/color-stores';
	import CompositionSlider from './CompositionSlider.svelte';
	import HueSlider from './HueSlider.svelte';

	function percentageToNum(percentage: number): number {
		return Math.round(percentage * 100.0);
	}

	function getName(hue: number, saturation: number, value: number): string {
		return `hsv(${hue}, ${saturation}%, ${value}%)`;
	}

	let h = 0.0;

	$: if ($hsvColor.h) {
		h = Math.round($hsvColor.h);
	}

	$: s = percentageToNum($hsvColor.s);
	$: v = percentageToNum($hsvColor.v);

	function updateHue(hue: number) {
		$colorName = getName(hue, s, v);
	}

	function updateSaturation(saturation: number) {
		$colorName = getName(h, saturation, v);
	}

	function updateValue(value: number) {
		$colorName = getName(h, s, value);
	}
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
				<HueSlider id="hsv-h" hue={h} onInput={updateHue} />
			</div>
			<div class="line-wrapper">
				<CompositionSlider
					id="hsv-s"
					hueName="green"
					value={s}
					min={0}
					max={100}
					onInput={updateSaturation}
				/>
			</div>
			<div class="line-wrapper">
				<CompositionSlider
					id="hsv-v"
					hueName="blue"
					value={v}
					min={0}
					max={100}
					onInput={updateValue}
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
