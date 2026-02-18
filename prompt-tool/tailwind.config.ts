import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        // Corporate Trust 主色调
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5', // Primary Indigo
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        secondary: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#7c3aed', // Secondary Violet
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
        },
        // HP 品牌色（保留）
        hp: {
          blue: '#0096D6',
          dark: '#003B5C',
          light: '#6BCDF6',
        },
        // Slate 色系（Corporate Trust 标准）
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
      },
      fontFamily: {
        // Plus Jakarta Sans - Corporate Trust 标准字体
        sans: [
          'var(--font-plus-jakarta)',
          'Plus Jakarta Sans',
          'Inter',
          'system-ui',
          '-apple-system',
          'sans-serif'
        ],
      },
      fontSize: {
        // Major Third Scale (1.250)
        'xs': ['0.75rem', { lineHeight: '1.6' }],
        'sm': ['0.875rem', { lineHeight: '1.6' }],
        'base': ['1rem', { lineHeight: '1.7' }],
        'lg': ['1.125rem', { lineHeight: '1.6' }],
        'xl': ['1.25rem', { lineHeight: '1.5' }],
        '2xl': ['1.563rem', { lineHeight: '1.4' }],
        '3xl': ['1.953rem', { lineHeight: '1.3' }],
        '4xl': ['2.441rem', { lineHeight: '1.2' }],
        '5xl': ['3.052rem', { lineHeight: '1.1' }],
        '6xl': ['3.815rem', { lineHeight: '1.1' }],
      },
      boxShadow: {
        // Corporate Trust 彩色阴影系统
        'soft': '0 4px 20px -2px rgba(79, 70, 229, 0.1)',
        'card': '0 4px 20px -2px rgba(79, 70, 229, 0.1)',
        'card-hover': '0 10px 25px -5px rgba(79, 70, 229, 0.15), 0 8px 10px -6px rgba(79, 70, 229, 0.1)',
        'button': '0 4px 14px 0 rgba(79, 70, 229, 0.3)',
        'glow': '0 0 20px rgba(79, 70, 229, 0.5)',
        'glow-lg': '0 0 30px rgba(79, 70, 229, 0.6)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
      },
    },
  },
  plugins: [],
};
export default config;
