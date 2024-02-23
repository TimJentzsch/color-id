<script lang="ts">
	import { formatHex, type Color } from 'culori';

	const { name = undefined, color } = $props<{ name?: string; color: Color }>();

	const hex = $derived(formatHex(color));
</script>

<div class="outer">
	<div class="container">
		<div class="preview" style="--color-hex: {hex}" />
		<div class="names">
			{#if name}
				<strong class="name">{name}</strong>
			{/if}
			{#if name === undefined || name !== hex}
				<span class="hex-name">{hex}</span>
			{/if}
		</div>
	</div>
</div>

<style>
	.container {
		display: inline-flex;
		align-items: center;

		background-color: var(--surface-color);
		border: solid var(--muted-color) 1px;
		border-radius: 5px;

		min-width: 200px;
	}

	.preview {
		width: 50px;
		height: 50px;
		background-color: var(--color-hex);
		border-right: solid var(--muted-color) 1px;
		border-radius: 5px 0px 0px 5px;
	}

	.names {
		display: flex;
		flex-flow: column;
		gap: 2px;
		padding: 5px;
	}

	.name,
	.hex-name {
		font-family: 'Courier New', Courier, monospace;
	}
</style>
