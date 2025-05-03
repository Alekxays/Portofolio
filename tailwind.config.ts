import type { Config } from "tailwindcss";

const config = {
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
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          dark: "var(--primary-dark)",
        },
        secondary: "var(--secondary)",
        accent: "var(--accent)",
        muted: {
          DEFAULT: "var(--muted)",
          light: "var(--muted-light)",
        },
        card: {
          DEFAULT: "var(--card)",
          border: "var(--card-border)",
          hover: "var(--card-hover)",
        },
        error: "var(--error)",
        success: "var(--success)",
        warning: "var(--warning)",
        info: "var(--info)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        full: "var(--radius-full)",
      },
      transitionDuration: {
        fast: "var(--transition-fast)",
        normal: "var(--transition-normal)",
        slow: "var(--transition-slow)",
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-in': 'slideIn 0.4s ease-out',
        'slide-up': 'slideUp 0.5s ease',
        'ping-slow': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'var(--foreground)',
            a: {
              color: 'var(--primary)',
              textDecoration: 'none',
              fontWeight: '500',
            },
            p: {
              marginTop: '1.25em',
              marginBottom: '1.25em',
            },
            'h2, h3, h4': {
              fontWeight: '700',
              marginTop: '1.5em',
              marginBottom: '0.75em',
            },
            hr: {
              borderColor: 'var(--muted-light)',
              marginTop: '2em',
              marginBottom: '2em',
            },
            strong: {
              color: 'var(--foreground)',
              fontWeight: '600',
            },
          },
        },
      },
    },
  },
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  future: {
    hoverOnlyWhenSupported: true, // Optimise les performances sur appareils tactiles
  },
  plugins: [],
} satisfies Config;

export default config;
