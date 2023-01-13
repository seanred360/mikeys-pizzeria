/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      swissGrey: "#DDE0D3",
      swissPink: "#E92A5D",
      swissOrange: "#E75C33",
      swissBlue: "#27212b",
    },
    backgroundImage: {
      "black-slate": "url('/images/black-slate.jpg')",
    },
    boxShadow: {
      custom: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    },
  },
  screens: {
    sm: "576px",
    // => @media (min-width: 640px) { ... }

    md: "768px",
    // => @media (min-width: 768px) { ... }

    lg: "992px",
    // => @media (min-width: 1024px) { ... }

    xl: "1200px",
    // => @media (min-width: 1280px) { ... }

    "2xl": "1400px",
    // => @media (min-width: 1536px) { ... }
  },
};
