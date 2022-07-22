<script lang="ts">
	import { colorName, colorHex, colorDescription } from '$stores/color-stores';
</script>

<div class="container">
	<div class="preview" style="--color-hex: {$colorHex}" />
	<div class="color-names">
		<strong class="name">{$colorName}</strong>
		{#if $colorName !== $colorHex}
			<span class="hex-name">{$colorHex}</span>
		{/if}
		<span class="description">"{$colorDescription}"</span>
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
</style>
