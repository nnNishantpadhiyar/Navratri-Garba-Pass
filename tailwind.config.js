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
          bg:          '#0a1128',
          dark:        '#060b1c',
          card:        '#112046',
          elevated:    '#162556',
          blue:        '#1d4ed8',
          royalBlue:   '#2563eb',
          skyBlue:     '#38bdf8',
          deepBlue:    '#0b1739',
          yellow:      '#facc15',
          gold:        '#fbbf24',
          goldLight:   '#fef08a',
          amber:       '#f59e0b',
          emerald:     '#10b981',
          accentPink:  '#facc15',
        }
      },
      fontFamily: {
        sans:    ['"DM Sans"', '"Plus Jakarta Sans"', 'sans-serif'],
        display: ['"Libre Baskerville"', '"Outfit"', 'serif'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      animation: {
        'pulse-glow':   'pulseGlow 4s ease-in-out infinite',
        'float':        'float 5s ease-in-out infinite',
        'float-slow':   'floatSlow 7s ease-in-out infinite',
        'shimmer':      'shimmer 2.5s linear infinite',
        'slide-up':     'slideUp 0.6s ease forwards',
        'fade-in':      'fadeIn 0.5s ease forwards',
        'spin-slow':    'spin 20s linear infinite',
        'marquee':      'marquee 28s linear infinite',
        'bounce-soft':  'bounceSoft 2s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%':      { opacity: '0.7', transform: 'scale(1.06)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%':      { transform: 'translateY(-15px) rotate(3deg)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-300% 0' },
          '100%': { backgroundPosition: '300% 0' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(-4px)' },
          '50%':      { transform: 'translateY(4px)' },
        },
      },
      backgroundImage: {
        'hero-gradient':    'radial-gradient(ellipse 80% 60% at 50% -5%, rgba(37,99,235,0.3) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 50%, rgba(250,204,21,0.18) 0%, transparent 55%), #0a1128',
        'card-gradient':    'linear-gradient(145deg, #112046 0%, #0c1736 100%)',
        'gold-gradient':    'linear-gradient(135deg, #fffbeb 0%, #fef08a 25%, #facc15 60%, #eab308 100%)',
        'blue-gradient':    'linear-gradient(135deg, #93c5fd 0%, #3b82f6 50%, #1d4ed8 100%)',
        'aurora-gradient':  'linear-gradient(135deg, #fde047 0%, #facc15 35%, #38bdf8 70%, #2563eb 100%)',
      },
      boxShadow: {
        'glow-gold':    '0 0 40px -8px rgba(250,204,21,0.5)',
        'glow-blue':    '0 0 40px -8px rgba(37,99,235,0.5)',
        'card-hover':   '0 24px 60px -12px rgba(2,6,23,0.6), 0 0 0 1px rgba(250,204,21,0.2), 0 0 40px -8px rgba(250,204,21,0.2)',
      },
    },
  },
  plugins: [],
}
