/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				nunito: ['Nunito', 'sans-serif']
			}
		}
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: '#FF7992', // pink
					secondary: '#242424', // gray
					accent: '#8065b1', // purple
					neutral: '#000000', // black
					'base-100': '#ffffff', // white
					'--rounded-btn': '3px' // border radius rounded-btn utility class, used in buttons and similar elements
				}
			}
		]
	}
};
