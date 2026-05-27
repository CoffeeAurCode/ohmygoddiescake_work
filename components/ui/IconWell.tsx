import { ReactNode } from 'react'

type Size = 'sm' | 'md' | 'lg' | 'xl'
type Tone = 'pink' | 'amber' | 'violet' | 'mint' | 'cream' | 'sky' | 'neutral'

interface Props {
  children: ReactNode
  size?: Size
  tone?: Tone
  inset?: boolean
  className?: string
}

const sizeMap: Record<Size, string> = {
  sm: 'w-10 h-10',
  md: 'w-14 h-14',
  lg: 'w-20 h-20',
  xl: 'w-28 h-28',
}

const toneBg: Record<Tone, string> = {
  pink:    'bg-clay-pink text-clay-pink-deep',
  amber:   'bg-amber-glow text-amber-deep',
  violet:  'bg-clay-violet text-ink-inverse',
  mint:    'bg-clay-mint text-ink',
  cream:   'bg-clay-cream text-amber-deep',
  sky:     'bg-clay-sky text-ink',
  neutral: 'bg-surface text-ink',
}

export function IconWell({ children, size = 'md', tone = 'neutral', inset = false, className = '' }: Props) {
  const shadow = inset ? 'shadow-neu-inset-deep' : 'shadow-neu-raised'
  return (
    <div
      className={`${sizeMap[size]} ${toneBg[tone]} ${shadow} rounded-clay-pill flex items-center justify-center shrink-0 ${className}`}
    >
      {children}
    </div>
  )
}

export default IconWell
