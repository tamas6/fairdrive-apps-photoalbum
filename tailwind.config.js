module.exports = {
  content: ['./public/**/*.html', './**/*.{ts,tsx}'],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
};
