<script lang="ts">
	import { colorName, colorHex } from '$stores/color-stores';
</script>

<div class="container">
	<div class="color-box" style="--color-hex: {$colorHex}" />
	<div class="color-names">
		<strong class="input-name">{$colorName}</strong>
		<span class="hex-name">{$colorHex}</span>
	</div>
</div>

<style>
	.container {
		display: flex;
		align-items: center;

		background-color: var(--surface-color);
		border: solid var(--muted-color) 1px;
		border-radius: 5px;
	}

	.color-box {
		width: 80px;
		height: 80px;
		background-color: var(--color-hex);
		border-right: solid var(--muted-color) 1px;
	}

	.color-names {
		display: flex;
		flex-flow: column;
		gap: 8px;
		padding: 10px;
	}
</style>
