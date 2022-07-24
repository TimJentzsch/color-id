<script lang="ts">
	import { colorName } from '$stores/color-stores';
</script>

<div class="outer">
	<nav>
		<div class="title">
			<a href="/">
				<img src="/logo.svg" alt="Logo" height={30} />
				<h1>{$colorName}</h1>
			</a>
			<span class="site-name">Color ID</span>
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

	.title a {
		display: flex;
		gap: 15px;
		align-items: center;
	}

	@media only screen and (max-device-width: 480px) {
		.site-name {
			display: none;
		}

		.title h1 {
			font-size: x-large;
		}
	}
</style>
