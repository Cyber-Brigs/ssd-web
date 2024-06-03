/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        "custom-blue": "#009edb",
        "light-blue": "#E2EDF1",
        "custom-bg": "var(--Blue, #2B59FF)",
      },
      colors: {
        "custom-blue": "#009ebd",
        "custom-grey": "#EDEDED",
        "custom-purple": "#A162F7",
        "custom-light-grey": "#9B9B9B",
      },
      screens: {
        xs: "300px",
        ss: "620px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },

      fontFamily: {
        "lexend-exa": ["Lexend Exa", "sans-serif"],
      },

      lineHeight: {
        34: "34px",
      },
    },
  },
  plugins: [],
};
