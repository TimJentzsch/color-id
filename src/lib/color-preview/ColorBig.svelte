<script lang="ts">
	import { getColorDescription } from '$utils/color-description';
	import { formatHex, hsl, hsv, type Color, type Hsl, type Hsv, type Rgb } from 'culori';

	export let name: string | undefined = undefined;
	export let rgbColor: Rgb;
	export let hslColor: Hsl | undefined = undefined;
	export let hsvColor: Hsv | undefined = undefined;

	$: _hsl = hslColor ?? hsl(rgbColor);
	$: _hsv = hsvColor ?? hsv(rgbColor);

	$: hex = formatHex(rgbColor);
	$: description = getColorDescription(_hsl, _hsv);
</script>

<div class="container">
	<div class="preview" style="--color-hex: {hex}" />
	<div class="color-names">
		{#if name}
			<strong class="name">{name}</strong>
		{/if}
		{#if name !== hex}
			<span class="hex-name">{hex}</span>
		{/if}
		<span class="description">"{description}"</span>
	</div>
</div>

<style>
	.container {
		display: flex;
		align-items: center;

		background-color: var(--surface-color);
		border: solid var(--muted-color) 1px;
		border-radius: 5px;

		min-width: 300px;
	}

	.preview {
		width: 90px;
		height: 90px;
		background-color: var(--color-hex);
		border-right: solid var(--muted-color) 1px;
		border-radius: 5px 0px 0px 5px;
	}

	.color-names {
		display: flex;
		flex-flow: column;
		gap: 5px;
		padding: 10px;
	}

	.name,
	.hex-name {
		font-family: 'Courier New', Courier, monospace;
	}

	@media only screen and (max-device-width: 480px) {
		.container {
			width: 100%;
		}
	}
</style>
