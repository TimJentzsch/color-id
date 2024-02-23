<script lang="ts">
	import Accessibility from '$lib/sections/Accessibility.svelte';
	import Composition from '$lib/sections/Composition.svelte';
	import Selection from '$lib/sections/Selection.svelte';
	import SvgNames from '$lib/sections/CssNames.svelte';

	let { data } = $props();
</script>

<Selection primary={data.primary} />

<Composition primary={data.primary} />

<SvgNames />

<Accessibility primary={data.primary} secondary={data.secondary} />
