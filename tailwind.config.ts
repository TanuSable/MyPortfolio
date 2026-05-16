import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "#090511",
        accent: "#ec4899",
        neon: "#f472b6"
      },
      boxShadow: {
        glow: "0 0 40px rgba(236, 72, 153, 0.25)"
      }
    }
  },
  plugins: []
};

export default config;
