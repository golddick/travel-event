/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: [
    "lg:rotate-[-5deg]",
    "lg:rotate-[5deg]",
    "lg:rotate-[0deg]",
  ],
  theme: {
    extend: {
      fontFamily: {
        dmsans: ["var(--font-dm-sans)", "Helvetica"],
        dmserif: ["var(--font-dm-serif)", "Roboto"],
        dmserifitalics: ["var(--font-dm-SerifItalics)", "sans-serif"],
        nunitosans: ["var(--font-nunitosans)", "sans-serif"],
        nunito: ["var(--font-nunito)", "sans-serif"],
        robotoflex: ["var(--font-robotoflex)", "sans-serif"],
        librefranklin: ["var(--font-librefranklin)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
