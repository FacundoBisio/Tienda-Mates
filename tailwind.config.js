export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["'DM Serif Display'", "Georgia", "serif"],
        sans:  ["'DM Sans'", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          DEFAULT: "#4C674A",
          light:   "#7F997C",
          dark:    "#3C503A",
          contrast:"#1B241A",
        },
      },
      transitionDuration: {
        400: "400ms",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
