/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      screens: {
        xs: { max: "560px" },
        sm: { max: "768px" },
        md: { max: "992px" },
        lg: { max: "1200px" },
        xl: { max: "1440px" },
        "2xl": { max: "1560px" },
      },
    },
  },
  plugins: [],
};
