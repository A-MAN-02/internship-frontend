/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        shine: {
          "0%": { transform: "translateX(-150%) translateY(-150%) rotate(25deg)" },
          "100%": { transform: "translateX(150%) translateY(150%) rotate(25deg)" },
        },
      },
      animation: {
        shine: "shine 3.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
