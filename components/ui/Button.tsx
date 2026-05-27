import { forwardRef, ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'amber' | 'ghost' | 'dark' | 'sunken'
type Size = 'sm' | 'md' | 'lg'

interface CommonProps {
  variant?: Variant
  size?: Size
  fullWidth?: boolean
  iconLeft?: ReactNode
  iconRight?: ReactNode
  className?: string
  children?: ReactNode
}

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button' }
type AnchorProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a'; href: string }

const variantClasses: Record<Variant, string> = {
  primary: 'bg-clay-pink-deep text-ink-inverse shadow-clay-button hover:shadow-clay-glow-pink hover:-translate-y-0.5',
  amber:   'bg-amber text-ink-inverse shadow-clay-button-amber hover:shadow-clay-glow-amber hover:-translate-y-0.5',
  ghost:   'bg-surface text-ink shadow-clay-button-ghost hover:shadow-neu-raised-lg hover:-translate-y-0.5',
  dark:    'bg-ink text-ink-inverse shadow-clay-button-ghost hover:shadow-neu-raised-lg hover:-translate-y-0.5',
  sunken:  'bg-surface text-ink shadow-neu-pressed hover:text-clay-pink-deep',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-5 py-2.5 text-sm gap-2 min-h-[40px]',
  md: 'px-7 py-3.5 text-base gap-2.5 min-h-[48px]',
  lg: 'px-9 py-4 text-lg gap-3 min-h-[56px]',
}

const base =
  'inline-flex items-center justify-center font-semibold rounded-clay-pill tracking-wide ' +
  'transition-all duration-200 ease-press active:scale-[0.96] active:shadow-clay-pressed ' +
  'focus-clay select-none whitespace-nowrap'

function Btn(
  { variant = 'primary', size = 'md', fullWidth, iconLeft, iconRight, className = '', children, ...rest }: any,
  ref: any,
) {
  const cls = `${base} ${variantClasses[variant as Variant]} ${sizeClasses[size as Size]} ${fullWidth ? 'w-full' : ''} ${className}`
  if (rest.as === 'a' || rest.href) {
    const { as: _a, ...anchorRest } = rest
    return (
      <a ref={ref} className={cls} {...anchorRest}>
        {iconLeft}
        {children}
        {iconRight}
      </a>
    )
  }
  const { as: _b, ...btnRest } = rest
  return (
    <button ref={ref} className={cls} {...btnRest}>
      {iconLeft}
      {children}
      {iconRight}
    </button>
  )
}

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps | AnchorProps>(Btn as any)
export default Button
