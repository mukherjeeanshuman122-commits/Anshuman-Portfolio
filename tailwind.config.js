/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0A0A0A',
        surface: '#111111',
        card: '#161616',
        concrete: '#1E1E1E',
        bone: '#E8E4D9',
        'bone-dim': 'rgba(232,228,217,0.15)',
        blood: {
          DEFAULT: '#4E26E2',
          dark: '#2A1AD8',
          light: '#7231EC',
          muted: 'rgba(78,38,226,0.2)',
        },
        accent: {
          DEFAULT: '#4E26E2',
          dark: '#2A1AD8',
          light: '#7231EC',
        },
        purple: {
          deep: '#2A1AD8',
          base: '#4E26E2',
          mid: '#7231EC',
          bright: '#953DF5',
          neon: '#B948FF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'evidence-blink': 'evidenceBlink 4s ease-in-out infinite',
        'scratch-flicker': 'scratchFlicker 6s ease-in-out infinite',
        'slow-drift': 'slowDrift 12s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 30s linear infinite',
        'spin-slower': 'spin 45s linear infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.6s ease-out',
        'blink': 'blink 1s step-end infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        evidenceBlink: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.6' },
        },
        scratchFlicker: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '0.8' },
        },
        slowDrift: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '25%': { transform: 'translateY(-8px) translateX(2px)' },
          '50%': { transform: 'translateY(-3px) translateX(-2px)' },
          '75%': { transform: 'translateY(-12px) translateX(1px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        blink: {
          '0%, 100%': { borderColor: 'transparent' },
          '50%': { borderColor: '#4E26E2' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(78,38,226,0.15)' },
          '50%': { boxShadow: '0 0 40px rgba(78,38,226,0.3)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'glow-sm': '0 0 20px rgba(78,38,226,0.15)',
        'glow-md': '0 0 35px rgba(78,38,226,0.2)',
        'glow-lg': '0 0 60px rgba(78,38,226,0.25)',
        'glow-xl': '0 0 80px rgba(78,38,226,0.3)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.6)',
        'glass-lg': '0 16px 48px 0 rgba(0, 0, 0, 0.7)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
    },
  },
  plugins: [],
}
