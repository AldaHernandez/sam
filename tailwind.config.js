const { heroui } = require("@heroui/react");

/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#AF3E3E", //rojo fuerte
        secondary: "#DA6C6C", // rojo suave
        background: "#EAEBD0", // beige
        black: "#1C2321", // negro
      },
      fontFamily: {
        lora: ['"Lora"', 'serif'],
        afacad: ['Afacad Flux', 'sans-serif']
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
}

