import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	resolve: {
		alias: {
			$stores: path.resolve('./src/stores'),
			$utils: path.resolve('./src/utils')
		}
	}
};

export default config;
