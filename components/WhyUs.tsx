'use client'

import { motion } from 'framer-motion'
import { Palette, Heart, Wand2 } from 'lucide-react'
import Image from 'next/image'
import IconWell from './ui/IconWell'

const features = [
  {
    icon: Palette,
    tone: 'pink' as const,
    title: 'Elevated Design + Exceptional Taste',
    body: 'Many cakes look beautiful but disappoint in flavor — or taste good but lack presence. We refuse to compromise on either. Every cake is a visual statement that also happens to be delicious.',
  },
  {
    icon: Heart,
    tone: 'amber' as const,
    title: 'Personal, One-on-One Experience',
    body: "From first inquiry to pickup, you're not a ticket number. We guide you through the process so you feel confident, informed, and genuinely excited — not stressed.",
  },
  {
    icon: Wand2,
    tone: 'violet' as const,
    title: 'Freestyle Designs, Never Templated',
    body: "We don't pull from a catalog. Each cake is designed specifically for you — giving it a distinct, high-end feel that stands out at any event and photographs beautifully.",
  },
]

const gallery = [
  { src: '/18FB0FAB-46E3-49BE-B543-73CF7120E76F.png', alt: 'Decorated celebration cake' },
  { src: '/1EB21DDC-E24F-4F3F-8819-5BE4988D7BCF.png', alt: 'Floral cake design' },
  { src: '/27954A13-CE76-4803-AC91-DA28BE656B84.png', alt: 'Tiered wedding cake' },
  { src: '/2881EBD7-CCEE-4A1F-BD63-B876A2EC2227.png', alt: 'Custom birthday cake' },
]

export default function WhyUs() {
  return (
    <section className="relative section-padding section-ambient overflow-hidden">
      <div className="blob bg-clay-mint/40 w-96 h-96 top-0 -left-32 animate-drift" />
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="eyebrow eyebrow-dot mb-6">Why Choose Us</span>
          <h2 className="heading-lg text-ink">
            What Sets O&apos; My Goodies{' '}
            <span className="italic text-clay-pink-deep">Apart</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="bg-surface rounded-clay-lg p-8 shadow-neu-raised hover:shadow-clay-float hover:-translate-y-2 transition-all duration-300 ease-clay"
              >
                <IconWell size="lg" tone={f.tone} className="mb-6">
                  <Icon size={28} />
                </IconWell>
                <h3 className="font-display text-2xl text-ink mb-3 leading-snug">{f.title}</h3>
                <p className="text-ink-soft leading-relaxed">{f.body}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Photo gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-5"
        >
          {gallery.map(({ src, alt }, i) => (
            <div
              key={src}
              className="relative aspect-square rounded-clay-lg overflow-hidden bg-surface shadow-neu-raised hover:shadow-clay-float hover:-translate-y-1 transition-all duration-300"
              style={{ animationDelay: `${i * 0.4}s` }}
            >
              <div className="absolute inset-2 rounded-clay-md overflow-hidden shadow-neu-inset-deep">
                <Image src={src} alt={alt} fill className="object-cover hover:scale-110 transition-transform duration-500" />
              </div>
            </div>
          ))}
        </motion.div>

        {/* Founder quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-14 relative rounded-clay-xl p-10 md:p-14 text-center bg-clay-pink-deep text-ink-inverse shadow-clay-card overflow-hidden"
        >
          <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-clay-pink/40 blur-2xl" />
          <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-amber/40 blur-2xl" />
          <span className="relative font-display text-7xl text-clay-pink leading-none block mb-2">&ldquo;</span>
          <p className="relative font-display text-xl md:text-2xl italic leading-relaxed max-w-3xl mx-auto">
            My clients are consistently surprised that the cake tastes even better than it looks — and they love that their cake becomes the focal point of the event. Something guests talk about, photograph, and remember.
          </p>
          <p className="relative mt-6 text-white/80 text-sm font-semibold tracking-[0.18em] uppercase">— Onyinye, Founder</p>
        </motion.div>
      </div>
    </section>
  )
}
