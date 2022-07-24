<script lang="ts">
	import { formatHex, type Color } from 'culori';

	export let name: string | undefined = undefined;
	export let color: Color;

	$: hex = formatHex(color);
</script>

<div class="outer">
	<div class="container">
		<div class="preview" style="--color-hex: {hex}" />
		<div class="names">
			{#if name}
				<strong class="name">{name}</strong>
			{:else}
				<span class="hex-name">{hex}</span>
			{/if}
		</div>
	</div>
</div>

<style>
	.outer {
		display: inline-block;

		font-size: small;
	}

	.container {
		display: inline-flex;
		align-items: center;

		background-color: var(--surface-color);
		border: solid var(--muted-color) 1px;
		border-radius: 5px;
	}

	.preview {
		width: 22px;
		height: 22px;
		background-color: var(--color-hex);
		border-right: solid var(--muted-color) 1px;
		border-radius: 5px 0px 0px 5px;
	}

	.names {
		display: flex;
		flex-flow: column;
		gap: 2px;
		padding: 2px 5px;
	}

	.name,
	.hex-name {
		font-family: 'Courier New', Courier, monospace;
	}
</style>
