import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#166534',
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#22C55E',
          600: '#16A34A',
          700: '#166534',
          800: '#15803D',
          900: '#14532D',
        },
        accent: {
          DEFAULT: '#F59E0B',
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        earth: {
          DEFAULT: '#78350F',
          50: '#FEF3C7',
          100: '#FDE68A',
          200: '#FCD34D',
          300: '#F59E0B',
          400: '#D97706',
          500: '#B45309',
          600: '#92400E',
          700: '#78350F',
          800: '#65 2D0D',
          900: '#52240B',
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
