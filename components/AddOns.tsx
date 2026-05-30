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
  { name: 'Pearls',               price: '$5' },
  { name: 'Ribbons',              price: '$5' },
]

export default function AddOns() {
  return (
    <section className="section-padding bg-cream">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="label-tag mb-4">Customize Further</p>
          <h2 className="heading-lg text-charcoal">
            Popular{' '}
            <span className="text-rose-gold italic">Add-Ons</span>
          </h2>
          <p className="mt-4 text-charcoal/60 max-w-lg mx-auto">
            Elevate your cake with specialty touches. Select your add-ons on the order form — pricing listed below.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3">
          {addons.map((a, i) => (
            <motion.div
              key={a.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="glass-border group flex items-center gap-2 bg-white rounded-full px-5 py-2.5 hover:shadow-md transition-all duration-200 cursor-default"
            >
              <span className="text-sm font-medium text-charcoal group-hover:text-rose-gold transition-colors">
                {a.name}
              </span>
              <span className="text-xs font-bold text-rose-gold bg-rose-gold/10 px-2 py-0.5 rounded-full">
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
          className="text-center text-xs text-charcoal/45 mt-8"
        >
          Add-on prices are additional to your base cake price. Select them on the order form.
        </motion.p>
      </div>
    </section>
  )
}
