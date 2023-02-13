<script lang="ts">
	import Accessibility from '$lib/sections/Accessibility.svelte';
	import Composition from '$lib/sections/Composition.svelte';
	import Selection from '$lib/sections/Selection.svelte';
	import SvgNames from '$lib/sections/CssNames.svelte';
	import type { PageData } from './$types';
	import { colorName } from '$stores/color-stores';
	import { secColorName } from '$stores/secondary-color-stores';

	export let data: PageData;

	// Initialize colors from page load
	$colorName = data.color;
	$secColorName = data.secondaryColor;
</script>

<Selection />

<Composition />

<SvgNames />

<Accessibility />
