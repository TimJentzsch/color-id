<script lang="ts">
	import LinkableHeading from '$lib/LinkableHeading.svelte';
	import { similarNamedColors } from '$stores/color-stores';
</script>

<LinkableHeading text="Similar CSS Colors" />

{#each $similarNamedColors as similarColor}
	<div>{similarColor.name}</div>
{/each}
