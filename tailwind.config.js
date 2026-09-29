/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        festive: {
          dark: "#0F071D",
          darker: "#090312",
          card: "#180B30",
          cardHover: "#231145",
          purple: "#2A085C",
          deepPurple: "#1C0A35",
          royalBlue: "#1E1B4B",
          accentPink: "#E11D48",
          orange: "#F97316",
          gold: "#F59E0B",
          goldLight: "#FDE047",
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        display: ['"Outfit"', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'float': 'float 4s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', filter: 'blur(20px)' },
          '50%': { opacity: '0.8', filter: 'blur(30px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'festive-gradient': 'linear-gradient(135deg, #1C0A35 0%, #0F071D 50%, #17072E 100%)',
        'gold-gradient': 'linear-gradient(135deg, #FDE047 0%, #F59E0B 50%, #D97706 100%)',
        'crimson-gradient': 'linear-gradient(135deg, #F43F5E 0%, #E11D48 50%, #9F1239 100%)',
        'royal-gradient': 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 50%, #1E1B4B 100%)',
        'hero-pattern': 'radial-gradient(circle at 50% 20%, rgba(225, 29, 72, 0.25) 0%, rgba(245, 158, 11, 0.15) 30%, rgba(15, 7, 29, 0.95) 75%)',
      }
    },
  },
  plugins: [],
}
