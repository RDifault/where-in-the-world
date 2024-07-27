/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dblue: {
          300: "#2b3945",
          500: "#202c37",
          700: "#111517",
        },
        dgray: {
          50: "#fafafa",
          300: "#858585",
        },
      },
    },
  },
  plugins: [],
};
