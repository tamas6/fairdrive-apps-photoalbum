module.exports = {
  content: [
    // Example content paths...
    './public/**/*.html',
    './**/*.{ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
};
