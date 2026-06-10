'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Cake, Crown, Utensils } from 'lucide-react'
import Image from 'next/image'

const servicesList = [
  {
    icon: Cake,
    label: 'Custom Cakes',
    img: '/custom-cakes-premium.png',
    description: 'Bespoke designs tailored for your most special personal milestones and celebrations.',
  },
  {
    icon: Crown,
    label: 'Wedding Cakes',
    img: '/wedding-cakes-premium.png',
    description: 'Breathtaking multi-tiered masterpieces crafted to make your dream day unforgettable.',
  },
  {
    icon: Utensils,
    label: 'Dessert Tables',
    img: '/0E16201C-4525-4570-8F96-FA20816FE2C3.png',
    description: 'Curated spreads of premium sweet treats and showstopping multi-tiered centerpieces.',
  },
  {
    icon: Cake,
    label: 'Custom Celebration Cakes',
    img: '/F8FF9757-50F0-4FF1-B6C5-EB0B30785CB4.png',
    description: 'Luxurious multi-tier cakes designed to elevate any corporate or social milestone.',
  },
]

const marqueeItems = [
  ' Custom Celebration Cakes',
  ' Wedding Cakes',
  ' Dessert Tables',
  ' Corporate Orders',
]

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {servicesList.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                className="group relative rounded-[2rem] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 bg-white/5 border border-white/10 backdrop-blur-sm h-[280px] sm:h-[340px] md:h-[380px] flex flex-col justify-end p-6 md:p-8"
              >
                {/* Background Image with Zoom on Hover */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={service.img}
                    alt={service.label}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                  />
                  {/* Premium overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent transition-opacity duration-500 group-hover:via-black/40" />
                </div>

                {/* Content Container */}
                <div className="relative z-10 flex flex-col gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3.5 py-1.5 text-white text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase">
                      {service.label}
                    </span>
                    <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-rose-gold/90 backdrop-blur-sm flex items-center justify-center text-white border border-white/20 group-hover:bg-rose-gold group-hover:scale-110 transition-all duration-300">
                      <Icon size={14} className="sm:w-4 sm:h-4" />
                    </span>
                  </div>
                  
                  <p className="text-white/70 text-xs sm:text-sm font-light mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 leading-relaxed max-w-md">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
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
