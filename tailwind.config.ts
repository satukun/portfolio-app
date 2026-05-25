import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        muted: {
          DEFAULT: "var(--muted)",
          fg: "var(--muted-foreground)",
        },
        line: "var(--border)",
        accent: "var(--accent-line)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "Helvetica Neue", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
        serif: ["Times New Roman", "Georgia", "serif"],
      },
      letterSpacing: {
        "ultra-tight": "-0.045em",
        "extra-tight": "-0.035em",
        "tighter-2": "-0.025em",
        "extra-wide": "0.25em",
      },
    },
  },
  plugins: [],
};

export default config;
