/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        zifora: {
          dark: '#092820',
          base: '#0F3E32',      // Deep Forest Emerald (Warna primer berkelas)
          jade: '#1B5E4B',      // Rich Jade Green
          light: '#2D7D67',     // Lighter emerald for hovers
          soft: '#4E9B84',
          mint: '#E8F3EE',      // Soft Mint Whisper untuk background bersih
          mintLight: '#F3FAF6',
          gold: '#D4AF37',      // Royal Islamic Gold
          goldWarm: '#C5A059',
          goldSoft: '#FAF5E8',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        'zifora': '0 10px 30px -5px rgba(15, 62, 50, 0.08), 0 4px 6px -2px rgba(15, 62, 50, 0.04)',
        'zifora-lg': '0 20px 40px -10px rgba(15, 62, 50, 0.14)',
        'glass': '0 8px 32px 0 rgba(15, 62, 50, 0.06)',
      }
    },
  },
  plugins: [],
}
