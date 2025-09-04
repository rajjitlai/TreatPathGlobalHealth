/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{html,jsx,js}"];
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
    }
  },
};
export const plugins = [];