<script lang="ts">
	import { colorName } from '$stores/color-stores';
</script>

<div class="outer">
	<nav>
		<div class="title">
			<a href="/"><h1>{$colorName}</h1></a>
			<span>Color ID</span>
		</div>
	</nav>
	<div />
</div>

<style>
	.outer {
		width: 100%;
		display: flex;
		align-items: center;
	}

	nav {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		list-style: none;
		gap: 10px;
	}

	a {
		color: var(--text-color);
		text-decoration: none;
	}

	a:hover {
		color: var(--primary-color);
	}

	h1 {
		margin: 0;
		font-size: xx-large;
		font-family: 'Courier New', Courier, monospace;
	}

	.title {
		display: flex;
		align-items: center;
		gap: 20px;
	}
</style>
