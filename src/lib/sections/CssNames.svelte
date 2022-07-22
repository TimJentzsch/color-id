<script lang="ts">
	import ColorMedium from '$lib/color-preview/ColorMedium.svelte';
	import LinkableHeading from '$lib/LinkableHeading.svelte';
	import { similarNamedColors } from '$stores/color-stores';
</script>

<LinkableHeading text="Similar CSS Colors" />

<div class="color-list">
	{#each $similarNamedColors as { name, rgb }}
		<ColorMedium {name} color={rgb} />
	{/each}
</div>

<style>
	.color-list {
		display: flex;
		flex-flow: row wrap;
		gap: 10px;
	}
</style>
