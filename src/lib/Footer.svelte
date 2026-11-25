<script lang="ts">
	import { resolve } from '$app/paths';
</script>

<div class="container">
	<div>
		<strong>color-id</strong>, © 2022 Tim Jentzsch.
	</div>
	<div>
		This project is available open source on
		<a href="https://github.com/TimJentzsch/color-id">GitHub</a>, licensed MIT.
	</div>
	<div>
		<a href={resolve('/privacy')}>Privacy Policy</a>
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-flow: column;
		align-items: center;
		justify-content: center;
		gap: 10px;
	}

	* {
		color: var(--muted-color);
		text-align: center;
	}
</style>
