import { ReactNode, ButtonHTMLAttributes } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  selected?: boolean
  selectable?: boolean
  tone?: 'pink' | 'amber' | 'violet' | 'mint' | 'neutral'
}

const toneSelected: Record<NonNullable<Props['tone']>, string> = {
  pink:    'bg-clay-pink text-ink ring-clay-pink-deep',
  amber:   'bg-amber-glow text-ink ring-amber-deep',
  violet:  'bg-clay-violet text-ink-inverse ring-clay-violet',
  mint:    'bg-clay-mint text-ink ring-clay-mint',
  neutral: 'bg-surface text-ink ring-rose-gold',
}

export function Chip({
  children,
  selected = false,
  selectable = false,
  tone = 'pink',
  className = '',
  ...rest
}: Props) {
  const base =
    'inline-flex items-center gap-2 px-5 py-2.5 rounded-clay-pill text-sm font-semibold tracking-wide transition-all duration-200 ease-press focus-clay select-none'
  const restStyle = 'bg-surface text-ink-soft shadow-neu-flat hover:shadow-neu-raised'
  const selStyle  = `${toneSelected[tone]} shadow-neu-inset-deep ring-2 ring-offset-2 ring-offset-surface`
  const styles    = selected ? selStyle : restStyle
  const interact  = selectable ? 'cursor-pointer active:scale-[0.97]' : ''
  return (
    <button type="button" className={`${base} ${styles} ${interact} ${className}`} {...rest}>
      {children}
    </button>
  )
}

export default Chip
