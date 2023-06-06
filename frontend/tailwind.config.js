/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				ghostwithe: '#F8F8FF',
			},
			fontFamily: {
				Montserrat: ['montserrat', 'sans-serif'],
			},
		},
	},
	plugins: [],
};
