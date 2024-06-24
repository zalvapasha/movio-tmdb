/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1c1a24',
        'primary-1': '#282633',
        'primary-2': '#312f3d',
        'primary-3': '#555261',
        secondary: '#8878ff',
        tertiary: '#ff159a',
        quaternary: '#6f6c7a',
      },
    },
  },
  plugins: [],
}
