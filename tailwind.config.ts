import type { Config } from 'tailwindcss'

/**
 * Bmore Families Design System - Tailwind Configuration
 *
 * This config extends Tailwind with brand-specific tokens.
 * Core styles are defined in globals.css using CSS custom properties.
 * This file provides TypeScript intellisense and additional utilities.
 *
 * @see brand/BRAND_IDENTITY.md for full design system documentation
 */

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ===========================================
      // COLORS - Bmore Families Brand Palette
      // ===========================================
      colors: {
        // Core Colors (The Six Elements)
        charm: {
          DEFAULT: '#0077B6',
          50: '#E6F3FA',
          100: '#CCE7F5',
          200: '#99CFEB',
          300: '#66B7E1',
          400: '#339FD7',
          500: '#0077B6',
          600: '#005F92',
          700: '#00476D',
          800: '#002F49',
          900: '#001824',
        },
        crab: {
          DEFAULT: '#E85D04',
          50: '#FEF3E7',
          100: '#FDE7CF',
          200: '#FBCF9F',
          300: '#F9B76F',
          400: '#F79F3F',
          500: '#E85D04',
          600: '#BA4A03',
          700: '#8B3802',
          800: '#5D2502',
          900: '#2E1301',
        },
        boh: '#1A1A1A',
        harbor: '#374151',
        formstone: '#F5F0E8',
        rowhouse: '#FAFAFA',
        muted: '#9CA3AF',

        // Secondary Palette
        calvert: '#FFB81C',
        crossland: '#C41E3A',
        slate: '#5A7A8C',
        seafoam: '#8ED1C5',
        peach: '#FFCBA4',

        // Agent Persona Colors
        agent: {
          warrior: '#E85D04',
          budget: '#10B981',
          toddler: '#8B5CF6',
          tween: '#3B82F6',
          planner: '#EC4899',
        },
      },

      // ===========================================
      // TYPOGRAPHY
      // ===========================================
      fontFamily: {
        display: ['Bricolage Grotesque', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        accent: ['Libre Baskerville', 'Georgia', 'serif'],
      },
      fontSize: {
        'display': ['72px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '800' }],
        'h1': ['48px', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
        'h2': ['36px', { lineHeight: '1.25', fontWeight: '700' }],
        'h3': ['24px', { lineHeight: '1.3', fontWeight: '600' }],
        'h4': ['20px', { lineHeight: '1.4', fontWeight: '600' }],
        'body-lg': ['18px', { lineHeight: '1.6', fontWeight: '400' }],
        'body': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'small': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
        'caption': ['12px', { lineHeight: '1.4', fontWeight: '400' }],
      },

      // ===========================================
      // SPACING - 4px Grid
      // ===========================================
      spacing: {
        '18': '72px',
        '22': '88px',
      },

      // ===========================================
      // SHADOWS
      // ===========================================
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 12px 20px rgba(0, 0, 0, 0.12)',
        'crab': '0 4px 14px rgba(232, 93, 4, 0.3)',
        'charm': '0 4px 14px rgba(0, 119, 182, 0.3)',
      },

      // ===========================================
      // BORDER RADIUS
      // ===========================================
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
      },

      // ===========================================
      // ANIMATION - Tidal Rhythm System
      // ===========================================
      transitionDuration: {
        'ripple': '150ms',
        'drift': '300ms',
        'tide': '500ms',
        'swell': '800ms',
      },
      transitionTimingFunction: {
        'ripple': 'ease-out',
        'drift': 'ease-in-out',
        'tide': 'ease-out',
        'swell': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      animation: {
        'wave': 'wave 2s ease-in-out infinite',
        'lift': 'lift 300ms ease-out',
        'fade-in': 'fadeIn 500ms ease-out',
        'ripple': 'ripple 150ms ease-out',
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        lift: {
          '0%': { transform: 'translateY(0)', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)' },
          '100%': { transform: 'translateY(-4px)', boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        ripple: {
          '0%': { transform: 'scale(0.95)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '0' },
        },
      },

      // ===========================================
      // BACKGROUND IMAGES
      // ===========================================
      backgroundImage: {
        'wave-pattern': "url('/brand/patterns/wave-hero.svg')",
        'crosshatch': "url('/brand/patterns/maryland-crosshatch.svg')",
        'rowhouse': "url('/brand/dividers/rowhouse-silhouette.svg')",
        'gradient-bay': 'linear-gradient(180deg, #0077B6 0%, #FAFAFA 100%)',
        'gradient-sunset': 'linear-gradient(180deg, #E85D04 0%, #FFCBA4 100%)',
        'gradient-hero': 'linear-gradient(180deg, rgba(0, 119, 182, 0.05) 0%, rgba(250, 250, 250, 1) 100%)',
      },
    },
  },
  plugins: [],
}

export default config
