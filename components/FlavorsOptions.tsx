'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const tabs = ['Flavors', 'Frostings', 'Sizes'] as const
type Tab = typeof tabs[number]

const content: Record<Tab, { label: string; note?: string }[]> = {
  Flavors: [
    { label: 'Classic Vanilla' },
    { label: 'Rich Chocolate' },
    { label: 'Marble' },
    { label: 'Lemon' },
    { label: 'Coconut' },
    { label: 'Carrot' },
    { label: 'Red Velvet', note: 'Heavy pigment — stains' },
    { label: 'Funfetti' },
  ],
  Frostings: [
    { label: 'Buttercream' },
    { label: 'Fondant' },
    { label: 'Ganache' },
    { label: 'Whipped Cream' },
    { label: 'Semi-Naked' },
    { label: 'Naked' },
    { label: 'Mirror Glaze' },
  ],
  Sizes: [
    { label: '4"', note: 'Smash / mini' },
    { label: '6"', note: 'Serves 8–10' },
    { label: '8"', note: 'Serves 14–16' },
    { label: '10"', note: 'Serves 20–24' },
    { label: '2-Tier' },
    { label: '3-Tier' },
    { label: '4+ Tier' },
    { label: 'Custom Shape', note: '+$5 for star shape' },
  ],
}

const stripImgs = [
  { src: '/3C4FC48A-4EC7-4FD4-8495-F59CF7C9F294.png', alt: 'Cake flavor showcase' },
  { src: '/49FD205B-4BB0-4811-B5CD-74D935ED6658.png', alt: 'Decorated cake' },
  { src: '/4BA632A6-FA9B-4865-A301-CE359BF6E685.png', alt: 'Colorful cake' },
  { src: '/5B99DEE4-E800-4DF2-B996-E194343F3627.png', alt: 'Elegant cake design' },
  { src: '/5C328AA4-A95F-4AB2-BA8E-C988CD5F9E38.png', alt: 'Custom cake creation' },
]

export default function FlavorsOptions() {
  const [active, setActive] = useState<Tab>('Flavors')

  return (
    <section className="relative section-padding section-ambient overflow-hidden">
      <div className="blob bg-clay-mint/30 w-80 h-80 -bottom-10 -left-20 animate-float" />
      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="eyebrow eyebrow-dot mb-6">Cake Options</span>
          <h2 className="heading-lg text-ink">
            Build Your{' '}
            <span className="italic text-clay-pink-deep">Perfect Cake</span>
          </h2>
          <p className="mt-5 text-ink-soft max-w-lg mx-auto text-lg">
            Mix and match flavors, finishes, and sizes. Every combination gets the same obsessive attention to detail.
          </p>
        </motion.div>

        {/* Scrolling strip */}
        <div className="flex gap-4 overflow-x-auto pb-3 mb-12 snap-x snap-mandatory">
          {stripImgs.map(({ src, alt }) => (
            <div key={src} className="relative w-44 h-44 shrink-0 rounded-clay-lg bg-surface p-2 shadow-neu-raised snap-start">
              <div className="relative w-full h-full rounded-clay-md overflow-hidden shadow-neu-inset-deep">
                <Image src={src} alt={alt} fill className="object-cover hover:scale-110 transition-transform duration-500" />
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="bg-surface rounded-clay-pill p-1.5 flex gap-1 shadow-neu-inset">
            {tabs.map(tab => {
              const isActive = active === tab
              return (
                <button
                  key={tab}
                  onClick={() => setActive(tab)}
                  className={`px-7 py-2.5 rounded-clay-pill text-sm font-bold tracking-wide transition-all duration-200 ease-press ${
                    isActive
                      ? 'bg-clay-pink-deep text-ink-inverse shadow-clay-button'
                      : 'text-ink-soft hover:text-ink'
                  }`}
                  aria-pressed={isActive}
                >
                  {tab}
                </button>
              )
            })}
          </div>
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
          >
            {content[active].map(item => (
              <div
                key={item.label}
                className="bg-surface rounded-clay-md px-5 py-5 text-center shadow-neu-raised hover:shadow-clay-float hover:-translate-y-1 transition-all duration-300 group"
              >
                <p className="font-display text-base text-ink font-medium group-hover:text-clay-pink-deep transition-colors">
                  {item.label}
                </p>
                {item.note && (
                  <p className="text-[11px] text-ink-muted mt-1.5">{item.note}</p>
                )}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Dietary */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 bg-surface rounded-clay-lg px-7 py-6 flex flex-wrap gap-3 items-center justify-center text-sm text-ink-soft shadow-neu-raised"
        >
          <span className="font-semibold text-ink mr-1">Dietary accommodations:</span>
          {['Gluten-Free', 'Dairy-Free', 'Nut-Free', 'Vegan', 'Halal'].map(d => (
            <span key={d} className="bg-surface shadow-neu-inset px-4 py-1.5 rounded-clay-pill text-xs font-semibold text-clay-pink-deep">
              {d}
            </span>
          ))}
          <span className="text-xs text-ink-muted">— mention when ordering</span>
        </motion.div>
      </div>
    </section>
  )
}
