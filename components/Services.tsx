'use client'

import { motion } from 'framer-motion'
import { Cake, Crown, Coffee, Star, Baby, Grid2x2, Utensils, Briefcase } from 'lucide-react'
import Image from 'next/image'

const services = [
  { icon: Cake,      name: 'Custom Celebration Cakes', desc: 'Birthdays, anniversaries, graduations — fully custom' },
  { icon: Crown,     name: 'Wedding Cakes',             desc: 'Tiered masterpieces for your most important day' },
  { icon: Coffee,    name: 'Cupcakes',                  desc: 'Individual treats with the same elevated finish' },
  { icon: Star,      name: 'Cake Pops & Cakesicles',   desc: 'Fun, portable, and just as delicious' },
  { icon: Baby,      name: 'Smash Cakes',               desc: "Perfect for baby's first birthday milestone" },
  { icon: Grid2x2,   name: 'Sheet Cakes',               desc: 'Generous portions for larger gatherings' },
  { icon: Utensils,  name: 'Dessert Tables',            desc: 'Curated sweet spreads for events' },
  { icon: Briefcase, name: 'Corporate Orders',          desc: 'Branded cakes and treats for business events' },
]

export default function Services() {
  return (
    <section id="services" className="section-padding section-ambient bg-amber-light overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Section header with horizontal rule */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-14"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-rose-gold/30 to-rose-gold/30" />
            <p className="label-tag whitespace-nowrap">What We Offer</p>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent via-rose-gold/30 to-rose-gold/30" />
          </div>
          <h2 className="heading-lg text-charcoal text-center">
            Services Made for{' '}
            <span className="text-rose-gold italic">Every Celebration</span>
          </h2>
          <p className="mt-4 text-charcoal/55 max-w-xl mx-auto leading-relaxed text-center text-sm">
            From intimate birthdays to grand weddings, each order receives the same level of care and craftsmanship.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* Left column: 2 stacked feature images */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:col-span-1 flex flex-col gap-4"
          >
            {/* Feature image 1 */}
            <div className="glass-border-img relative rounded-3xl overflow-hidden" style={{ height: '260px' }}>
              <Image
                src="/2FEC4DEF-3821-4C38-B1E6-2E15D3C2D88C.png"
                alt="Custom cake showcase"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700 ease-in-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3 py-1.5 text-white text-[11px] font-semibold tracking-wider uppercase">
                  Custom Cakes
                </span>
                <span className="w-7 h-7 rounded-full bg-rose-gold flex items-center justify-center flex-shrink-0">
                  <Cake size={13} className="text-white" />
                </span>
              </div>
            </div>

            {/* Feature image 2 */}
            <div className="glass-border-img relative rounded-3xl overflow-hidden flex-1" style={{ minHeight: '220px' }}>
              <Image
                src="/33FBA6D8-734C-456D-8D4C-199419FEA82C.png"
                alt="Wedding cake showcase"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700 ease-in-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3 py-1.5 text-white text-[11px] font-semibold tracking-wider uppercase">
                  Wedding Cakes
                </span>
                <span className="w-7 h-7 rounded-full bg-rose-gold flex items-center justify-center flex-shrink-0">
                  <Crown size={13} className="text-white" />
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right area: 8 service tiles in 2×4 grid */}
          <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3 content-start">
            {services.map((s, i) => {
              const Icon = s.icon
              return (
                <motion.div
                  key={s.name}
                  initial={{ opacity: 0, y: 20, scale: 0.97 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
                  className="glass-border warm-card group rounded-3xl p-5 cursor-default flex flex-col justify-between min-h-[140px] relative overflow-hidden"
                >
                  {/* Icon top-right */}
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-xl bg-amber-glow/25 flex items-center justify-center group-hover:bg-rose-gold/15 transition-colors duration-500">
                    <Icon size={15} className="text-rose-gold" />
                  </div>

                  {/* Name bottom */}
                  <div className="mt-auto pt-8">
                    <h3 className="font-serif text-[13px] font-semibold text-charcoal leading-snug mb-1">{s.name}</h3>
                    <p className="text-[11px] text-charcoal/50 leading-relaxed">{s.desc}</p>
                  </div>

                  {/* Subtle hover tint */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-glow/0 to-amber/0 group-hover:from-amber-glow/8 group-hover:to-amber/5 transition-all duration-500 rounded-3xl pointer-events-none" />
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
