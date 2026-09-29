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
          bg:          '#07030F',
          dark:        '#0A0619',
          card:        '#0E0820',
          elevated:    '#150D2A',
          purple:      '#2A085C',
          deepPurple:  '#1C0A35',
          royalBlue:   '#1E1B4B',
          accentPink:  '#E11D48',
          orange:      '#F97316',
          gold:        '#F59E0B',
          goldLight:   '#FDE047',
          emerald:     '#10B981',
        }
      },
      fontFamily: {
        sans:    ['"Plus Jakarta Sans"', 'sans-serif'],
        display: ['"Outfit"', 'sans-serif'],
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
        'hero-gradient':    'radial-gradient(ellipse 80% 60% at 50% -5%, rgba(225,29,72,0.22) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 50%, rgba(245,158,11,0.12) 0%, transparent 55%), radial-gradient(ellipse 50% 40% at 20% 70%, rgba(124,58,237,0.18) 0%, transparent 55%), #07030F',
        'card-gradient':    'linear-gradient(145deg, #120929 0%, #0A0619 100%)',
        'gold-gradient':    'linear-gradient(135deg, #FFF176 0%, #FBBF24 40%, #F59E0B 70%, #D97706 100%)',
        'crimson-gradient': 'linear-gradient(135deg, #FCA5A5 0%, #F43F5E 50%, #BE123C 100%)',
        'aurora-gradient':  'linear-gradient(135deg, #FDE047 0%, #F97316 30%, #E11D48 60%, #A855F7 100%)',
        'green-gradient':   'linear-gradient(135deg, #10B981 0%, #059669 50%, #F59E0B 100%)',
        'mandala-dots':     'radial-gradient(circle, rgba(245,158,11,0.09) 1px, transparent 1px), radial-gradient(circle, rgba(225,29,72,0.06) 1px, transparent 1px)',
      },
      boxShadow: {
        'glow-gold':    '0 0 40px -8px rgba(245,158,11,0.45)',
        'glow-crimson': '0 0 40px -8px rgba(225,29,72,0.45)',
        'glow-purple':  '0 0 40px -8px rgba(124,58,237,0.45)',
        'glow-emerald': '0 0 40px -8px rgba(16,185,129,0.45)',
        'card-hover':   '0 24px 60px -12px rgba(0,0,0,0.6), 0 0 0 1px rgba(245,158,11,0.12), 0 0 40px -8px rgba(245,158,11,0.15)',
        'inner-glow':   'inset 0 1px 0 rgba(255,255,255,0.08)',
      },
    },
  },
  plugins: [],
}
