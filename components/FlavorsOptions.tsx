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

export default function FlavorsOptions() {
  const [active, setActive] = useState<Tab>('Flavors')

  return (
    <section className="section-padding bg-cream-dark">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="label-tag mb-4">Cake Options</p>
          <h2 className="heading-lg text-charcoal">
            Build Your{' '}
            <span className="text-rose-gold italic">Perfect Cake</span>
          </h2>
          <p className="mt-4 text-charcoal/60 max-w-lg mx-auto">
            Mix and match flavors, finishes, and sizes. Every combination gets the same obsessive attention to detail.
          </p>
        </motion.div>

        {/* Scrolling photo strip */}
        <div className="flex gap-4 overflow-x-auto pb-2 mb-10 snap-x snap-mandatory scrollbar-hide">
          {[
            { src: '/3C4FC48A-4EC7-4FD4-8495-F59CF7C9F294.png', alt: 'Cake flavor showcase' },
            { src: '/49FD205B-4BB0-4811-B5CD-74D935ED6658.png', alt: 'Decorated cake' },
            { src: '/4BA632A6-FA9B-4865-A301-CE359BF6E685.png', alt: 'Colorful cake' },
            { src: '/5B99DEE4-E800-4DF2-B996-E194343F3627.png', alt: 'Elegant cake design' },
            { src: '/5C328AA4-A95F-4AB2-BA8E-C988CD5F9E38.png', alt: 'Custom cake creation' },
          ].map(({ src, alt }) => (
            <div key={src} className="glass-border-img relative w-40 h-40 flex-shrink-0 rounded-2xl overflow-hidden snap-start shadow-sm">
              <Image src={src} alt={alt} fill className="object-cover hover:scale-105 transition-transform duration-500" />
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-full p-1 flex gap-1 shadow-sm border border-blush/30">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  active === tab
                    ? 'bg-rose-gold text-white shadow-sm'
                    : 'text-charcoal/60 hover:text-charcoal'
                }`}
              >
                {tab}
              </button>
            ))}
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
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
          >
            {content[active].map(item => (
              <div
                key={item.label}
                className="glass-border bg-white rounded-2xl px-4 py-4 text-center hover:shadow-sm transition-all group"
              >
                <p className="font-serif text-charcoal font-medium group-hover:text-rose-gold transition-colors text-sm">
                  {item.label}
                </p>
                {item.note && (
                  <p className="text-[10px] text-charcoal/45 mt-1">{item.note}</p>
                )}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Dietary note */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-border mt-10 bg-white rounded-2xl px-6 py-5 flex flex-wrap gap-3 items-center justify-center text-sm text-charcoal/65"
        >
          <span className="font-semibold text-charcoal">Dietary accommodations:</span>
          {['Gluten-Free', 'Dairy-Free', 'Nut-Free', 'Vegan', 'Halal'].map(d => (
            <span key={d} className="bg-cream px-3 py-1 rounded-full text-xs font-medium text-rose-gold border border-rose-gold/20">
              {d}
            </span>
          ))}
          <span className="text-xs">— mention when ordering</span>
        </motion.div>
      </div>
    </section>
  )
}
