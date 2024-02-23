<script lang="ts">
	import { formatHex, type Color } from 'culori';

	const {
		name = undefined,
		color,
		onSelect
	} = $props<{
		name?: string;
		color: Color;
		onSelect?: (color: string) => void;
	}>();

	const hex = $derived(formatHex(color));

	function internalOnSelect() {
		if (onSelect !== undefined) {
			onSelect(name || hex);
		}
	}
</script>

<button
	class="outer"
	on:click={internalOnSelect}
	disabled={onSelect === undefined}
	title="Set {name || hex} as color"
>
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
</button>

<style>
	.outer {
		display: inline-block;

		font-size: small;

		border: none;
		padding: 0;
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
