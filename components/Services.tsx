'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Cake, Crown, Utensils, Briefcase, ArrowRight } from 'lucide-react'
import Image from 'next/image'

const services = [
  { icon: Cake,      tone: 'pink'   as const, name: 'Custom Celebration Cakes', desc: 'Birthdays, anniversaries, graduations — fully custom', img: '/Celebration Birthday.png' },
  { icon: Crown,     tone: 'amber'  as const, name: 'Wedding Cakes',            desc: 'Tiered masterpieces for your most important day',     img: '/Celebration Wedding.png' },
  { icon: Utensils,  tone: 'mint'   as const, name: 'Dessert Tables',           desc: 'Curated sweet spreads for events',                    img: '/18FB0FAB-46E3-49BE-B543-73CF7120E76F.png' },
  { icon: Briefcase, tone: 'violet' as const, name: 'Corporate Orders',         desc: 'Branded cakes and treats for business events',        img: '/Celebration Corporate.png' },
]

const toneClass = {
  pink:   'bg-clay-pink text-clay-pink-deep',
  amber:  'bg-amber-glow text-amber-deep',
  mint:   'bg-clay-mint text-ink',
  violet: 'bg-clay-violet text-ink-inverse',
}

const marqueeItems = ['Custom Celebration Cakes', 'Wedding Cakes', 'Dessert Tables', 'Corporate Orders']

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const img1Y = useTransform(scrollYProgress, [0, 1], ['0%', '-6%'])
  const img2Y = useTransform(scrollYProgress, [0, 1], ['0%', '-3%'])

  return (
    <section ref={sectionRef} id="services" className="relative section-padding section-ambient overflow-hidden">
      <div className="blob bg-clay-pink/40 w-96 h-96 top-10 -right-32 animate-drift" />
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <span className="eyebrow eyebrow-dot mb-6">What We Offer</span>
          <h2 className="heading-lg text-ink">
            Services Made for{' '}
            <span className="italic text-clay-pink-deep">Every Celebration</span>
          </h2>
          <p className="mt-5 text-ink-soft max-w-xl mx-auto leading-relaxed text-lg">
            From intimate birthdays to grand weddings, each order receives the same level of care and craftsmanship.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Left column: 2 feature images */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-1 flex flex-col gap-5"
          >
            <motion.div style={{ y: img1Y }} className="relative bg-surface rounded-clay-xl p-3 shadow-clay-card h-[260px]">
              <div className="relative w-full h-full rounded-clay-lg overflow-hidden shadow-neu-inset-deep">
                <Image
                  src="/2FEC4DEF-3821-4C38-B1E6-2E15D3C2D88C.png"
                  alt="Custom cake showcase"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <span className="inline-flex items-center gap-1.5 bg-surface/95 backdrop-blur-sm rounded-clay-pill px-4 py-1.5 text-ink text-[10px] font-bold tracking-[0.18em] uppercase shadow-neu-flat">
                    Custom Cakes
                  </span>
                  <span className="w-9 h-9 rounded-clay-pill bg-clay-pink-deep shadow-clay-button-amber flex items-center justify-center">
                    <Cake size={15} className="text-ink-inverse" />
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div style={{ y: img2Y }} className="relative bg-surface rounded-clay-xl p-3 shadow-clay-card flex-1 min-h-[220px]">
              <div className="relative w-full h-full rounded-clay-lg overflow-hidden shadow-neu-inset-deep">
                <Image
                  src="/33FBA6D8-734C-456D-8D4C-199419FEA82C.png"
                  alt="Wedding cake showcase"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <span className="inline-flex items-center gap-1.5 bg-surface/95 backdrop-blur-sm rounded-clay-pill px-4 py-1.5 text-ink text-[10px] font-bold tracking-[0.18em] uppercase shadow-neu-flat">
                    Wedding Cakes
                  </span>
                  <span className="w-9 h-9 rounded-clay-pill bg-amber shadow-clay-button-amber flex items-center justify-center">
                    <Crown size={15} className="text-ink-inverse" />
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: 4 service tiles */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5 content-start">
            {services.map((s, i) => {
              const Icon = s.icon
              return (
                <motion.div
                  key={s.name}
                  initial={{ opacity: 0, y: 20, scale: 0.97 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  whileHover={{ y: -6, transition: { type: 'spring', stiffness: 300, damping: 22 } }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="group relative bg-surface rounded-clay-xl p-5 shadow-clay-card hover:shadow-clay-float transition-shadow duration-300 min-h-[240px] flex flex-col"
                >
                  <div className="relative aspect-[4/3] rounded-clay-md overflow-hidden shadow-neu-inset-deep mb-4">
                    <Image
                      src={s.img}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      aria-hidden
                    />
                    <div className={`absolute top-3 right-3 w-10 h-10 rounded-clay-pill ${toneClass[s.tone]} shadow-neu-raised flex items-center justify-center`}>
                      <Icon size={16} />
                    </div>
                  </div>
                  <h3 className="font-display text-lg text-ink leading-snug mb-1.5">{s.name}</h3>
                  <p className="text-sm text-ink-soft leading-relaxed">{s.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="mt-14 flex justify-center"
        >
          <a
            href="#order-form"
            className="group inline-flex items-center gap-2.5 px-10 py-4 rounded-clay-pill font-semibold text-base bg-clay-pink-deep text-ink-inverse shadow-clay-button hover:shadow-clay-glow-pink hover:-translate-y-0.5 active:scale-[0.96] active:shadow-clay-pressed transition-all duration-200 ease-press"
          >
            Get My Custom Quote
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

        {/* Marquee */}
        <div className="mt-12 marquee-wrap">
          <div className="marquee-track">
            {[0, 1].map(setIdx => (
              <div key={setIdx} className="flex items-center">
                {marqueeItems.map(item => (
                  <span
                    key={item + setIdx}
                    className="inline-flex items-center gap-2 px-6 py-2.5 mx-2 rounded-clay-pill bg-surface shadow-neu-flat text-ink-soft text-xs font-bold tracking-[0.18em] uppercase whitespace-nowrap"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-clay-pink-deep" />
                    {item}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
