import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        // Nexora Exact Brand Tokens
        brand: {
          dark: "#101820",
          "dark-surface": "#17232d",
          accent: "#2f80ed",
          "accent-hover": "#1e65d0",
          teal: "#20b8a5",
          "teal-surface": "#e8f8f6",
          bg: "#f7f9fb",
          text: "#17212b",
          muted: "#667482",
          border: "#e3e9ef",
          "dark-text": "#f7f9fb",
        },
        primary: {
          DEFAULT: "#2f80ed",
          foreground: "#ffffff",
          50: "#f0f6fd",
          100: "#e1eefc",
          200: "#c4defa",
          300: "#96c3f6",
          400: "#60a2f1",
          500: "#2f80ed",
          600: "#1e65d0",
          700: "#174fa7",
          800: "#174389",
          900: "#183a71",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        success: {
          DEFAULT: "#20b8a5",
          50: "#e8f8f6",
          100: "#c7f0ec",
          600: "#199a89",
          700: "#137a6d",
        },
        warning: {
          DEFAULT: "#f59e0b",
          50: "#fffbeb",
          100: "#fef3c7",
          600: "#d97706",
          700: "#b45309",
        },
        danger: {
          DEFAULT: "#ef4444",
          50: "#fef2f2",
          100: "#fee2e2",
          600: "#dc2626",
          700: "#b91c1c",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        subtle: "0 1px 2px 0 rgba(16, 24, 32, 0.04), 0 1px 3px 1px rgba(16, 24, 32, 0.02)",
        card: "0 1px 3px 0 rgba(16, 24, 32, 0.04), 0 1px 2px -1px rgba(16, 24, 32, 0.03)",
        floating: "0 12px 30px -6px rgba(16, 24, 32, 0.08), 0 4px 12px -4px rgba(16, 24, 32, 0.04)",
        elevated: "0 20px 40px -12px rgba(16, 24, 32, 0.12)",
      },
    },
  },
  plugins: [],
};
export default config;
