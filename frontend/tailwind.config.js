/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6366f1",
        secondary: "#8b5cf6",
        accent: "#d946ef",
        neutral: "#1f2937",
        "chat-bg": "#0f172a",
        "chat-bubble-user": "#4f46e5",
        "chat-bubble-other": "#1e293b",
      },
      backgroundImage: {
        'premium-gradient': 'linear-gradient(to bottom right, #4c1d95, #1e3a8a)',
        'glass-gradient': 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        chatichates: {
          "primary": "#4c1d95",
          "secondary": "#1e3a8a",
          "accent": "#d946ef",
          "neutral": "#1f2937",
          "base-100": "#0f172a",
          "info": "#0ea5e9",
          "success": "#22c55e",
          "warning": "#f59e0b",
          "error": "#ef4444",
        },
      },
    ],
  },
}
