import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bone: '#fbfbfa',
        obsidian: {
          DEFAULT: '#252724',
          hover: '#3b3e39',
          light: '#42453f',
        },
        sage: {
          DEFAULT: '#5a8357',
          light: '#eef2ec',
          badge: '#e7f2e4',
          ring: '#668c63',
          dark: '#3e5c3c',
        },
      },
      fontFamily: {
        serif: ['Fraunces', 'serif'],
        sans: ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
