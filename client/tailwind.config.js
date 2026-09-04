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
      borderRadius: {
        'radius-sm': '0.375rem',
        'radius-xl': '1rem',
      },
      boxShadow: {
        'gold-glow': '0 0 14px rgba(212, 175, 55, 0.12)',
        'gold-glow-lg': '0 0 28px rgba(212, 175, 55, 0.18)',
        'gold-glow-xl': '0 0 42px rgba(212, 175, 55, 0.22)',
        'card-shadow': '0 10px 40px -20px rgba(0, 0, 0, 0.5)',
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
        'accordion-down': {
          from: { height: '0', opacity: '0' },
          to: { height: 'var(--radix-accordion-content-height, auto)', opacity: '1' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height, auto)', opacity: '1' },
          to: { height: '0', opacity: '0' },
        },
      },
      animation: {
        shimmer: 'shimmer 12s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
        'accordion-down': 'accordion-down 350ms cubic-bezier(0.22, 1, 0.36, 1)',
        'accordion-up': 'accordion-up 350ms cubic-bezier(0.22, 1, 0.36, 1)',
      },
      padding: {
        'section': 'clamp(3.25rem, 7.2vw, 7.5rem)',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.25rem',
          md: '1.5rem',
          lg: '2rem',
          xl: '2.5rem',
        },
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1280px',
        },
      },
      lineHeight: {
        'heading-1': '1.05',
        'heading-2': '1.1',
        'heading-3': '1.2',
        'body-copy': '1.65',
      },
    },
  },
  plugins: [],
};
