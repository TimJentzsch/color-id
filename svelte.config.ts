import adapter from '@sveltejs/adapter-node';
import { Config } from '@sveltejs/kit';
import preprocess from 'svelte-preprocess';

const config: Config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		alias: {
			$lib: './src/lib',
			$stores: './src/stores',
			$utils: './src/utils'
		}
	}
};

export default config;
