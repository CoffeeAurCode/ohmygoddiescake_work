'use client'

import { motion } from 'framer-motion'
import { MapPin, Calendar, Sparkles, ArrowRight } from 'lucide-react'
import Image from 'next/image'

const stats = [
  { icon: Calendar,  tone: 'pink'   as const, value: 'Since 2020', label: 'Baking professionally' },
  { icon: MapPin,    tone: 'amber'  as const, value: 'Calgary, AB', label: 'Home bakery, Downtown' },
  { icon: Sparkles,  tone: 'violet' as const, value: 'Custom Only', label: 'No templates, ever' },
]

const toneBg = {
  pink:   'bg-clay-pink text-clay-pink-deep',
  amber:  'bg-amber-glow text-amber-deep',
  violet: 'bg-clay-violet text-ink-inverse',
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
})

export default function About() {
  return (
    <section id="about" className="relative section-padding section-ambient overflow-hidden">
      <div className="blob bg-clay-pink/40 w-96 h-96 top-20 -right-20 animate-float" />
      <div className="blob bg-amber/30 w-72 h-72 bottom-0 -left-12 animate-float-delayed" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-center">

          {/* Left: text + stats */}
          <div className="relative">
            <span
              className="absolute -top-8 -left-2 font-display italic text-[clamp(5rem,12vw,9rem)] font-bold text-ink/[0.04] leading-none select-none pointer-events-none"
              aria-hidden
            >
              Story
            </span>

            <motion.span {...fadeUp(0)} className="eyebrow eyebrow-dot mb-6 relative">
              Our Story
            </motion.span>

            <motion.h2 {...fadeUp(0.08)} className="heading-lg text-ink mb-6 relative">
              Crafted with Passion,{' '}
              <span className="italic text-clay-pink-deep">Since Age 10</span>
            </motion.h2>

            <div className="space-y-5 text-ink-soft leading-relaxed text-lg relative">
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

            <motion.div {...fadeUp(0.4)} className="mt-9 flex flex-wrap items-center gap-5">
              <a
                href="#order-form"
                className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-clay-pill font-semibold bg-ink text-ink-inverse shadow-clay-button-ghost hover:shadow-neu-raised-lg hover:-translate-y-0.5 active:scale-[0.96] active:shadow-clay-pressed transition-all duration-200 ease-press"
              >
                Work With Us
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="https://instagram.com/omygoodiesyyc"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-clay-pink-deep hover:text-amber-deep transition-colors hover:underline underline-offset-4"
              >
                @omygoodiesyyc →
              </a>
            </motion.div>

            <div className="grid grid-cols-3 gap-3 mt-10">
              {stats.map(({ icon: Icon, value, label, tone }, i) => (
                <motion.div
                  key={label}
                  {...fadeUp(0.48 + i * 0.08)}
                  whileHover={{ y: -3 }}
                  className="bg-surface rounded-clay-lg p-4 text-center shadow-neu-raised hover:shadow-clay-float transition-shadow duration-300 group"
                >
                  <div className={`w-11 h-11 rounded-clay-pill ${toneBg[tone]} shadow-neu-inset-deep flex items-center justify-center mx-auto mb-3`}>
                    <Icon size={17} />
                  </div>
                  <p className="font-display text-sm font-semibold text-ink leading-tight">{value}</p>
                  <p className="text-[11px] text-ink-muted mt-1 leading-tight">{label}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: editorial image panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Offset frame */}
            <div className="absolute -bottom-4 -right-4 w-full h-full rounded-clay-xl bg-clay-pink/40 -z-0" aria-hidden />

            {/* Main feature image */}
            <div className="relative aspect-[4/5] rounded-clay-xl bg-surface p-3 shadow-clay-card">
              <div className="relative w-full h-full rounded-clay-lg overflow-hidden shadow-neu-inset-deep">
                <Image
                  src="/02185D58-85EA-4093-A3C1-2D685329BFEE.png"
                  alt="Custom cake — crafted with passion"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
              </div>

              {/* Floating accent image */}
              <motion.div
                initial={{ opacity: 0, y: -12, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.3 }}
                className="absolute -top-6 -right-6 w-32 h-32 rounded-clay-lg bg-surface p-2 shadow-clay-card animate-float"
              >
                <div className="relative w-full h-full rounded-clay-md overflow-hidden shadow-neu-inset">
                  <Image
                    src="/03030855-5FA1-4A91-BC1A-820F96BCD343.png"
                    alt="Elegant cake detail"
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>

              {/* Founder badge */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="absolute -bottom-5 left-5 right-5 bg-surface rounded-clay-lg shadow-clay-card flex overflow-hidden"
              >
                <div className="bg-ink px-5 py-4 flex items-center justify-center shrink-0">
                  <div className="w-12 h-12 rounded-clay-pill bg-clay-pink-deep shadow-clay-glow-pink flex items-center justify-center text-ink-inverse font-display font-bold text-xl">
                    O
                  </div>
                </div>
                <div className="flex-1 px-5 py-4 flex flex-col justify-center">
                  <p className="font-display text-base font-semibold text-ink leading-tight">Onyinye Jessica Ekwulugo</p>
                  <p className="text-xs text-clay-pink-deep font-semibold mt-1">Founder &amp; Lead Cake Artist</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
