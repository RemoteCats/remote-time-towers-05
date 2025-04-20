
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1400px'
      }
    },
    extend: {
      fontFamily: {
        'courier': ['Courier Prime', 'monospace'],
        sans: ['Courier Prime', 'monospace'],
        mono: ['Courier Prime', 'monospace'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#999266",
          foreground: "#000000",
        },
        secondary: {
          DEFAULT: "rgba(153, 146, 102, 0.1)",
          foreground: "#999266",
        },
        destructive: {
          DEFAULT: "#000000",
          foreground: "#999266",
        },
        muted: {
          DEFAULT: "#1A1F2C",
          foreground: "#999266",
        },
        accent: {
          DEFAULT: "#999266",
          foreground: "#000000",
        },
        popover: {
          DEFAULT: "#000000",
          foreground: "#999266",
        },
        card: {
          DEFAULT: "#1A1F2C",
          foreground: "#999266",
        },
        ash: {
          DEFAULT: "#AAA480",
          light: "#C2BC9B",
          dark: "#8A7F5E",
        }
      },
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
