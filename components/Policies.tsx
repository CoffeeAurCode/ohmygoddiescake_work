'use client'

import { motion } from 'framer-motion'
import { Copy, Palette, RefreshCw, Truck, AlertTriangle } from 'lucide-react'

const policies = [
  {
    icon: Copy,
    title: 'Inspiration Only — Not Copies',
    body: 'We do not replicate another baker\'s work or exact designs. Send us your inspiration photos and we\'ll create something unique that captures the same spirit — better.',
  },
  {
    icon: Palette,
    title: 'Dark Colors Warning',
    body: 'Black and red frostings require a significant amount of food coloring. This can result in an extremely bitter taste and will temporarily stain your mouth. We always advise clients before ordering.',
  },
  {
    icon: RefreshCw,
    title: 'Cancellations & Refunds',
    body: 'Your 50% deposit is refundable if you cancel before we have started work or purchased any materials for your order. Once preparation begins, deposits are non-refundable.',
  },
  {
    icon: Truck,
    title: 'Pickup & Delivery',
    body: 'Orders are available for pickup from our home studio in Downtown Calgary (1122 15 Ave SW). Delivery within Calgary is available for a flat $25 fee, or you may send an Uber package at your expense.',
  },
  {
    icon: AlertTriangle,
    title: 'Allergen Disclaimer',
    body: 'Our kitchen handles common allergens including gluten, dairy, eggs, and nuts. While we take precautions, cross-contamination cannot be fully ruled out. Please notify us of any severe allergies when ordering.',
  },
]

export default function Policies() {
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
          <p className="label-tag mb-4">Good to Know</p>
          <h2 className="heading-lg text-charcoal">
            Our Policies &amp;{' '}
            <span className="text-rose-gold italic">Important Notes</span>
          </h2>
          <p className="mt-4 text-charcoal/60 max-w-lg mx-auto">
            We believe in complete transparency so there are zero surprises — only a perfect cake.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4">
          {policies.map((p, i) => {
            const Icon = p.icon
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`glass-border bg-white rounded-2xl p-6 flex gap-4 ${
                  i === 4 ? 'md:col-span-2' : ''
                }`}
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-rose-gold/10 flex items-center justify-center">
                  <Icon size={18} className="text-rose-gold" />
                </div>
                <div>
                  <h3 className="font-serif text-base font-semibold text-charcoal mb-1.5">{p.title}</h3>
                  <p className="text-sm text-charcoal/65 leading-relaxed">{p.body}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
