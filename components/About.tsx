'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView, useMotionValue, animate } from 'framer-motion'
import { MapPin, Calendar, Sparkles } from 'lucide-react'
import Image from 'next/image'

const stats = [
  { icon: Calendar, value: 'Since 2020', label: 'Baking professionally' },
  { icon: MapPin, value: 'Calgary, AB', label: 'Home bakery, Downtown' },
  { icon: Sparkles, value: 'Custom Only', label: 'No templates, ever' },
]

const wordVariants = {
  hidden: { opacity: 0, y: 16, filter: 'blur(4px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0.001px)',
    transition: {
      duration: 0.5,
      delay: i * 0.04,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  }),
}

const textContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } },
}

function WordReveal({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className}>
      {text.split(' ').map((word, i) => (
        <motion.span key={i} custom={i} variants={wordVariants} className="inline-block mr-[0.3em]">
          {word}
        </motion.span>
      ))}
    </span>
  )
}

export default function About() {
  return (
    <section id="about" className="section-padding section-ambient bg-amber-light overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Text side with word-stagger reveal */}
          <motion.div
            variants={textContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative"
          >
            {/* Background italic word */}
            <span
              className="absolute -top-4 -left-2 font-serif italic text-[clamp(5rem,12vw,9rem)] font-bold text-charcoal/[0.04] leading-none select-none pointer-events-none"
              aria-hidden
            >
              Story
            </span>

            <motion.p variants={wordVariants} custom={0} className="label-tag mb-4 relative">
              Our Story
            </motion.p>

            <h2 className="heading-lg text-charcoal mb-6 relative">
              <WordReveal text="Crafted with Passion," />
              {' '}
              <span className="text-rose-gold italic">
                <WordReveal text="Since Age 10" />
              </span>
            </h2>

            <div className="space-y-4 text-charcoal/65 leading-relaxed relative">
              <motion.p variants={wordVariants} custom={20}>
                It started with a Wilton decorating course at 10 years old — and never stopped. Through culinary training, hands-on apprenticeships, and years of refinement, what began as childhood curiosity became a full creative practice.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              >
                When friends and family started asking to <em>pay</em> for these cakes, it clicked: this wasn&apos;t just baking. It was creating something people valued for their most important moments.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              >
                Today, O&apos; My Goodies Custom Cakes is built on one belief — that a cake made for a milestone should feel as extraordinary as the milestone itself.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="mt-8 flex items-center gap-4"
            >
              <a
                href="#order-form"
                className="btn-glow btn-amber-glow inline-flex items-center gap-2 bg-charcoal text-amber-light text-sm font-semibold px-7 py-3.5 rounded-full hover:bg-charcoal/90 transition-all duration-500 ease-in-out"
              >
                Work With Us
              </a>
              <a
                href="https://instagram.com/omygoodiesyyc"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-rose-gold hover:text-amber transition-colors duration-500 ease-in-out hover:underline"
              >
                @omygoodiesyyc →
              </a>
            </motion.div>
          </motion.div>

          {/* Visual panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col gap-5"
          >
            {/* Photo mosaic — curtain reveals */}
            <div className="grid grid-cols-2 gap-3 relative">
              {/* Decorative rose-gold frame behind left photo */}
              <div
                className="absolute -left-2 top-2 w-[calc(50%-8px)] h-full rounded-3xl border-2 border-rose-gold/20 pointer-events-none"
                aria-hidden
              />

              {/* Left tall image — curtain from left */}
              <motion.div
                initial={{ clipPath: 'inset(0 100% 0 0)' }}
                whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0 }}
                className="glass-border-img relative aspect-[3/4] rounded-3xl overflow-hidden -translate-y-3 z-10"
              >
                <Image
                  src="/02185D58-85EA-4093-A3C1-2D685329BFEE.png"
                  alt="Custom cake design"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700 ease-in-out"
                />
              </motion.div>

              <div className="flex flex-col gap-3 z-10">
                {/* Top-right image — curtain from left, delay 0.15s */}
                <motion.div
                  initial={{ clipPath: 'inset(0 100% 0 0)' }}
                  whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.15 }}
                  className="glass-border-img relative aspect-square rounded-3xl overflow-hidden"
                >
                  <Image
                    src="/03030855-5FA1-4A91-BC1A-820F96BCD343.png"
                    alt="Elegant cake"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700 ease-in-out"
                  />
                </motion.div>

                {/* Bottom-right image — curtain from left, delay 0.3s */}
                <motion.div
                  initial={{ clipPath: 'inset(0 100% 0 0)' }}
                  whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
                  className="glass-border-img relative aspect-square rounded-3xl overflow-hidden"
                >
                  <Image
                    src="/0E16201C-4525-4570-8F96-FA20816FE2C3.png"
                    alt="Wedding cake"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700 ease-in-out"
                  />
                </motion.div>
              </div>
            </div>

            {/* Founder tag — two-tone split card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              className="glass-border rounded-3xl overflow-hidden flex"
            >
              <div className="bg-charcoal px-5 py-4 flex items-center justify-center flex-shrink-0">
                <div
                  className="w-12 h-12 rounded-full bg-rose-gold flex items-center justify-center text-white font-serif font-bold text-xl"
                  style={{ boxShadow: '0 0 20px rgba(245,158,66,0.4)' }}
                >
                  O
                </div>
              </div>
              <div
                className="flex-1 px-5 py-4 flex flex-col justify-center"
                style={{ background: 'linear-gradient(135deg, rgba(250,215,160,0.25) 0%, rgba(253,248,243,0.8) 100%)' }}
              >
                <p className="font-serif text-sm font-semibold text-charcoal leading-tight">Onyinye Jessica Ekwulugo</p>
                <p className="text-xs text-rose-gold font-medium mt-0.5">Founder & Lead Cake Artist</p>
              </div>
            </motion.div>

            {/* Stat cards */}
            <div className="grid grid-cols-3 gap-3">
              {stats.map(({ icon: Icon, value, label }) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  whileHover={{ y: -2 }}
                  className="glass-border warm-card rounded-3xl p-4 text-center cursor-default group"
                >
                  <div className="w-8 h-8 rounded-xl bg-amber-glow/20 flex items-center justify-center mx-auto mb-2 group-hover:bg-amber/15 transition-colors duration-500">
                    <Icon className="text-amber" size={16} />
                  </div>
                  <p className="font-serif text-xs font-semibold text-charcoal leading-tight">{value}</p>
                  <p className="text-[10px] text-charcoal/45 mt-0.5 leading-tight">{label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
