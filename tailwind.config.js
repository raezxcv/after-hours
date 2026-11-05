/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'punk-black': '#0a0a0d',
        'punk-black-pure': '#050507',
        'punk-zinc': '#141419',
        'punk-card': '#1a1a22',
        'punk-border': '#272732',
        'dirty-white': '#ede8df',
        'paper-cream': '#f5f0e6',
        'crimson': '#e01e2b',
        'crimson-dark': '#8e0c15',
        'crimson-glow': '#ff3342',
        'faded-gray': '#6b7280',
        'faded-light': '#9ca3af',
        'tape-kraft': '#c8a876',
        'tape-masking': '#d8cca8',
      },
      fontFamily: {
        display: ['"Anton"', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
        body: ['"Space Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
