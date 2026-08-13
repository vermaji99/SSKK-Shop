/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#05020A',
          secondary: '#09040F',
          tertiary: '#100719',
        },
        purple: {
          900: '#100719',
          800: '#1A0B2E',
          700: '#24103D',
          600: '#35105A',
          500: '#4B1F6F',
        },
        gold: {
          DEFAULT: '#D4AF37',
          500: '#C9A227',
          400: '#D4AF37',
          300: '#E7C65A',
          200: '#F4D77B',
          100: '#F8E9A8',
        },
        cream: {
          DEFAULT: '#F8F5EE',
          50: '#FBF9F4',
        },
        text: {
          DEFAULT: '#F5F1E8',
          muted: '#B8AFC0',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Cormorant Garamond', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'gold-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(212, 175, 55, 0.6)' },
        },
      },
      animation: {
        shimmer: 'shimmer 3s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
        'gold-glow': 'gold-glow 2s ease-in-out infinite',
      },
      boxShadow: {
        'gold-glow': '0 0 20px rgba(212, 175, 55, 0.3)',
        'gold-glow-lg': '0 0 40px rgba(212, 175, 55, 0.5)',
        'gold-glow-xl': '0 0 60px rgba(212, 175, 55, 0.7)',
      },
    },
  },
  plugins: [],
};
