<script lang="ts">
	import { onMount } from 'svelte';

	export let text: string;

	$: urlText = text.toLowerCase().replaceAll(' ', '-');

	$: id = `linkable-heading_${urlText}`;

	/** Scroll to the given heading. */
	function scrollToHeading(): void {
		document
			.getElementById(id)
			?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
	}

	onMount(() => {
		const hash = window.location.hash;

		// If the hash is the heading, scroll to it
		if (hash === `#${urlText}`) {
			scrollToHeading();
		}
	});
</script>

<a {id} on:click={scrollToHeading} href="#{urlText}"><h2>{text}</h2></a>

<style>
	a {
		text-decoration: none;
	}

	a:hover {
		text-decoration: underline;
	}
</style>
