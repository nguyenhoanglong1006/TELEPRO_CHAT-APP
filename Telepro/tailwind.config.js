module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#242526",
        "dark-lighten": "#3A3B3C",
        primary: "var(--primary-color)",
        secondary: "#0068FF",
        light: "#f5f5f5",
        "less-lighten": "#d1d1d1",
        lighten: "#ededed",
        "light-blue": "#d7e5f7",
        green: "#42f590",
        grey: "#b0b0b0",
        "deep-blue": "#d4e5fc",
        "hover-blue": "#3b8cff",
      },
    },
    keyframes: {
      "fade-in": {
        from: { opacity: 0 },
        to: { opacity: 1 },
      },
    },
    animation: {
      "fade-in": "fade-in 0.3s forwards",
    },
  },
  plugins: [],
};
