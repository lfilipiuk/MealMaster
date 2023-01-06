const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.html",
    "./node_modules/flowbite/**/*.js",
    "./node_modules/flowbite-datepicker/**/*.js",
    "./node_modules/flowbite-react/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        proxima: ["Proxima"],
        sans: ["Proxima", "sans-serif"],
      },
      colors: {
        green: {
          light: "#e6f7e9",
          medium: "#d8f0dc",
          DEFAULT: "#14c030",
          dark: "#12ac2b",
        },
        steel: {
          light: "#eeefef",
          medium: "#eaeaea",
          DEFAULT: "#eeefef",
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("flowbite/plugin"),
    // ...
  ],
};
