/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#060B14",
        surface: "#0E1623",
        panel: "#111B2B",
        text: "#DEE6F2",
        ink: "#B9C4D4",
        accent: "#53C9C2",
        accent2: "#67D4CD",
      },
      boxShadow: {
        glow: "0 0 18px rgba(83, 201, 194, 0.18)",
        soft: "0 10px 30px rgba(0, 0, 0, 0.25)",
      },
      borderRadius: {
        xl2: "1rem",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        mono: ["JetBrains Mono", "ui-monospace"],
      },
    },
  },
  plugins: [],
};
