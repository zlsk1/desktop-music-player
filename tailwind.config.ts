import type { Config } from 'tailwindcss'

export default {
  content: ['./src/renderer/**/*.{js,ts,tsx,jsx}'],
  theme: {
    extend: {
      keyframes: {
        'rotate-self': {
          from: { transform: 'rotate(0)' },
          to: { transform: 'rotate(360deg)' }
        }
      },
      animation: {
        'infinite-rotate': 'rotate-self 15s linear infinite'
      }
    }
  },
  plugins: []
} satisfies Config
