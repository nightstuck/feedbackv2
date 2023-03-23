/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
	content: ["./app/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
	theme: {
		screens: {
			sp: "480px",
			tablet: "768px",
			laptop: "976px",
			pc: "1440px",
		},
		colors: {
			transparent: "#00000000",
			white: "#fff",
			black: "#000",
			red: colors.red,
			blue: "#1fb6ff",
			purple: "#7e5bef",
			pink: "#ff49db",
			orange: "#ff7849",
			green: "#13ce66",
			"c-green": colors.green,
			yellow: "#ffc82c",
			"gray-dark": "#273444",
			gray: "#8492a6",
			"gray-light": "#d3dce6",
			"gray-superlight": "#f0f0f0",
		},
		fontFamily: {
			sans: ["Graphik", "sans-serif"],
			serif: ["Merriweather", "serif"],
			segoe: ["Segoe UI", "Tahoma", "Geneva", "Verdana"],
		},
		extend: {
			backgroundImage: {
				"dark-bg": "url('../public/background.jpg')",
			},
			spacing: {
				"1px": "1px",
				"2px": "2px",
				112: "30rem",
				128: "32rem",
				144: "36rem",
				"2px": "2px",
				"90pc": "90%",
				"95pc": "95%",
			},
			borderRadius: {
				"4xl": "2rem",
			},
			boxShadow: {
				"inner-sm": "inset 0 1px 2px 0 rgb(0 0 0 / 0.05)",
			},
		},
	},
	plugins: [require("tailwind-scrollbar")],
};
