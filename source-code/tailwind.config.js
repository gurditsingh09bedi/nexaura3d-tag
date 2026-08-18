/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        obsidian: "#050505",
        obsidian2: "#0a0a0c",
        silver: "#C9CDD3",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      boxShadow: {
        "neon-cyan": "0 0 24px rgba(77,252,255,0.45), 0 0 60px rgba(77,252,255,0.15)",
        "neon-cyan-lg": "0 0 40px rgba(77,252,255,0.6), 0 0 100px rgba(77,252,255,0.25)",
      },
    },
  },
  plugins: [],
}
