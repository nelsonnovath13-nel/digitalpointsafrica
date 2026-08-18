/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#07090a",
          900: "#0c1113",
          800: "#141b1d",
          700: "#1d2628",
        },
        point: {
          50: "#eafdf9",
          100: "#c7f7ec",
          200: "#8fefd9",
          300: "#4fdfc2",
          400: "#20cbab",
          500: "#0eab8f",
          600: "#0a8873",
          700: "#0b6d5e",
          800: "#0d564b",
          900: "#0c443d",
        },
        graphite: "#3a3d3e",
        cream: {
          50: "#fdfbf6",
          100: "#f7f1e6",
          200: "#efe6d3",
        },
        accent: {
          500: "#ff7a45",
        },
      },
      fontFamily: {
        display: ["'Mona Sans'", "sans-serif"],
        body: ["'Mona Sans'", "sans-serif"],
        poppins: ["'Poppins'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
