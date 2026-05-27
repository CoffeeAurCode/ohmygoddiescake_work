import { forwardRef, HTMLAttributes } from 'react'

type SurfaceVariant = 'raised' | 'sunken' | 'flat' | 'float' | 'clay' | 'inset' | 'inset-deep'
type SurfaceRadius = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'pill' | 'none'

interface SurfaceProps extends HTMLAttributes<HTMLDivElement> {
  variant?: SurfaceVariant
  radius?: SurfaceRadius
  as?: keyof JSX.IntrinsicElements
  bg?: 'surface' | 'raised' | 'sunken' | 'deep'
}

const variantShadow: Record<SurfaceVariant, string> = {
  raised:       'shadow-neu-raised',
  sunken:       'shadow-neu-pressed',
  flat:         'shadow-neu-flat',
  float:        'shadow-clay-float',
  clay:         'shadow-clay-card',
  inset:        'shadow-neu-inset',
  'inset-deep': 'shadow-neu-inset-deep',
}

const radiusMap: Record<SurfaceRadius, string> = {
  sm:   'rounded-clay-sm',
  md:   'rounded-clay-md',
  lg:   'rounded-clay-lg',
  xl:   'rounded-clay-xl',
  '2xl':'rounded-clay-2xl',
  pill: 'rounded-clay-pill',
  none: '',
}

const bgMap = {
  surface: 'bg-surface',
  raised:  'bg-surface-raised',
  sunken:  'bg-surface-sunken',
  deep:    'bg-surface-deep',
}

export const Surface = forwardRef<HTMLDivElement, SurfaceProps>(function Surface(
  { variant = 'raised', radius = 'lg', bg = 'surface', as = 'div', className = '', children, ...rest },
  ref,
) {
  const Tag = as as any
  return (
    <Tag
      ref={ref}
      className={`${bgMap[bg]} ${variantShadow[variant]} ${radiusMap[radius]} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
})

export default Surface
