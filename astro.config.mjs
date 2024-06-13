import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';
import netlify from '@astrojs/netlify';
import compress from 'astro-compress';

import partytown from '@astrojs/partytown';

// https://astro.build/config
export default defineConfig({
	integrations: [
		tailwind({
			applyBaseStyles: false
		}),
		icon(),
		partytown({
			config: {
				forward: ['dataLayer.push']
			}
		}),
		compress({
			CSS: false
		})
	],
	output: 'hybrid',
	adapter: netlify()
});
