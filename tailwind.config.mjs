/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				nunito: ['Nunito', 'sans-serif'],
				monsterrat: ['Montserrat, sans-serif']
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
					'base-200': '#d3d3d3', // light gray
					'--rounded-btn': '3px' // border radius rounded-btn utility class, used in buttons and similar elements
				}
			}
		]
	}
};
