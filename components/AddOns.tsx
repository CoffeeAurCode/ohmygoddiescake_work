'use client'

import { motion } from 'framer-motion'

const addons = [
  { name: 'Disco Balls',          price: '$10' },
  { name: 'Butterflies',          price: '$5' },
  { name: 'Edible Image Sheet',   price: '$20' },
  { name: 'Fresh Florals',        price: '$30' },
  { name: 'Faux Flowers',         price: '$15' },
  { name: 'Crown',                price: '$7' },
  { name: 'French Macarons',      price: '$20' },
  { name: 'Dipped Strawberries',  price: '$15' },
  { name: 'Gold / Silver Drip',   price: '$25' },
  { name: 'Cherries',             price: '$5' },
  { name: 'Mini Liquor Bottles',  price: '$7' },
  { name: 'Burnaway Image',       price: '$40' },
]

export default function AddOns() {
  return (
    <section className="relative section-padding section-ambient overflow-hidden">
      <div className="blob bg-amber/30 w-80 h-80 -top-16 right-10 animate-float-delayed" />
      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="eyebrow eyebrow-dot mb-6">Customize Further</span>
          <h2 className="heading-lg text-ink">
            Popular{' '}
            <span className="italic text-clay-pink-deep">Add-Ons</span>
          </h2>
          <p className="mt-5 text-ink-soft max-w-lg mx-auto text-lg">
            Elevate your cake with specialty touches. Select your add-ons on the order form — pricing listed below.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3.5">
          {addons.map((a, i) => (
            <motion.div
              key={a.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="group flex items-center gap-3 bg-surface rounded-clay-pill pl-5 pr-2 py-2 shadow-neu-raised hover:shadow-clay-float hover:-translate-y-0.5 transition-all duration-300 ease-clay cursor-default"
            >
              <span className="text-sm font-semibold text-ink group-hover:text-clay-pink-deep transition-colors">
                {a.name}
              </span>
              <span className="text-xs font-bold text-ink-inverse bg-clay-pink-deep shadow-clay-button-amber px-3 py-1.5 rounded-clay-pill">
                {a.price}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-sm text-ink-muted mt-10"
        >
          Add-on prices are additional to your base cake price. Select them on the order form.
        </motion.p>
      </div>
    </section>
  )
}
