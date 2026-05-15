'use client'

import { motion } from 'framer-motion'
import { Instagram, MapPin } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src="/2165958_Ceremony_Wedding_1920x1080.mp4"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Warm gradient from bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1E0E00]/80 via-black/20 to-transparent" />

      {/* Ambient radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_30%_60%,rgba(245,158,66,0.1)_0%,transparent_70%)]" />

      {/* Floating location badge */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute top-28 left-6 md:left-16 lg:left-24 flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2"
      >
        <MapPin size={12} className="text-amber-glow" />
        <span className="text-white/90 text-xs font-semibold tracking-widest uppercase">Downtown Calgary</span>
      </motion.div>

      {/* Main content — bottom-left anchored */}
      <div className="relative z-10 px-6 md:px-16 lg:px-24 pb-12 md:pb-20 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-10 items-end">

          {/* Left: text */}
          <div>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              className="label-tag text-amber-glow/90 mb-5"
            >
              Custom Cakes · Crafted to Order
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] text-white mb-6"
            >
              Cakes as Special<br />
              as the{' '}
              <span className="text-amber-glow italic">Moments</span>
              <br />
              They&apos;re Made For
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.42, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-base md:text-lg text-white/70 max-w-md mb-9 leading-relaxed"
            >
              Luxury custom cakes with elevated design and exceptional taste.
              Every cake is one-of-a-kind — because your moment deserves nothing less.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex flex-col sm:flex-row items-start gap-3"
            >
              <a
                href="#order-form"
                className="relative overflow-hidden inline-flex items-center justify-center gap-2 bg-rose-gold text-white font-semibold px-8 py-4 rounded-full hover:bg-opacity-90 transition-all duration-500 ease-in-out hover:-translate-y-0.5 text-sm glass-border-dark btn-glow btn-amber-glow group"
              >
                <span className="relative z-10">Order a Cake</span>
                {/* Shimmer sweep */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </a>
              <a
                href="https://instagram.com/omygoodiesyyc"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glow-outline inline-flex items-center justify-center gap-2 border border-white/35 text-white font-semibold px-8 py-4 rounded-full hover:border-amber-glow hover:text-amber-glow transition-all duration-500 ease-in-out text-sm backdrop-blur-sm"
              >
                <Instagram size={16} />
                See Our Work
              </a>
            </motion.div>
          </div>

          {/* Right: floating stats chips */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, delay: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-row lg:flex-col gap-3 justify-start lg:justify-end lg:items-end"
          >
            {[
              { value: '5+', label: 'Years of Craft', sub: 'Professionally baking' },
              { value: '100%', label: 'Custom Designs', sub: 'No templates, ever' },
              { value: '★★★★★', label: 'Client Reviews', sub: 'All 5-star ratings' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                className="glass-border-dark flex items-center gap-4 bg-white/8 backdrop-blur-md rounded-2xl px-5 py-3.5 min-w-[160px]"
              >
                <p className="font-serif text-xl md:text-2xl text-white font-bold leading-none whitespace-nowrap">{stat.value}</p>
                <div>
                  <p className="text-white/90 text-xs font-semibold leading-tight">{stat.label}</p>
                  <p className="text-amber-glow/70 text-[10px] mt-0.5 leading-tight">{stat.sub}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator — pulsing vertical line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.7 }}
        className="absolute bottom-8 right-8 md:right-16 lg:right-24 hidden md:flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.25em] uppercase text-white/40 [writing-mode:vertical-rl]">Scroll</span>
        <div className="relative w-px h-14 bg-white/15 overflow-hidden rounded-full">
          <motion.div
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-transparent via-amber-glow to-transparent"
          />
        </div>
      </motion.div>
    </section>
  )
}
