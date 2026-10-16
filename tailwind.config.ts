import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        amazon: {
          orange: "#ff9900",
          blue: "#146eb4",
          dark: "#131921",
          lightDark: "#232f3e",
        },
      },
    },
  },
  plugins: [],
};

export default config;