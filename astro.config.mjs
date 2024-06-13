import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';
import netlify from '@astrojs/netlify';

import compress from 'astro-compress';

// https://astro.build/config
export default defineConfig({
	integrations: [
		tailwind({
			applyBaseStyles: false
		}),
		icon(),
		compress({
			CSS: false
		})
	],
	output: 'hybrid',
	adapter: netlify()
});
