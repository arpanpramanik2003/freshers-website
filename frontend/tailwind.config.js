/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF0000",   // Red
        secondary: "#FFD700", // Yellow
        dark: "#000000",      // Black
        light: "#FFFFFF",     // White
      },
    },
  },
  plugins: [],
}
