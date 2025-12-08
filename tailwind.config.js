export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#145231',
        },
        secondary: '#34d399',
        accent: '#059669',
        void: '#0a0a0a',
        'neon-purple': '#b026ff',
        'electric-blue': '#2979ff',
        custom: {
          primary: '#2054FA',
          secondary: '#333',
          mainBg: '#200268',
          bgGrey: '#F5F6F8',
          bgDark: '#161616',
          footerBg: '#525D5E',
          red: '#C11A22',
        },
      },

      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        syne: ['Syne', 'sans-serif'],
        space: ['Space Grotesk', 'sans-serif'],
        primary: ['Primary', 'serif'],
        secondary: ['Secondary', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
  safelist: [
    {
      pattern: /^bg-(primary|secondary|accent)-(50|100|200|300|400|500|600|700|800|900)$/,
    },
    {
      pattern: /^text-(primary|secondary|accent)-(50|100|200|300|400|500|600|700|800|900)$/,
    },
    {
      pattern: /^ring-(primary|secondary|accent)-(50|100|200|300|400|500|600|700|800|900)$/,
    },
  ],
}
