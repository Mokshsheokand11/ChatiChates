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
        oatmilk: "#F9F7F2",
        matcha: "#A3B18A",
        sage: "#588157",
        leaf: "#344E41",
        cream: "#DAD7CD",
        primary: "#A3B18A",
        secondary: "#588157",
        accent: "#DAD7CD",
        neutral: "#344E41",
        "chat-bg": "#F9F7F2",
        "chat-bubble-user": "#A3B18A",
        "chat-bubble-other": "#E8E2D2",
      },
      backgroundImage: {
        'premium-gradient': 'linear-gradient(to bottom right, #A3B18A, #588157)',
        'glass-gradient': 'linear-gradient(to bottom right, rgba(249, 247, 242, 0.4), rgba(249, 247, 242, 0.2))',
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
          "primary": "#A3B18A",
          "secondary": "#588157",
          "accent": "#DAD7CD",
          "neutral": "#344E41",
          "base-100": "#F9F7F2",
          "base-200": "#E8E2D2",
          "base-300": "#DAD7CD",
          "base-content": "#344E41",
          "info": "#7CA1A4",
          "success": "#588157",
          "warning": "#C7A97E",
          "error": "#A66E6E",
        },
      },
    ],
  },
}

