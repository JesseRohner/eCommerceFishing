/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/disclaimers/**/*.{js,ts,jsx,tsx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx}",
    "./src/modals/**/*.{js,ts,jsx,tsx}",
    "./src/modules/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    colors: {
      transparent: "transparent",
      white: "#fff",
      black: "#000",
      purple: {
        100: "#F1EEFD",
        200: "#E1DCF5",
        400: "#7942EB",
        500: "#6935D3",
        600: "#6634CC",
      },
      green: {
        300: "#A6F5ED",
        400: "#6CE0D5",
        500: "#19D3C5",
        600: "#0BB8A9",
      },
      blue: {
        100: "#F1F5F8",
        200: "#E4EBF0",
        300: "#E7E8EB",
        400: "#B4BACC",
        500: "#939DB8",
        600: "#656D85",
        700: "#58617A",
        800: "#354266",
        900: "#192851",
        1000: "#16203D",
      },
      yellow: {
        100: "#FCF5DE",
        500: "#F5C849",
        600: "#DEB647",
      },
      red: {
        100: "#FAF0F3",
        600: "#CC396B",
        700: "#D6336B",
        800: "#C22F61",
      },
      gray: {
        100: "#F3F6F8",
        200: "rgba(101, 109, 133, 0.64)",
        300: "#CED3E0",
      },
    },
    extend: {
      boxShadow: {
        toast:
          "0px 1px 18px 0px rgba(0, 0, 0, 0.12), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 3px 5px -1px rgba(0, 0, 0, 0.2)",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
}
