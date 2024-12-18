/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brown: "#6C534E",
        pink: "#A67F8E",
        lightpink: "#C89FA3",
        jasmine: "#F7D488",
        dogwood: "#CEB5A7",
        paledogwood: "#D4BEBE",
        cream: "#EAEFB1",
        nyanza: "#E9F7CA",
        rosy: "#FAD8D6",
        lavendar: "#D5CFE1",
        coolgray: "#A09ABC",
        caribbean: "#006C67",
        midnight: "#003844"
      },
      fontFamily: {
        script: ["Style Script", 'sans-serif'],
        lavish: ["Lavishly Yours", 'cursive'],
      },
    },
  },
  plugins: [],
};
