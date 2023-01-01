/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				gray: {
					100: '#f7f8fd',
					200: '#f2f4fe',
					300: '#c3c7d9',
					400: '#647196',
					500: '#3a4374',
					600: '#373f68'
				},
				blue: {
					100: '#cfd7ff',
					200: '#62bcfa',
					300: '#7c91f9',
					400: '#4661e6'
				},
				purple: {
					100: '#c75af6',
					200: '#ad1fea'
				},
				orange: {
					100: '#f49f85'
				}
			},
			fontFamily: {
				sans: ['Jost', 'sans-serif']
			}
		},
		fontSize: {
			xs: ['13px', '19px'],
			sm: ['15px', '22px'],
			base: ['16px', '23px'],
			lg: ['18px', '26px'],
			xl: ['20px', '29px'],
			'2xl': ['24px', '35px']
		},
		container: {
			center: true,
			padding: {
				DEFAULT: '24px'
			}
		}
	},
	plugins: []
};
