import { ReactNode } from 'react'

interface Props {
  id?: string
  eyebrow?: string
  heading?: ReactNode
  subhead?: ReactNode
  align?: 'left' | 'center'
  children: ReactNode
  ambient?: boolean
  className?: string
  bgTone?: 'surface' | 'sunken' | 'raised'
}

const bgMap = {
  surface: 'bg-surface',
  sunken:  'bg-surface-sunken',
  raised:  'bg-surface-raised',
}

export function SectionShell({
  id,
  eyebrow,
  heading,
  subhead,
  align = 'center',
  children,
  ambient = true,
  className = '',
  bgTone = 'surface',
}: Props) {
  return (
    <section
      id={id}
      className={`relative overflow-hidden section-padding ${bgMap[bgTone]} ${ambient ? 'section-ambient' : ''} ${className}`}
    >
      {/* Drifting decorative blobs */}
      {ambient && (
        <>
          <div className="blob bg-clay-pink/40 w-72 h-72 -top-20 -left-16 animate-drift" />
          <div className="blob bg-amber/30 w-96 h-96 -bottom-32 -right-20 animate-float-delayed" />
        </>
      )}
      <div className={`relative z-10 max-w-7xl mx-auto ${align === 'center' ? 'text-center' : ''}`}>
        {(eyebrow || heading || subhead) && (
          <div className={`mb-12 md:mb-16 ${align === 'center' ? 'mx-auto max-w-3xl' : ''}`}>
            {eyebrow && (
              <span className="eyebrow eyebrow-dot mb-6">
                {eyebrow}
              </span>
            )}
            {heading && <h2 className="heading-lg text-ink mb-5">{heading}</h2>}
            {subhead && <p className="text-lg md:text-xl text-ink-soft leading-relaxed">{subhead}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}

export default SectionShell
