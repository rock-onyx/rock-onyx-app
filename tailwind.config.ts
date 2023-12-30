import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)"],
        inconsolata: "var(--font-inconsolata)",
      },
      colors: {
        rock: {
          dark: "#0C060A",
          muted: "#121319",
          foreground: "#5B5A5A",
          gray: "#84889A",
          button: "#1C1C22",
          bg: "#030309",
          "bg-tab": "#121218",
          blue: "#24284B",
          secondary: "#6F719D",
          highlight: "#076EDE",
          tooltip: "#141416",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
