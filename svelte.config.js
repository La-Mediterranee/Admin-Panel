import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({
		defaults: {
			script: 'typescript',
			style: 'scss'
		},
		scss: {
			includePaths: ['theme', 'src/styles', 'node_modules']
		},
		sourceMap: process.env.NODE_ENV === 'development' ? true : false
	}),

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte'
	}
};

export default config;
