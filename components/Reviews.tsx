'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const testimonials = [
  {
    quote:
      'The cake was the centerpiece of our reception — guests took photos before we even cut it. And the flavour? Everyone asked who made it.',
    name: 'Wedding hosts',
    detail: 'Downtown Calgary',
  },
  {
    quote:
      "We've ordered more than once and each cake has been more beautiful than the last. The studio listens and then somehow exceeds what you pictured.",
    name: 'Repeat celebration client',
    detail: 'Calgary',
  },
  {
    quote:
      'We needed something polished for a corporate milestone — on-brand, professional, and delicious. Our team was genuinely impressed.',
    name: 'Corporate client',
    detail: 'Calgary',
  },
] as const

const starSizes = [14, 16, 18, 16, 14]

export default function Reviews() {
  return (
    <section id="reviews" className="section-padding section-ambient bg-amber-muted overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-14"
        >
          <p className="label-tag mb-4">Reviews</p>
          <h2 className="heading-lg text-charcoal">
            Love from{' '}
            <span className="text-rose-gold italic">Calgary</span>
          </h2>
          <p className="mt-4 text-charcoal/55 max-w-xl mx-auto text-sm leading-relaxed">
            Real celebrations, real reactions — here&apos;s what clients say about working with O&apos; My Goodies.
          </p>
        </motion.div>

        {/* Testimonial cards */}
        <div className="grid lg:grid-cols-3 gap-5 mb-10">
          {testimonials.map((t, i) => (
            <motion.article
              key={t.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className="warm-card group rounded-3xl p-8 flex flex-col h-full relative overflow-hidden border-t-2 border-rose-gold/40 hover:-translate-y-1 transition-all duration-500 ease-in-out"
              style={{ background: 'rgba(255,248,236,0.85)' }}
            >
              {/* Decorative large quote mark */}
              <span
                className="absolute top-4 right-6 font-serif text-[7rem] leading-none text-amber-glow/25 select-none pointer-events-none"
                aria-hidden
              >
                &ldquo;
              </span>

              {/* Stars — staggered sizes */}
              <div className="flex items-center gap-0.5 mb-5">
                {starSizes.map((size, j) => (
                  <Star key={j} size={size} className="text-amber fill-amber/90" aria-hidden />
                ))}
              </div>

              <p className="font-serif text-base text-charcoal/85 leading-relaxed flex-1 relative z-10">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="mt-6 pt-5 flex items-center gap-3" style={{ borderTop: '1px solid rgba(245,158,66,0.2)' }}>
                {/* Avatar initial */}
                <div className="w-9 h-9 rounded-full bg-rose-gold/15 border border-rose-gold/30 flex items-center justify-center flex-shrink-0">
                  <span className="font-serif text-sm font-bold text-rose-gold">{t.name[0]}</span>
                </div>
                <div>
                  <p className="font-semibold text-charcoal text-sm leading-tight">{t.name}</p>
                  <p className="text-xs text-rose-gold mt-0.5">{t.detail}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Founder quote — full-bleed strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          className="-mx-6 md:-mx-12 lg:-mx-24 px-8 md:px-16 lg:px-24 py-14 md:py-18 text-center"
          style={{
            background: 'linear-gradient(135deg, #C9956A 0%, #D4845A 55%, #B8855A 100%)',
            boxShadow: '0 0 80px rgba(245,158,66,0.2)',
          }}
        >
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px flex-1 max-w-16 bg-white/30" />
              <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/60">From the studio</p>
              <div className="h-px flex-1 max-w-16 bg-white/30" />
            </div>

            <p className="font-serif text-xl md:text-2xl lg:text-3xl italic leading-relaxed text-white">
              &ldquo;My clients are consistently surprised that the cake tastes even better than it looks — and they love that their cake becomes the focal point of the event. Something guests talk about, photograph, and remember.&rdquo;
            </p>

            <div className="mt-8 flex items-center justify-center gap-3">
              <div className="h-px w-8 bg-white/40" />
              <p className="text-white/75 text-sm font-semibold">Onyinye, Founder</p>
              <div className="h-px w-8 bg-white/40" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
