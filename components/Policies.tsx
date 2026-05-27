'use client'

import { motion } from 'framer-motion'
import { Copy, Palette, RefreshCw, Truck, AlertTriangle } from 'lucide-react'
import IconWell from './ui/IconWell'

const policies = [
  {
    icon: Copy,
    tone: 'pink' as const,
    title: 'Inspiration Only — Not Copies',
    body: "We do not replicate another baker's work or exact designs. Send us your inspiration photos and we'll create something unique that captures the same spirit — better.",
  },
  {
    icon: Palette,
    tone: 'violet' as const,
    title: 'Dark Colors Warning',
    body: 'Black and red frostings require a significant amount of food coloring. This can result in an extremely bitter taste and will temporarily stain your mouth. We always advise clients before ordering.',
  },
  {
    icon: RefreshCw,
    tone: 'mint' as const,
    title: 'Cancellations & Refunds',
    body: 'Your 50% deposit is refundable if you cancel before we have started work or purchased any materials for your order. Once preparation begins, deposits are non-refundable.',
  },
  {
    icon: Truck,
    tone: 'amber' as const,
    title: 'Pickup & Delivery',
    body: 'Orders are available for pickup from our home studio in Downtown Calgary (1122 15 Ave SW). Delivery within Calgary is available for a flat $25 fee, or you may send an Uber package at your expense.',
  },
  {
    icon: AlertTriangle,
    tone: 'cream' as const,
    title: 'Allergen Disclaimer',
    body: 'Our kitchen handles common allergens including gluten, dairy, eggs, and nuts. While we take precautions, cross-contamination cannot be fully ruled out. Please notify us of any severe allergies when ordering.',
  },
]

export default function Policies() {
  return (
    <section className="relative section-padding section-ambient overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="eyebrow eyebrow-dot mb-6">Good to Know</span>
          <h2 className="heading-lg text-ink">
            Our Policies &amp;{' '}
            <span className="italic text-clay-pink-deep">Important Notes</span>
          </h2>
          <p className="mt-5 text-ink-soft max-w-lg mx-auto text-lg">
            We believe in complete transparency so there are zero surprises — only a perfect cake.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {policies.map((p, i) => {
            const Icon = p.icon
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`bg-surface rounded-clay-lg p-7 flex gap-5 shadow-neu-raised hover:shadow-clay-float hover:-translate-y-1 transition-all duration-300 ${
                  i === 4 ? 'md:col-span-2' : ''
                }`}
              >
                <IconWell size="md" tone={p.tone}>
                  <Icon size={20} />
                </IconWell>
                <div>
                  <h3 className="font-display text-xl text-ink font-medium mb-2 leading-snug">{p.title}</h3>
                  <p className="text-sm text-ink-soft leading-relaxed">{p.body}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
