<script lang="ts">
	import type { PrimaryColor } from '$stores/color-store.svelte';
	import { rgbName } from '$utils/color-name';
	import CompositionSlider from './CompositionSlider.svelte';

	const { primary } = $props<{ primary: PrimaryColor }>();

	function percentageToNum(percentage: number): number {
		return Math.round(percentage * 255.0);
	}

	const r = $derived(percentageToNum(primary.rgb.r));
	const g = $derived(percentageToNum(primary.rgb.g));
	const b = $derived(percentageToNum(primary.rgb.b));

	function updateRed(red: number, updateUrl = true) {
		primary.rgb.r = red;
	}

	function updateGreen(green: number, updateUrl = true) {
		primary.rgb.g = green;
	}

	function updateBlue(blue: number, updateUrl = true) {
		primary.rgb.b = blue;
	}
</script>

<div class="container">
	<span>{rgbName(primary.rgb)}</span>

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
					onInput={(value) => updateRed(value, false)}
					onChange={updateRed}
				/>
			</div>
			<div class="line-wrapper">
				<CompositionSlider
					id="rgb-g"
					hueName="green"
					value={g}
					min={0}
					max={255}
					onInput={(value) => updateGreen(value, false)}
					onChange={updateGreen}
				/>
			</div>
			<div class="line-wrapper">
				<CompositionSlider
					id="rgb-b"
					hueName="blue"
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
