'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Cake, Crown, Coffee, Star, Baby, Grid2x2, Utensils, Briefcase } from 'lucide-react'
import Image from 'next/image'

const services = [
  { icon: Cake, name: 'Custom Celebration Cakes', desc: 'Birthdays, anniversaries, graduations — fully custom', img: '/Celebration Birthday.png' },
  { icon: Crown, name: 'Wedding Cakes', desc: 'Tiered masterpieces for your most important day', img: '/Celebration Wedding.png' },
  { icon: Coffee, name: 'Cupcakes', desc: 'Individual treats with the same elevated finish', img: '/ECA51ED4-11A4-48E9-9229-5D75D2376304.png' },
  { icon: Star, name: 'Cake Pops & Cakesicles', desc: 'Fun, portable, and just as delicious', img: '/49FD205B-4BB0-4811-B5CD-74D935ED6658.png' },
  { icon: Baby, name: 'Smash Cakes', desc: "Perfect for baby's first birthday milestone", img: '/Celebration Baby Shower.png' },
  { icon: Grid2x2, name: 'Sheet Cakes', desc: 'Generous portions for larger gatherings', img: '/3C4FC48A-4EC7-4FD4-8495-F59CF7C9F294.png' },
  { icon: Utensils, name: 'Dessert Tables', desc: 'Curated sweet spreads for events', img: '/18FB0FAB-46E3-49BE-B543-73CF7120E76F.png' },
  { icon: Briefcase, name: 'Corporate Orders', desc: 'Branded cakes and treats for business events', img: '/Celebration Corporate.png' },
]

const marqueeItems = [
  ' Custom Celebration Cakes',
  ' Wedding Cakes',
  ' Cupcakes',
  ' Cake Pops',
  ' Smash Cakes',
  ' Sheet Cakes',
  ' Dessert Tables',
  ' Corporate Orders',
]

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const img1Y = useTransform(scrollYProgress, [0, 1], ['0%', '-8%'])
  const img2Y = useTransform(scrollYProgress, [0, 1], ['0%', '-4%'])

  return (
    <section ref={sectionRef} id="services" className="section-padding section-ambient bg-amber-light overflow-hidden">
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

          {/* Left column: 2 stacked feature images with parallax */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:col-span-1 flex flex-col gap-4"
          >
            {/* Feature image 1 — parallax */}
            <motion.div
              style={{ y: img1Y, height: '260px' }}
              className="glass-border-img relative rounded-3xl overflow-hidden"
            >
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
            </motion.div>

            {/* Feature image 2 — parallax */}
            <motion.div
              style={{ y: img2Y, minHeight: '220px' }}
              className="glass-border-img relative rounded-3xl overflow-hidden flex-1"
            >
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
            </motion.div>
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
                  whileHover={{ y: -6, scale: 1.02, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
                  className="glass-border group rounded-3xl cursor-default flex flex-col justify-between min-h-[140px] relative overflow-hidden"
                >
                  {/* Background photo */}
                  <Image
                    src={s.img}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                    aria-hidden
                  />
                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10 group-hover:from-black/75 transition-all duration-500" />

                  {/* Icon top-right */}
                  <div className="relative z-10 self-end m-4 w-8 h-8 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <Icon size={15} className="text-white" />
                  </div>

                  {/* Name bottom */}
                  <div className="relative z-10 p-4 pt-0">
                    <h3 className="font-serif text-[13px] font-semibold text-white leading-snug mb-1">{s.name}</h3>
                    <p className="text-[11px] text-white/65 leading-relaxed">{s.desc}</p>
                  </div>
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
          transition={{ delay: 0.3, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-10 flex justify-center"
        >
          <a
            href="#order-form"
            className="btn-glow btn-amber-glow bg-rose-gold text-white text-sm font-semibold px-10 py-4 rounded-full hover:bg-opacity-90 transition-all duration-500 ease-in-out"
          >
            Get My Custom Quote
          </a>
        </motion.div>

        {/* Infinite marquee strip */}
        <div className="mt-10 marquee-wrap">
          <div className="marquee-track">
            {[0, 1].map((setIdx) => (
              <div key={setIdx} className="flex items-center">
                {marqueeItems.map((item) => (
                  <span
                    key={item + setIdx}
                    className="inline-flex items-center gap-2 px-5 py-2 mx-2 rounded-full bg-amber-glow/25 border border-rose-gold/20 text-charcoal/70 text-xs font-semibold tracking-wider whitespace-nowrap"
                  >
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
