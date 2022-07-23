<script>
	import ColorInputForm from '$lib/ColorInputForm.svelte';
	import LinkableHeading from '$lib/LinkableHeading.svelte';
</script>

<LinkableHeading text="Accessibility" />

<ColorInputForm
	colorName="red"
	promptText="Choose a color for contrast checks:"
	generateButtonText="auto"
	generateColor={() => 'auto'}
/>
