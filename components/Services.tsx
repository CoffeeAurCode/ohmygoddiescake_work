'use client'

import { motion } from 'framer-motion'
import { Cake, Crown, Coffee, Star, Baby, Grid2x2, Utensils, Briefcase } from 'lucide-react'
import Image from 'next/image'

const services = [
  { icon: Cake,     name: 'Custom Celebration Cakes', desc: 'Birthdays, anniversaries, graduations — fully custom' },
  { icon: Crown,    name: 'Wedding Cakes',             desc: 'Tiered masterpieces for your most important day' },
  { icon: Coffee,   name: 'Cupcakes',                  desc: 'Individual treats with the same elevated finish' },
  { icon: Star,     name: 'Cake Pops & Cakesicles',   desc: 'Fun, portable, and just as delicious' },
  { icon: Baby,     name: 'Smash Cakes',               desc: "Perfect for baby's first birthday milestone" },
  { icon: Grid2x2,  name: 'Sheet Cakes',               desc: 'Generous portions for larger gatherings' },
  { icon: Utensils, name: 'Dessert Tables',            desc: 'Curated sweet spreads for events' },
  { icon: Briefcase,name: 'Corporate Orders',          desc: 'Branded cakes and treats for business events' },
]

export default function Services() {
  return (
    <section id="services" className="section-padding section-ambient bg-amber-light overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-14"
        >
          <p className="label-tag mb-4">What We Offer</p>
          <h2 className="heading-lg text-charcoal">
            Services Made for{' '}
            <span className="text-rose-gold italic">Every Celebration</span>
          </h2>
          <p className="mt-4 text-charcoal/60 max-w-xl mx-auto leading-relaxed">
            From intimate birthdays to grand weddings, each order receives the same level of care and craftsmanship.
          </p>
        </motion.div>

        {/* Featured image banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="grid grid-cols-2 gap-4 mb-10"
        >
          <div className="glass-border-img relative h-48 md:h-64 rounded-3xl overflow-hidden">
            <Image src="/2FEC4DEF-3821-4C38-B1E6-2E15D3C2D88C.png" alt="Custom cake showcase" fill className="object-cover hover:scale-105 transition-transform duration-700 ease-in-out" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <span className="absolute bottom-3 left-4 text-white text-xs font-semibold tracking-wider uppercase opacity-90">Custom Cakes</span>
          </div>
          <div className="glass-border-img relative h-48 md:h-64 rounded-3xl overflow-hidden">
            <Image src="/33FBA6D8-734C-456D-8D4C-199419FEA82C.png" alt="Wedding cake showcase" fill className="object-cover hover:scale-105 transition-transform duration-700 ease-in-out" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <span className="absolute bottom-3 left-4 text-white text-xs font-semibold tracking-wider uppercase opacity-90">Wedding Cakes</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {services.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
                className="glass-border warm-card group rounded-3xl p-5 cursor-default"
              >
                <div className="w-10 h-10 rounded-2xl bg-amber-glow/30 flex items-center justify-center mb-3 group-hover:bg-amber/20 transition-colors duration-500">
                  <Icon size={18} className="text-rose-gold" />
                </div>
                <h3 className="font-serif text-sm font-semibold text-charcoal mb-1 leading-snug">{s.name}</h3>
                <p className="text-xs text-charcoal/55 leading-relaxed">{s.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
