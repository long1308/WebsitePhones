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
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "red-primary": "#D70018",
        "red-secondary": "#707070",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
