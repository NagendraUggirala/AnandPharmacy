/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}', // Adjust paths based on your project structure
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#E0F2FE',
          DEFAULT: '#3B82F6',
          dark: '#1E3A8A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [

  ],
}

