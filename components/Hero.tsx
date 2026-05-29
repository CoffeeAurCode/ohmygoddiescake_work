'use client'

import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src="/2165958_Ceremony_Wedding_1920x1080.mp4"
      />

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Subtle warm gradient tint at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="label-tag mb-6"
        >
          Custom Cakes · Downtown Calgary
        </motion.p>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="heading-xl text-white mb-6"
        >
          Cakes as Special as the{' '}
          <span className="text-rose-gold italic">Moments</span>{' '}
          They&apos;re Made For
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Luxury custom cakes crafted with elevated design and exceptional taste.
          Every cake is one-of-a-kind — because your moment deserves nothing less.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#order-form"
            className="btn-glow w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-rose-gold text-white font-semibold px-8 py-4 rounded-full hover:bg-opacity-90 transition-all hover:-translate-y-0.5 text-base glass-border-dark"
          >
            Order a Cake
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-16"
        >
          <div className="glass-border-dark flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12 md:gap-16 bg-white/10 backdrop-blur-sm rounded-2xl px-10 py-5">
            {[
              { value: '5+', label: 'Years of Craft' },
              { value: '100%', label: 'Custom Designs' },
              { value: '★★★★★', label: 'Client Reviews' },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <p className="font-serif text-2xl md:text-3xl text-white font-semibold">{stat.value}</p>
                <p className="text-xs tracking-widest uppercase text-white/60 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/50"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  )
}
