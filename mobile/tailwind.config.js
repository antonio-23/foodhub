/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customBreakfastBg: "#F0FDF4",
        customDinnerBg: "#EFF6FF",
        customSnackBg: "#F5F3FF",
        customSupperBg: "#FDF2F8",
      },
    },
  },
  plugins: [],
};
