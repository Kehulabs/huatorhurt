import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        angbao: {
          red: "#C41E3A",
          "red-dark": "#8B0000",
          "red-deep": "#6B0F1A",
          gold: "#FFD700",
          "gold-light": "#FFE55C",
          "gold-dark": "#DAA520",
          cream: "#FFF8E7",
        },
      },
      boxShadow: {
        glow: "0 0 20px rgba(255, 215, 0, 0.3), 0 0 40px rgba(196, 30, 58, 0.2)",
        "glow-lg":
          "0 0 30px rgba(255, 215, 0, 0.4), 0 0 60px rgba(196, 30, 58, 0.3)",
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "scale-in": "scaleIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.8)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseGlow: {
          "0%, 100%": {
            boxShadow:
              "0 0 20px rgba(255, 215, 0, 0.3), 0 0 40px rgba(196, 30, 58, 0.2)",
          },
          "50%": {
            boxShadow:
              "0 0 30px rgba(255, 215, 0, 0.5), 0 0 60px rgba(196, 30, 58, 0.4)",
          },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
