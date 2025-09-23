export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        "988px": "988px",
        "1356px": "1356px",
        "668px": "668px",
      },
      colors: {
        primary: "hsl(var(--color-primary) / <alpha-value>)",
        secondary: "hsl(var(--color-secondary) / <alpha-value>)",
        navbar: "hsl(var(--color-navbar) / <alpha-value>)",
        oscuro: "hsl(var(--color-text-primary) / <alpha-value>)",
        grisclaro: "hsl(var(--color-text-secondary) / <alpha-value>)",
        grisoscuro: "hsl(var(--color-text-secondary-v2) / <alpha-value>)",
      },
      fontFamily: {
        worksans: ["Work Sans", "sans-serif"],
        raleway: ["Raleway", "sans-serif"],
      },
    },
  },
  plugins: [],
};
