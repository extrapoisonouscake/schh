import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "table-row-border": "0 -1px 0 #000, 0 1px 0 #000",
      },
      transitionTimingFunction: {
        accordion: "cubic-bezier(0.87, 0, 0.13, 1)",
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        brand: {
          DEFAULT: "hsl(var(--brand))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border-color))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-down-padding": {
          from: {
            paddingBottom: "0",
          },
          to: {
            paddingBottom: "0.5rem",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "accordion-up-padding": {
          from: {
            paddingBottom: "0.5rem",
          },
          to: {
            paddingBottom: "0",
          },
        },
      },
      animation: {
        "accordion-down": `accordion-down 300ms ease-in-out, accordion-down-padding 300ms ease-in-out`,
        "accordion-up": `accordion-up 300ms ease-in-out, accordion-up-padding 300ms ease-in-out`,
      },
    },
  },
  darkMode: ["class"],
  plugins: [
    require("tailwindcss-animate"),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "animate-duration": (value) => ({
            animationDuration: value,
          }),
        },
        { values: theme("transitionDuration") }
      );
    }),
  ],
  safelist: [
    "fill-red-500",
    "fill-green-500",
    "fill-yellow-400",
    "fill-orange-500",
    "fill-red-600",
    "text-red-500",
    "text-green-500",
    "text-yellow-400",
    "text-orange-500",
    "text-zinc-200",
    "text-blue-600",
    "text-green-600",
    "text-purple-600",
    "bg-blue-100",
    "bg-green-100",
    "bg-purple-100",
    "bg-blue-600/20",
    "bg-green-500/20",
    "bg-purple-600/20",
    "bg-orange-500/20",
    "bg-yellow-400/20",
    "bg-cyan-600/20",
    "bg-pink-600/20",
    "text-green-500",
    "text-orange-500",
    "text-yellow-400",
    "text-cyan-600",
    "text-pink-600",
  ],
} satisfies Config;
export default config;
