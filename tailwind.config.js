/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Monochromatic base palette
        noir: {
          50: '#f7f7f7',
          100: '#e3e3e3',
          200: '#c8c8c8',
          300: '#a4a4a4',
          400: '#818181',
          500: '#666666',
          600: '#515151',
          700: '#434343',
          800: '#383838',
          900: '#121212',
          950: '#0a0a0a',
        },
        // Gold/Champagne accents for high-ticket luxury
        gold: {
          50: '#fefcf6',
          100: '#fdf9eb',
          200: '#fbf2d4',
          300: '#f7e7ad',
          400: '#f2d87a',
          500: '#edc54a',
          600: '#d4a82a',
          700: '#b0851e',
          800: '#8f6a1e',
          900: '#75581f',
          950: '#3f2b0c',
        },
        champagne: {
          50: '#fdfbf7',
          100: '#faf5eb',
          200: '#f5ead4',
          300: '#eeddb5',
          400: '#e5c98d',
          500: '#dbb06a',
          600: '#cd9350',
          700: '#b07540',
          800: '#935e38',
          900: '#784e31',
          950: '#412818',
        },
        ivory: {
          50: '#fefef9',
          100: '#fdfcf2',
          200: '#fbf9e3',
          300: '#f7f4d0',
          400: '#f2edae',
          500: '#eae485',
          600: '#dace58',
          700: '#c5b145',
          800: '#a1913c',
          900: '#847636',
          950: '#473f1d',
        },
      },
      fontFamily: {
        // Editorial typography for luxury feel
        serif: ['Cormorant Garamond', 'Georgia', 'Cambria', 'serif'],
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
        'hero': ['clamp(3rem, 8vw, 8rem)', { lineHeight: '1' }],
        'display': ['clamp(2rem, 5vw, 4rem)', { lineHeight: '1.1' }],
        'subheading': ['clamp(1.25rem, 2vw, 1.75rem)', { lineHeight: '1.3' }],
      },
      letterSpacing: {
        'ultra-wide': '0.25em',
        'extra-wide': '0.15em',
        'wide': '0.08em',
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'scale-in': 'scaleIn 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      spacing: {
        'section': 'clamp(4rem, 10vh, 8rem)',
      },
    },
  },
  plugins: [],
}
