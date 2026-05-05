import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#050505",
        graphite: "#111111",
        champagne: "#d8b46a",
        aureate: "#f4d58d",
        ember: "#d17338"
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"]
      },
      transitionTimingFunction: {
        cinematic: "cubic-bezier(0.25, 0.46, 0.45, 0.94)"
      },
      boxShadow: {
        gold: "0 0 36px rgba(216, 180, 106, 0.22)"
      }
    }
  },
  plugins: []
};

export default config;
