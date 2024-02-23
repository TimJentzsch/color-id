<script lang="ts">
	import ColorMedium from '$lib/color-preview/ColorMedium.svelte';
	import LinkableHeading from '$lib/LinkableHeading.svelte';
</script>

<LinkableHeading text="Similar CSS Colors" />

<!-- <div class="color-list">
	{#each $similarNamedColors as { name, rgb }}
		<ColorMedium {name} color={rgb} />
	{/each}
</div> -->

<style>
	.color-list {
		display: flex;
		flex-flow: row wrap;
		align-items: center;
		justify-content: center;
		gap: 10px;
	}
</style>
