/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Warm-tinted neumorphic surface system
        surface:          '#F3EDE4',
        'surface-raised': '#F7F1E8',
        'surface-sunken': '#EFE7DB',
        'surface-deep':   '#E8DFCF',
        ink:              '#2A241E',
        'ink-soft':       '#6B5D52',
        'ink-muted':      '#9C8E83',
        'ink-inverse':    '#FBF6EE',
        // Brand accents (preserved)
        cream:        '#FDF8F3',
        blush:        '#F2C4B0',
        'rose-gold':  '#C9956A',
        charcoal:     '#2D2D2D',
        gold:         '#C5A35A',
        'cream-dark': '#F5EDE3',
        amber:        '#F59E42',
        'amber-light': '#FFF8EC',
        'amber-glow':  '#FAD7A0',
        'amber-muted': '#FDEFD4',
        'amber-deep':  '#D4845A',
        // Primary gold accent (token name retained for backward compat)
        'clay-pink':      '#F0CE7A',
        'clay-pink-deep': '#B8862D',
        'clay-gold':      '#F0CE7A',
        'clay-gold-deep': '#B8862D',
        'clay-violet':    '#B89AD9',
        'clay-mint':      '#A8D8C8',
        'clay-cream':     '#FBE8C8',
        'clay-sky':       '#A9CCE3',
      },
      fontFamily: {
        serif:   ['var(--font-playfair)', 'Georgia', 'serif'],
        sans:    ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        jakarta: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'clay-sm':   '16px',
        'clay-md':   '24px',
        'clay-lg':   '32px',
        'clay-xl':   '48px',
        'clay-2xl':  '60px',
        'clay-pill': '999px',
      },
      boxShadow: {
        'neu-flat':
          '6px 6px 14px rgba(180,140,90,0.14), -6px -6px 14px rgba(255,250,245,0.85)',
        'neu-raised':
          '10px 10px 22px rgba(180,140,90,0.22), -10px -10px 22px rgba(255,250,245,0.95)',
        'neu-raised-lg':
          '16px 16px 32px rgba(180,140,90,0.25), -14px -14px 30px rgba(255,250,245,1)',
        'neu-pressed':
          'inset 6px 6px 12px rgba(180,140,90,0.22), inset -6px -6px 12px rgba(255,250,245,0.9)',
        'neu-inset':
          'inset 4px 4px 8px rgba(180,140,90,0.18), inset -4px -4px 8px rgba(255,250,245,0.85)',
        'neu-inset-deep':
          'inset 8px 8px 16px rgba(180,140,90,0.3), inset -8px -8px 16px rgba(255,250,245,1)',
        'clay-button':
          '0 8px 24px rgba(184,134,45,0.40), 0 4px 12px rgba(245,158,66,0.25), inset 0 2px 4px rgba(255,255,255,0.5), inset 0 -3px 6px rgba(130,90,20,0.25)',
        'clay-button-amber':
          '0 8px 24px rgba(245,158,66,0.4), 0 4px 12px rgba(212,132,90,0.25), inset 0 2px 4px rgba(255,255,255,0.5), inset 0 -3px 6px rgba(180,100,40,0.2)',
        'clay-button-ghost':
          '6px 6px 14px rgba(180,140,90,0.18), -4px -4px 12px rgba(255,250,245,0.9), inset 0 1px 2px rgba(255,255,255,0.6)',
        'clay-card':
          '12px 12px 32px rgba(180,140,90,0.22), -8px -8px 22px rgba(255,250,245,0.95), inset 0 2px 4px rgba(255,255,255,0.5)',
        'clay-float':
          '20px 20px 48px rgba(180,140,90,0.28), -12px -12px 32px rgba(255,250,245,1), inset 0 2px 6px rgba(255,255,255,0.6)',
        'clay-pressed':
          'inset 6px 6px 14px rgba(180,140,90,0.28), inset -4px -4px 10px rgba(255,250,245,0.6), 0 0 0 2px rgba(184,134,45,0.3)',
        'clay-glow-pink':
          '0 0 32px rgba(240,206,122,0.55), 0 0 12px rgba(184,134,45,0.35)',
        'clay-glow-amber':
          '0 0 32px rgba(245,158,66,0.45), 0 0 12px rgba(245,158,66,0.25)',
        'focus-ring':
          '0 0 0 3px rgba(184,134,45,0.55), 0 0 0 6px rgba(240,206,122,0.25)',
      },
      transitionTimingFunction: {
        clay:  'cubic-bezier(0.34, 1.56, 0.64, 1)',
        press: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      animation: {
        'fade-in':       'fadeIn 0.6s ease-out forwards',
        float:           'float 7s ease-in-out infinite',
        'float-delayed': 'float-delayed 9s ease-in-out infinite',
        breathe:         'breathe 5s ease-in-out infinite',
        drift:           'drift 14s ease-in-out infinite',
        wobble:          'wobble 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%':      { transform: 'translateY(-12px) rotate(2deg)' },
        },
        'float-delayed': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%':      { transform: 'translateY(-18px) rotate(-3deg)' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%':      { transform: 'scale(1.03)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '33%':      { transform: 'translate(20px,-15px) scale(1.05)' },
          '66%':      { transform: 'translate(-15px,10px) scale(0.97)' },
        },
        wobble: {
          '0%, 100%': { transform: 'rotate(-1deg)' },
          '50%':      { transform: 'rotate(1deg)' },
        },
      },
    },
  },
  plugins: [],
}
