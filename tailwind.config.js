export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-dm-serif)", "Georgia", "serif"],
        sans:  ["var(--font-dm-sans)", "system-ui", "sans-serif"],
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
  plugins: [],
};
