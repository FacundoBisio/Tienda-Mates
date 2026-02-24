export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#4C674A",  // verde principal (marrones)
          light: "#7F997C",    // verde claro (amarillos)
          dark: "#3C503A",     // hover/active
          contrast: "#1B241A", // texto sobre brand-light
        },
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};