import adapter from '@sveltejs/adapter-auto'
import { vitePreprocess } from '@sveltejs/kit/vite'
import path from 'path'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),
		alias: {
			// these are the aliases and paths to them
			$components: path.resolve('./src/lib/components'),
			$assets: path.resolve('./src/lib/assets'),
			$types: path.resolve('./src/lib/types')
		}
	}
}

export default config
