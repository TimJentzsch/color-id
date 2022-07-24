<script lang="ts">
	export let foregroundHex: string;
	export let foregroundName: string;
	export let backgroundHex: string;
	export let backgroundName: string;
</script>

<figure>
	<figcaption>
		<strong class="name">{foregroundName}</strong> on <strong class="name">{backgroundName}</strong>
	</figcaption>
	<div
		class="container"
		style="--foreground-hex: {foregroundHex}; --background-hex: {backgroundHex}"
	>
		<div class="large">Sample Large</div>
		<div class="small">Sample Small</div>
	</div>
</figure>

<style>
	figure {
		display: flex;
		flex-flow: column;
		align-items: center;
		gap: 10px;
		margin: 0;
		min-width: 250px;
	}

	.container {
		display: flex;
		flex-flow: column;
		align-items: center;
		gap: 20px;

		padding: 10px;

		background-color: var(--background-hex);
		color: var(--foreground-hex);
		border: solid var(--muted-color) 1px;
	}

	.large {
		font-size: larger;
	}

	.small {
		text-align: center;
	}

	.name {
		font-family: 'Courier New', Courier, monospace;
	}
</style>
