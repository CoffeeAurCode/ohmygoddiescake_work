'use client'

import { motion } from 'framer-motion'
import { ArrowDown, ArrowRight, Sparkles } from 'lucide-react'
import Image from 'next/image'

const stats = [
  { value: '5+', label: 'Years of Craft' },
  { value: '100%', label: 'Custom Designs' },
  { value: '★★★★★', label: 'Client Reviews' },
]

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen pt-32 md:pt-36 pb-32 md:pb-40 overflow-hidden"
    >
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/2165958_Ceremony_Wedding_1920x1080.mp4"
        aria-hidden
      />

      {/* Darkening tint over video for text legibility */}
      <div className="absolute inset-0 z-[1] bg-ink/45" aria-hidden />

      {/* Warm gold radial wash */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none mix-blend-soft-light opacity-80"
        style={{
          background:
            'radial-gradient(ellipse at 30% 40%, rgba(240,206,122,0.45) 0%, transparent 55%), radial-gradient(ellipse at 70% 70%, rgba(184,134,45,0.35) 0%, transparent 60%)',
        }}
        aria-hidden
      />

      {/* Top fade — blend nav into video */}
      <div className="absolute top-0 left-0 right-0 h-32 z-[2] bg-gradient-to-b from-surface/40 to-transparent pointer-events-none" aria-hidden />

      {/* Bottom fade — seamless transition into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 z-[2] bg-gradient-to-t from-surface via-surface/80 to-transparent pointer-events-none" aria-hidden />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
        {/* Left: content */}
        <div className="text-center lg:text-left">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.22em] uppercase text-clay-gold px-4 py-2 rounded-clay-pill bg-white/10 backdrop-blur-md border border-white/20 mb-8"
          >

            Custom Cakes · Downtown Calgary
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="heading-xl text-white mb-8"
            style={{ textShadow: '0 4px 32px rgba(0,0,0,0.45)' }}
          >
            Cakes as Special as the{' '}
            <span className="italic text-clay-gold relative inline-block">
              Moments
              <svg className="absolute -bottom-2 left-0 w-full" height="10" viewBox="0 0 200 10" preserveAspectRatio="none">
                <path d="M2 8 Q 100 -2, 198 6" stroke="#F0CE7A" strokeWidth="3" fill="none" strokeLinecap="round" />
              </svg>
            </span>{' '}
            They&apos;re Made For
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-lg md:text-xl text-white/85 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed"
            style={{ textShadow: '0 2px 16px rgba(0,0,0,0.4)' }}
          >
            Luxury custom cakes crafted with elevated design and exceptional taste.
            Every cake is one-of-a-kind — because your moment deserves nothing less.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
          >
            <a
              href="#order-form"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-clay-pill font-semibold text-base bg-clay-gold-deep text-ink-inverse shadow-clay-button hover:shadow-clay-glow-pink hover:-translate-y-0.5 active:scale-[0.96] active:shadow-clay-pressed transition-all duration-200 ease-press focus-clay"
            >
              Order a Cake
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#services"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-clay-pill font-semibold text-base bg-white/15 backdrop-blur-md text-white border border-white/25 hover:bg-white/25 hover:-translate-y-0.5 active:scale-[0.96] transition-all duration-200 ease-press focus-clay"
            >
              View Gallery
            </a>
          </motion.div>

          {/* Stat strip — translucent for legibility on video */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="mt-14 inline-flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-1 bg-white/10 backdrop-blur-xl rounded-clay-xl border border-white/15 p-2"
          >
            {stats.map((s, i) => (
              <div key={s.label} className="flex items-center">
                <div className="text-center px-6 py-3">
                  <p className="font-display text-2xl md:text-3xl text-white font-semibold leading-none">{s.value}</p>
                  <p className="text-[10px] tracking-[0.18em] uppercase text-white/70 mt-1.5 font-semibold">{s.label}</p>
                </div>
                {i < stats.length - 1 && (
                  <span className="hidden sm:block w-px h-10 bg-white/20" />
                )}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: floating cake card — preserved with gold accent */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
          className="relative mx-auto lg:mx-0 w-full max-w-md lg:max-w-none"
        >
          <div className="relative aspect-[4/5] rounded-clay-2xl bg-surface/95 backdrop-blur-sm shadow-clay-card overflow-hidden animate-float">
            <div className="absolute inset-3 rounded-clay-xl overflow-hidden shadow-neu-inset-deep">
              <Image
                src="/2881EBD7-CCEE-4A1F-BD63-B876A2EC2227.png"
                alt="Signature luxury cake by O' My Goodies"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: -20, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="absolute -left-4 md:-left-8 top-12 bg-surface/95 backdrop-blur-sm rounded-clay-lg px-5 py-4 shadow-clay-card max-w-[180px] animate-float-delayed"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-clay-pill bg-amber-glow shadow-neu-inset-deep flex items-center justify-center">
                <Sparkles size={16} className="text-amber-deep" />
              </div>
              <div>
                <p className="font-display text-lg leading-none text-ink">Hand-crafted</p>
                <p className="text-[11px] text-ink-muted mt-1">from scratch · daily</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="absolute -right-4 md:-right-6 bottom-14 bg-clay-gold-deep text-ink-inverse rounded-clay-lg px-5 py-4 shadow-clay-card max-w-[200px] animate-float"
          >
            <p className="font-display text-2xl leading-none">24h</p>
            <p className="text-xs mt-1.5 opacity-90">Quote turnaround</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/70 z-10"
      >
        <span className="text-[10px] tracking-[0.22em] uppercase font-semibold">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="w-8 h-8 rounded-clay-pill bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center"
        >
          <ArrowDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  )
}
