/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{html,jsx,js}"];
export const darkMode = "class";
export const theme = {
  extend: {
    container: {
      padding: "1rem",
      center: true,
      screens: {
        sm: "0 auto",
        md: "0 auto",
        lg: "100%",
        xl: "100%",
        "2xl": "120%",
      }
    },
    colors: {
      primary: "#0ea5e9", // sky-500
      secondary: "#0369a1", // sky-800
      accent: "#22c55e", // green-500
      muted: "#64748b" // slate-500
    },
    animation: {
      'spin-slow': 'spin 3s linear infinite',
      'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      'bounce-slow': 'bounce 2s infinite',
      'fade-in': 'fadeIn 0.5s ease-in-out',
      'slide-up': 'slideUp 0.5s ease-out',
      'scale-in': 'scaleIn 0.3s ease-out',
    },
    keyframes: {
      fadeIn: {
        '0%': { opacity: '0' },
        '100%': { opacity: '1' },
      },
      slideUp: {
        '0%': { transform: 'translateY(20px)', opacity: '0' },
        '100%': { transform: 'translateY(0)', opacity: '1' },
      },
      scaleIn: {
        '0%': { transform: 'scale(0.9)', opacity: '0' },
        '100%': { transform: 'scale(1)', opacity: '1' },
      },
    },
  },
};
export const plugins = [];