'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import Image from 'next/image'

const testimonials = [
  {
    quote: 'The cake was the centerpiece of our reception — guests took photos before we even cut it. And the flavour? Everyone asked who made it.',
    name: 'Wedding hosts',
    detail: 'Downtown Calgary',
    tone: 'pink' as const,
  },
  {
    quote: "We've ordered more than once and each cake has been more beautiful than the last. The studio listens and then somehow exceeds what you pictured.",
    name: 'Repeat celebration client',
    detail: 'Calgary',
    tone: 'amber' as const,
  },
  {
    quote: 'We needed something polished for a corporate milestone — on-brand, professional, and delicious. Our team was genuinely impressed.',
    name: 'Corporate client',
    detail: 'Calgary',
    tone: 'violet' as const,
  },
] as const

const toneBg = {
  pink:   'bg-clay-pink text-clay-pink-deep',
  amber:  'bg-amber-glow text-amber-deep',
  violet: 'bg-clay-violet text-ink-inverse',
}

const reviewMarqueeText = "★★★★★  5-Star Reviews  ·  Calgary  ·  O' My Goodies  ·  "

const galleryImgs = [
  '/5B99DEE4-E800-4DF2-B996-E194343F3627.png',
  '/13C93E34-9AE7-4229-860B-5C30D64A3501.png',
  '/8B0413F2-95B7-4B1C-AA81-F4316D8E16DC.png',
  '/F8FF9757-50F0-4FF1-B6C5-EB0B30785CB4.png',
  '/9E94165E-DB30-4B8E-A797-5E58FB3C7D0E.png',
  '/7D294E86-802D-4F67-B12C-E32BD7B29B65.png',
]

export default function Reviews() {
  return (
    <section id="reviews" className="relative section-padding section-ambient overflow-hidden">
      <div className="blob bg-clay-pink/40 w-96 h-96 top-0 -left-32 animate-drift" />
      <div className="blob bg-amber/30 w-80 h-80 bottom-10 -right-20 animate-float" />
      <div className="relative z-10 max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="eyebrow eyebrow-dot mb-6">Reviews</span>
          <h2 className="heading-lg text-ink">
            Love from{' '}
            <span className="italic text-clay-pink-deep">Calgary</span>
          </h2>
          <p className="mt-5 text-ink-soft max-w-xl mx-auto text-lg leading-relaxed">
            Real celebrations, real reactions — here&apos;s what clients say about working with O&apos; My Goodies.
          </p>
        </motion.div>

        {/* Star marquee band */}
        <div className="marquee-wrap mb-12 -mx-6 md:-mx-12 lg:-mx-24">
          <div className="marquee-track py-3 bg-surface shadow-neu-inset rounded-clay-pill mx-6 md:mx-12 lg:mx-24">
            {[0, 1].map(setIdx => (
              <span key={setIdx} className="flex items-center shrink-0">
                {Array(8).fill(null).map((_, j) => (
                  <span
                    key={j}
                    className="text-xs font-bold text-clay-pink-deep tracking-[0.18em] whitespace-nowrap px-6"
                  >
                    {reviewMarqueeText}
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>

        {/* Testimonial cards */}
        <div className="grid lg:grid-cols-3 gap-6 mb-14">
          {testimonials.map((t, i) => (
            <motion.article
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-surface rounded-clay-xl p-8 flex flex-col h-full relative overflow-hidden shadow-neu-raised hover:shadow-clay-float hover:-translate-y-1.5 transition-all duration-300 ease-clay"
            >
              <span
                className="absolute top-5 right-7 font-display text-[7rem] leading-none text-clay-pink/40 select-none pointer-events-none"
                aria-hidden
              >
                &ldquo;
              </span>

              <div className="flex items-center gap-1 mb-6">
                {Array(5).fill(null).map((_, j) => (
                  <Star key={j} size={16} className="text-amber fill-amber" aria-hidden />
                ))}
              </div>

              <p className="font-display text-lg text-ink leading-relaxed flex-1 relative z-10">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="mt-7 pt-5 flex items-center gap-3.5 border-t border-ink/[0.06]">
                <div className={`w-11 h-11 rounded-clay-pill ${toneBg[t.tone]} shadow-neu-inset-deep flex items-center justify-center`}>
                  <span className="font-display text-base font-bold">{t.name[0]}</span>
                </div>
                <div>
                  <p className="font-semibold text-ink text-sm leading-tight">{t.name}</p>
                  <p className="text-xs text-ink-muted mt-1">{t.detail}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Portfolio gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-14"
        >
          {galleryImgs.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="relative aspect-square rounded-clay-md bg-surface p-1.5 shadow-neu-raised hover:shadow-clay-float hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative w-full h-full rounded-clay-sm overflow-hidden shadow-neu-inset-deep">
                <Image
                  src={src}
                  alt="Cake gallery"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 33vw, 16vw"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Founder quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-clay-2xl bg-clay-pink-deep text-ink-inverse p-10 md:p-16 text-center shadow-clay-card overflow-hidden"
        >
          <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-amber/40 blur-3xl" />
          <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-clay-pink/60 blur-3xl" />
          <div className="relative max-w-3xl mx-auto">
            <span className="font-display text-7xl text-clay-pink leading-none block mb-2">&ldquo;</span>
            <p className="font-display text-xl md:text-2xl lg:text-3xl italic leading-relaxed text-white">
              My clients are consistently surprised that the cake tastes even better than it looks — and they love that their cake becomes the focal point of the event. Something guests talk about, photograph, and remember.
            </p>
            <div className="mt-9 flex items-center justify-center gap-3">
              <div className="h-px w-10 bg-white/40" />
              <p className="text-white/85 text-sm font-bold tracking-[0.18em] uppercase">Onyinye, Founder</p>
              <div className="h-px w-10 bg-white/40" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-12 flex justify-center"
        >
          <a
            href="#order-form"
            className="inline-flex items-center gap-2.5 px-10 py-4 rounded-clay-pill font-semibold text-base bg-clay-pink-deep text-ink-inverse shadow-clay-button hover:shadow-clay-glow-pink hover:-translate-y-0.5 active:scale-[0.96] active:shadow-clay-pressed transition-all duration-200 ease-press"
          >
            Get My Custom Quote
          </a>
        </motion.div>
      </div>
    </section>
  )
}
