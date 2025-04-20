
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
        'ibm-mono': ['IBM Plex Mono', 'monospace'],
        'josefin': ['Josefin Sans', 'sans-serif'],
        sans: ['Josefin Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
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
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
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
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' }
        },
        'tick': {
          '0%': { transform: 'rotate(0deg)' },
          '10%': { transform: 'rotate(2deg)' },
          '20%': { transform: 'rotate(0deg)' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'pulse-subtle': 'pulse-subtle 1s ease-in-out infinite',
        'tick': 'tick 1s ease-out'
      },
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
