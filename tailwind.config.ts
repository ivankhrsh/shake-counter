import type { Config } from "tailwindcss";

const config: Config = {
  extends: "eslint-config-molindo/tsconfig.json",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        shake: "shake 0.82s cubic-bezier(.36,.07,.19,.97) both",
        glow: "glow 1.5s ease-in-out infinite",
        shakeGlow: "shakeGlow 1.5s ease-in-out infinite",
        reset: "reset 0.5s ease-in-out",
      },
      keyframes: {
        shake: {
          "10%, 90%": {
            transform: "translate3d(0, -8px, 0)",
          },
          "20%, 80%": {
            transform: "translate3d(0, 16px, 0)",
          },
          "30%, 50%, 70%": {
            transform: "translate3d(0, -32px, 0)",
          },
          "40%, 60%": {
            transform: "translate3d(0, 32px, 0)",
          },
        },
        glow: {
          "0%, 100%": {
            boxShadow: `0 0 10px var(--glow-color-primary), 0 0 20px var(--glow-color-secondary)`,
          },
          "50%": {
            boxShadow: `0 0 20px var(--glow-color-intense), 0 0 40px var(--glow-color-primary)`,
          },
        },
        shakeGlow: {
          "0%, 100%": {
            transform: "translate3d(0, 0, 0)",
            boxShadow:
              "0 0 10px var(--glow-color-primary), 0 0 20px var(--glow-color-secondary)",
          },
          "10%, 90%": {
            transform: "translate3d(0, -4px, 0)",
          },
          "20%, 80%": {
            transform: "translate3d(0, 8px, 0)",
          },
          "30%, 70%": {
            transform: "translate3d(0, -12px, 0)",
          },
          "40%, 60%": {
            transform: "translate3d(0, 12px, 0)",
          },
          "50%": {
            transform: "translate3d(0, 0, 0)",
            boxShadow:
              "0 0 15px var(--glow-color-intense), 0 0 30px var(--glow-color-primary)",
          },
        },

        reset: {
          "0%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0", transform: "scale(0.8)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
