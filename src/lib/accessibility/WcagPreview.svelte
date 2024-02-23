<script lang="ts">
	const { foregroundHex, foregroundName, backgroundHex, backgroundName } = $props<{
		foregroundHex: string;
		foregroundName: string;
		backgroundHex: string;
		backgroundName: string;
	}>();
</script>

<figure>
	<figcaption>
		<strong class="name">{foregroundName}</strong> on <strong class="name">{backgroundName}</strong>
	</figcaption>
	<div
		class="container"
		style="--foreground-hex: {foregroundHex}; --background-hex: {backgroundHex}"
	>
		<div class="relaxed-requirements">
			<div class="large">Large text (18pt)</div>
			<div class="bold">Bold text (14pt)</div>
		</div>
		<div class="normal-requirements">
			<div class="small">Normal text (12pt)</div>
		</div>
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

		background-color: var(--background-hex);
		color: var(--foreground-hex);
		border: solid var(--muted-color) 1px;
	}

	.relaxed-requirements,
	.normal-requirements {
		display: flex;
		flex-flow: column;
		align-items: center;
		gap: 5px;
		padding: 10px;
	}

	.large {
		font-size: 18pt;
	}

	.bold {
		font-size: 14pt;
		font-weight: bold;
	}

	.small {
		font-size: 12pt;
	}

	.name {
		font-family: 'Courier New', Courier, monospace;
	}

	@media only screen and (max-device-width: 480px) {
		figure {
			width: 100%;
		}
	}
</style>
