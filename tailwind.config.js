/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        white: '#e2e8f0',
        black: '#050816',
        bg: '#050816',
        surface: 'rgba(15, 20, 50, 0.6)',
        card: 'rgba(15, 20, 50, 0.8)',
        concrete: 'rgba(15, 20, 50, 0.5)',
        bone: '#e2e8f0',
        'bone-dim': 'rgba(226,232,240,0.15)',
        blood: {
          DEFAULT: '#6366f1',
          dark: '#4338ca',
          light: '#818cf8',
          muted: 'rgba(99,102,241,0.2)',
        },
        accent: {
          DEFAULT: '#6366f1',
          dark: '#4338ca',
          light: '#818cf8',
        },
        blue: {
          deep: '#1e3a8a',
          base: '#3b82f6',
          mid: '#60a5fa',
          bright: '#93c5fd',
          neon: '#60a5fa',
        },
        purple: {
          deep: '#581c87',
          base: '#7c3aed',
          mid: '#8b5cf6',
          bright: '#a78bfa',
          neon: '#c084fc',
        },
        indigo: {
          deep: '#312e81',
          base: '#4f46e5',
          mid: '#6366f1',
          bright: '#818cf8',
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
        'gradient-shift': 'gradientShift 6s ease infinite',
        'aurora': 'aurora 15s ease infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
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
          '50%': { borderColor: '#818cf8' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(99,102,241,0.2), 0 0 40px rgba(139,92,246,0.1)' },
          '50%': { boxShadow: '0 0 40px rgba(99,102,241,0.35), 0 0 80px rgba(139,92,246,0.2)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        aurora: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '25%': { backgroundPosition: '100% 50%' },
          '50%': { backgroundPosition: '100% 0%' },
          '75%': { backgroundPosition: '0% 100%' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      boxShadow: {
        'glow-sm': '0 0 20px rgba(99,102,241,0.2), 0 0 40px rgba(139,92,246,0.1)',
        'glow-md': '0 0 35px rgba(99,102,241,0.25), 0 0 70px rgba(139,92,246,0.15)',
        'glow-lg': '0 0 60px rgba(99,102,241,0.3), 0 0 120px rgba(139,92,246,0.2)',
        'glow-xl': '0 0 80px rgba(99,102,241,0.35), 0 0 160px rgba(139,92,246,0.25)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.4)',
        'glass-lg': '0 16px 48px 0 rgba(0, 0, 0, 0.5)',
        'neon-blue': '0 0 10px rgba(59,130,246,0.5), 0 0 40px rgba(59,130,246,0.2)',
        'neon-purple': '0 0 10px rgba(139,92,246,0.5), 0 0 40px rgba(139,92,246,0.2)',
        'neon-mixed': '0 0 15px rgba(99,102,241,0.4), 0 0 45px rgba(139,92,246,0.2), 0 0 80px rgba(59,130,246,0.1)',
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
