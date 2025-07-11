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
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
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
        // Rolls-Royce inspired minimal palette - very little gold
        "primary-dark": "rgb(21, 21, 21)",
        "secondary-dark": "rgb(34, 34, 34)",
        "accent-gray": "rgb(59, 59, 59)",
        "text-white": "rgb(255, 255, 255)",
        "text-dark": "rgb(34, 34, 34)",
        "border-gray": "rgb(124, 124, 124)",
        "transparent-overlay": "rgba(21, 21, 21, 0.3)",

        // Vibrant artistic palette
        pure: {
          black: "#000000",
          white: "#ffffff",
          gray: {
            50: "#fafafa",
            100: "#f5f5f5",
            200: "#e5e5e5",
            300: "#d4d4d4",
            400: "#a3a3a3",
            500: "#737373",
            600: "#525252",
            700: "#404040",
            800: "#262626",
            900: "#171717",
            950: "#0a0a0a",
          },
        },

        // Monochromatic artistic system inspired by the photo
        artistic: {
          charcoal: "#1a1a1a",
          smoke: "#2d2d2d",
          ash: "#404040",
          silver: "#666666",
          mercury: "#808080",
          platinum: "#a0a0a0",
          pearl: "#c0c0c0",
          fog: "#e0e0e0",
        },

        motion: {
          blur: "rgba(255, 255, 255, 0.08)",
          streak: "rgba(255, 255, 255, 0.12)",
          fade: "rgba(255, 255, 255, 0.04)",
        },

        glass: {
          dark: "rgba(0, 0, 0, 0.4)",
          light: "rgba(255, 255, 255, 0.1)",
          medium: "rgba(255, 255, 255, 0.05)",
          subtle: "rgba(255, 255, 255, 0.02)",
        },

        // Secondary palette - warm earth tones
        secondary: {
          espresso: "#732F17", // Deep espresso brown
          silver: "#D2D9D8", // Soft silver gray
          cream: "#D9C3A9", // Warm cream
          sand: "#BF9B7A", // Desert sand
          bronze: "#A67445", // Rich bronze
          bark: "#734B34", // Tree bark brown
        },

        // Velvet tones (keeping original sophisticated colors)
        velvet: {
          cream: "#D9B6A3",
          light: "#BF754B",
          medium: "#A6583C",
          dark: "#734434",
          darker: "#732F17",
          pearl: "#D2D9D8",
          beige: "#D9C3A9",
          sand: "#BF9B7A",
          bronze: "#A67445",
          espresso: "#734B34",
        },

        // Elegant luxury colors - pure silver and white palette
        luxury: {
          silver: "#C0C0C0",
          platinum: "#E5E4E2",
          pearl: "#EAE0C8",
          cream: "#F5F5F5",
          white: "#FFFFFF",
          light: "#D3D3D3", // Light silver
        },

        // Elegant accent colors - silvers and whites only
        accent: {
          silver: "#C0C0C0",
          platinum: "#E5E4E2",
          pearl: "#EAE0C8",
          cream: "#F5F5F5",
          white: "#FFFFFF",
          subtle: "#D3D3D3", // Light silver
        },
      },
      fontFamily: {
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
        display: ["Orbitron", "Inter", "system-ui", "sans-serif"],
        graffiti: ["Permanent Marker", "cursive"],
        handwritten: ["Kalam", "Caveat", "cursive"],
        basquiat: ["Caveat", "Kalam", "cursive"],
        street: ["Permanent Marker", "cursive"],
        pop: ["Anton", "Bebas Neue", "system-ui", "sans-serif"],
        warhol: ["Anton", "system-ui", "sans-serif"],
        elegant: ["Playfair Display", "Georgia", "serif"],
        bold: ["Bold Addict", "Anton", "Bebas Neue", "system-ui", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      typography: {
        DEFAULT: {
          css: {
            fontFamily: "Inter, system-ui, sans-serif",
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "subtle-shimmer": {
          "0%, 100%": {
            textShadow: "0 0 5px rgba(192, 192, 192, 0.3)",
          },
          "50%": {
            textShadow: "0 0 8px rgba(192, 192, 192, 0.5)",
          },
        },
        "elegant-glitch": {
          "0%": { transform: "translate(0)" },
          "20%": { transform: "translate(-1px, 1px)" },
          "40%": { transform: "translate(-1px, -1px)" },
          "60%": { transform: "translate(1px, 1px)" },
          "80%": { transform: "translate(1px, -1px)" },
          "100%": { transform: "translate(0)" },
        },
        "scan-line": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        "data-flow": {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "50%": { opacity: "1" },
          "100%": { transform: "translateX(100%)", opacity: "0" },
        },
        "basquiat-shake": {
          "0%, 100%": { transform: "rotate(0deg) translate(0px, 0px)" },
          "25%": { transform: "rotate(0.5deg) translate(1px, 0px)" },
          "50%": { transform: "rotate(-0.3deg) translate(-1px, 1px)" },
          "75%": { transform: "rotate(0.2deg) translate(0px, -1px)" },
        },
        "paint-drip": {
          "0%": { transform: "scaleY(0)", transformOrigin: "top" },
          "100%": { transform: "scaleY(1)", transformOrigin: "top" },
        },
        "luxury-shift": {
          "0%": { filter: "sepia(0%) brightness(1)" },
          "25%": { filter: "sepia(5%) brightness(1.05)" },
          "50%": { filter: "sepia(10%) brightness(1.1)" },
          "75%": { filter: "sepia(5%) brightness(1.05)" },
          "100%": { filter: "sepia(0%) brightness(1)" },
        },
        "elegant-zoom": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.02)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out",
        "subtle-shimmer": "subtle-shimmer 4s ease-in-out infinite",
        "elegant-glitch": "elegant-glitch 0.3s ease-in-out",
        "scan-line": "scan-line 2s linear infinite",
        "data-flow": "data-flow 3s linear infinite",
        "basquiat-shake": "basquiat-shake 4s ease-in-out infinite",
        "paint-drip": "paint-drip 2s ease-out",
        "luxury-shift": "luxury-shift 6s linear infinite",
        "elegant-zoom": "elegant-zoom 3s ease-in-out infinite",
      },
      boxShadow: {
        "silver-glow": "0 0 5px #C0C0C0, 0 0 10px #C0C0C0, 0 0 15px #C0C0C0",
        "platinum-glow": "0 0 5px #E5E4E2, 0 0 10px #E5E4E2, 0 0 15px #E5E4E2",
        "pearl-glow": "0 0 15px rgba(234, 224, 200, 0.5)",
        "cream-glow": "0 0 15px rgba(217, 182, 163, 0.5)",
        "velvet-glow": "0 0 15px rgba(191, 117, 75, 0.5)",
        elegant:
          "0 4px 20px rgba(0, 0, 0, 0.3), 0 0 40px rgba(192, 192, 192, 0.2)",
        luxury:
          "0 8px 32px rgba(0, 0, 0, 0.4), 0 0 20px rgba(192, 192, 192, 0.3)",
        "rolls-royce":
          "0 4px 20px rgba(21, 21, 21, 0.3), 0 0 40px rgba(124, 124, 124, 0.2)",
      },
      backgroundImage: {
        "elegant-grid": `linear-gradient(rgba(192,192,192,0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(192,192,192,0.1) 1px, transparent 1px)`,
        "luxury-lines": `repeating-linear-gradient(
          90deg,
          transparent,
          transparent 98px,
          rgba(192,192,192,0.03) 100px
        )`,
        "rolls-royce-texture": `
          radial-gradient(circle at 15% 35%, rgba(124, 124, 124, 0.05) 2px, transparent 3px),
          radial-gradient(circle at 85% 65%, rgba(192, 192, 192, 0.05) 1px, transparent 2px),
          radial-gradient(circle at 45% 85%, rgba(229, 228, 226, 0.05) 1.5px, transparent 2.5px)
        `,
        sophisticated:
          "linear-gradient(135deg, #151515 0%, #222222 25%, #C0C0C0 50%, #404040 75%, #151515 100%)",
        "minimal-luxury": "linear-gradient(45deg, #C0C0C0, #E5E4E2, #EAE0C8)",
        "velvet-gradient": "linear-gradient(45deg, #BF754B, #A6583C, #734434)",
      },
      backgroundSize: {
        grid: "50px 50px",
        dots: "20px 20px",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
