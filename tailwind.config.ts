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
      },
    },
  },
  plugins: [],
};
export default config;
