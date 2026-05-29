'use client'

import { motion } from 'framer-motion'
import { MapPin, Calendar, Sparkles } from 'lucide-react'
import Image from 'next/image'

const stats = [
  { icon: Calendar, value: 'Since 2020', label: 'Baking professionally' },
  { icon: MapPin, value: 'Calgary, AB', label: 'Home bakery, Downtown' },
  { icon: Sparkles, value: 'Custom Only', label: 'No templates, ever' },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
})

export default function About() {
  return (
    <section id="about" className="section-padding bg-amber-light overflow-hidden relative">
      {/* Subtle radial glow background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 70% 50%, rgba(245,158,66,0.07) 0%, transparent 70%)',
        }}
        aria-hidden
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-center">

          {/* ── Left: text + stats ── */}
          <div className="relative flex gap-6 lg:gap-8">
            {/* Vertical "EST. 2020" decorative label */}
            <div className="hidden lg:flex flex-col items-center gap-3 flex-shrink-0 pt-2">
              <div className="w-px flex-1 bg-gradient-to-b from-transparent via-rose-gold/30 to-transparent" />
              <span
                className="text-[10px] font-semibold tracking-[0.3em] uppercase text-rose-gold/50 select-none"
                style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
              >
                Est. 2020
              </span>
              <div className="w-px flex-1 bg-gradient-to-b from-transparent via-rose-gold/30 to-transparent" />
            </div>

            <div className="flex-1">
              {/* Background watermark word */}
              <span
                className="absolute -top-6 -left-2 font-serif italic text-[clamp(5rem,12vw,9rem)] font-bold text-charcoal/[0.035] leading-none select-none pointer-events-none"
                aria-hidden
              >
                Story
              </span>

              <motion.p {...fadeUp(0)} className="label-tag mb-4 relative">
                Our Story
              </motion.p>

              <motion.h2 {...fadeUp(0.08)} className="heading-lg text-charcoal mb-6 relative">
                Crafted with Passion,{' '}
                <span className="text-rose-gold italic">Since Age 10</span>
              </motion.h2>

              <div className="space-y-4 text-charcoal/65 leading-relaxed relative">
                <motion.p {...fadeUp(0.16)}>
                  It started with a Wilton decorating course at 10 years old — and never stopped.
                  Through culinary training, hands-on apprenticeships, and years of refinement,
                  what began as childhood curiosity became a full creative practice.
                </motion.p>
                <motion.p {...fadeUp(0.24)}>
                  When friends and family started asking to <em>pay</em> for these cakes, it clicked:
                  this wasn&apos;t just baking. It was creating something people valued for their most
                  important moments.
                </motion.p>
                <motion.p {...fadeUp(0.32)}>
                  Today, O&apos; My Goodies Custom Cakes is built on one belief — that a cake made
                  for a milestone should feel as extraordinary as the milestone itself.
                </motion.p>
              </div>

              {/* CTA buttons */}
              <motion.div {...fadeUp(0.4)} className="mt-8 flex items-center gap-4">
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

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3 mt-8">
                {stats.map(({ icon: Icon, value, label }, i) => (
                  <motion.div
                    key={label}
                    {...fadeUp(0.48 + i * 0.08)}
                    whileHover={{ y: -2 }}
                    className="glass-border warm-card rounded-2xl p-4 text-center cursor-default group"
                  >
                    <div className="w-8 h-8 rounded-xl bg-amber-glow/20 flex items-center justify-center mx-auto mb-2 group-hover:bg-amber/15 transition-colors duration-500">
                      <Icon className="text-amber" size={16} />
                    </div>
                    <p className="font-serif text-xs font-semibold text-charcoal leading-tight">{value}</p>
                    <p className="text-[10px] text-charcoal/45 mt-0.5 leading-tight">{label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: editorial image panel ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative"
          >
            {/* Decorative rose-gold offset frame */}
            <div
              className="absolute -bottom-3 -right-3 w-full h-full rounded-3xl border-2 border-rose-gold/20 pointer-events-none"
              aria-hidden
            />

            {/* Main feature image */}
            <div className="glass-border-img relative aspect-[4/5] rounded-3xl overflow-hidden">
              <Image
                src="/02185D58-85EA-4093-A3C1-2D685329BFEE.png"
                alt="Custom cake — crafted with passion"
                fill
                className="object-cover"
                priority
              />
              {/* Subtle gradient overlay at bottom for readability */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(45,30,20,0.55) 0%, transparent 45%)' }}
                aria-hidden
              />
            </div>

            {/* Accent image — floating top-right */}
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute -top-5 -right-5 w-28 h-28 rounded-2xl overflow-hidden glass-border-img shadow-xl"
            >
              <Image
                src="/03030855-5FA1-4A91-BC1A-820F96BCD343.png"
                alt="Elegant cake detail"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </motion.div>

            {/* Founder badge — floating bottom-left, over gradient */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute bottom-5 left-5 right-5 glass-border rounded-2xl overflow-hidden flex"
              style={{ backdropFilter: 'blur(12px)', background: 'rgba(255,248,236,0.88)' }}
            >
              <div className="bg-charcoal px-4 py-3.5 flex items-center justify-center flex-shrink-0">
                <div
                  className="w-10 h-10 rounded-full bg-rose-gold flex items-center justify-center text-white font-serif font-bold text-lg"
                  style={{ boxShadow: '0 0 18px rgba(245,158,66,0.45)' }}
                >
                  O
                </div>
              </div>
              <div
                className="flex-1 px-4 py-3.5 flex flex-col justify-center"
                style={{ background: 'linear-gradient(135deg, rgba(250,215,160,0.2) 0%, rgba(253,248,243,0.6) 100%)' }}
              >
                <p className="font-serif text-sm font-semibold text-charcoal leading-tight">Onyinye Jessica Ekwulugo</p>
                <p className="text-xs text-rose-gold font-medium mt-0.5">Founder & Lead Cake Artist</p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
