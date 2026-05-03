'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const tiers = [
  {
    range: '$100 – $200',
    label: 'Starter',
    desc: 'Single-tier custom cakes, perfect for smaller gatherings and celebrations.',
    includes: ['Single tier (6" or 8")', 'Custom design', 'Choice of 1 filling', 'All frosting finishes'],
    highlight: false,
  },
  {
    range: '$200 – $400',
    label: 'Signature',
    desc: 'Our most popular range — larger cakes with more intricate designs and add-ons.',
    includes: ['Single or 2-tier', 'Elaborate custom design', 'Filling upgrade available', 'Add-ons included', 'Priority booking'],
    highlight: true,
  },
  {
    range: '$400+',
    label: 'Luxury',
    desc: 'Multi-tier statement cakes for weddings, galas, and unforgettable moments.',
    includes: ['Multi-tier (3+ tiers)', 'Full custom design consultation', 'Premium add-ons', 'Wedding-ready finishing', 'Priority scheduling'],
    highlight: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="section-padding bg-cream">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="label-tag mb-4">Investment</p>
          <h2 className="heading-lg text-charcoal">
            Transparent{' '}
            <span className="text-rose-gold italic">Pricing</span>
          </h2>
          <p className="mt-4 text-charcoal/60 max-w-lg mx-auto">
            No minimum order. Final price depends on design complexity — fill out the order form for your exact quote.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((t, i) => (
            <motion.div
              key={t.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`relative rounded-3xl p-7 flex flex-col ${
                t.highlight
                  ? 'glass-border-dark bg-charcoal text-white shadow-xl scale-105'
                  : 'glass-border bg-white hover:shadow-md transition-all duration-300'
              }`}
            >
              {t.highlight && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-rose-gold text-white text-xs font-bold px-4 py-1 rounded-full tracking-wide uppercase">
                  Most Popular
                </span>
              )}

              <div className="mb-5">
                <p className={`text-xs font-semibold tracking-widest uppercase mb-1 ${t.highlight ? 'text-rose-gold' : 'text-rose-gold'}`}>
                  {t.label}
                </p>
                <p className={`font-serif text-3xl font-bold ${t.highlight ? 'text-white' : 'text-charcoal'}`}>
                  {t.range}
                </p>
                <p className={`text-sm mt-2 leading-relaxed ${t.highlight ? 'text-white/60' : 'text-charcoal/55'}`}>
                  {t.desc}
                </p>
              </div>

              <ul className="flex-1 space-y-2.5 mb-7">
                {t.includes.map(item => (
                  <li key={item} className="flex items-start gap-2.5 text-sm">
                    <Check
                      size={16}
                      className={`mt-0.5 flex-shrink-0 ${t.highlight ? 'text-rose-gold' : 'text-rose-gold'}`}
                    />
                    <span className={t.highlight ? 'text-white/80' : 'text-charcoal/70'}>{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#order"
                className={`block text-center text-sm font-semibold px-5 py-3 rounded-full transition-all ${
                  t.highlight
                    ? 'btn-glow bg-rose-gold text-white hover:bg-opacity-90'
                    : 'btn-glow-outline border-2 border-charcoal/20 text-charcoal hover:border-rose-gold hover:text-rose-gold'
                }`}
              >
                Get a Custom Quote
              </a>
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
          Prices are estimates. Your final quote depends on cake size, tier count, and design complexity.
          Rush orders (under 3 days notice) incur an additional $15–25 fee.
        </motion.p>
      </div>
    </section>
  )
}
