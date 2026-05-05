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
      'We’ve ordered more than once and each cake has been more beautiful than the last. The studio listens and then somehow exceeds what you pictured.',
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

export default function Reviews() {
  return (
    <section id="reviews" className="section-padding bg-cream">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="label-tag mb-4">Reviews</p>
          <h2 className="heading-lg text-charcoal">
            Love from{' '}
            <span className="text-rose-gold italic">Calgary</span>
          </h2>
          <p className="mt-4 text-charcoal/60 max-w-xl mx-auto text-sm leading-relaxed">
            Real celebrations, real reactions — here&apos;s what clients say about working with O&apos; My Goodies.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 mb-10">
          {testimonials.map((t, i) => (
            <motion.article
              key={t.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="glass-border bg-white rounded-3xl p-8 shadow-sm flex flex-col h-full hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} size={16} className="text-rose-gold fill-rose-gold/90" aria-hidden />
                ))}
              </div>
              <p className="font-serif text-lg text-charcoal/90 leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-6 pt-5 border-t border-charcoal/10">
                <p className="font-semibold text-charcoal text-sm">{t.name}</p>
                <p className="text-xs text-rose-gold mt-0.5">{t.detail}</p>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="bg-gradient-to-r from-rose-gold to-[#B8855A] rounded-3xl p-8 md:p-12 text-center text-white shadow-lg"
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-white/80 mb-4">From the studio</p>
          <p className="font-serif text-xl md:text-2xl lg:text-3xl italic leading-relaxed max-w-3xl mx-auto">
            &ldquo;My clients are consistently surprised that the cake tastes even better than it looks — and they love that their cake becomes the focal point of the event. Something guests talk about, photograph, and remember.&rdquo;
          </p>
          <p className="mt-6 text-white/80 text-sm font-medium">— Onyinye, Founder</p>
        </motion.div>
      </div>
    </section>
  )
}
