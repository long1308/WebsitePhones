// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./**/*.{html,ts,tsx}"],
//   // content: ["./src/**/*.{html,ts,tsx}"],
//   // prefix: "tw-",
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };
module.exports = {
  purge: ["./**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "red-primary": "#D70018",
        "red-secondary": "#707070",
      },
      fontFamily: {
        sans: [
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
