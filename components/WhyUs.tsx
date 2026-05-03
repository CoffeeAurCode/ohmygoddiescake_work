'use client'

import { motion } from 'framer-motion'
import { Palette, Heart, Wand2 } from 'lucide-react'
import Image from 'next/image'

const features = [
  {
    icon: Palette,
    title: 'Elevated Design + Exceptional Taste',
    body: 'Many cakes look beautiful but disappoint in flavor — or taste good but lack presence. We refuse to compromise on either. Every cake is a visual statement that also happens to be delicious.',
  },
  {
    icon: Heart,
    title: 'Personal, One-on-One Experience',
    body: "From first inquiry to pickup, you're not a ticket number. We guide you through the process so you feel confident, informed, and genuinely excited — not stressed.",
  },
  {
    icon: Wand2,
    title: 'Freestyle Designs, Never Templated',
    body: "We don't pull from a catalog. Each cake is designed specifically for you — giving it a distinct, high-end feel that stands out at any event and photographs beautifully.",
  },
]

export default function WhyUs() {
  return (
    <section className="section-padding bg-cream-dark">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="label-tag mb-4">Why Choose Us</p>
          <h2 className="heading-lg text-charcoal">
            What Sets O&apos; My Goodies{' '}
            <span className="text-rose-gold italic">Apart</span>
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
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="glass-border group bg-white rounded-3xl p-8 shadow-sm hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-rose-gold/10 flex items-center justify-center mb-5 group-hover:bg-rose-gold group-hover:text-white transition-all duration-300">
                  <Icon size={22} className="text-rose-gold group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-serif text-xl text-charcoal mb-3">{f.title}</h3>
                <p className="text-charcoal/65 leading-relaxed text-sm">{f.body}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Photo gallery strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { src: '/18FB0FAB-46E3-49BE-B543-73CF7120E76F.png', alt: 'Decorated celebration cake' },
            { src: '/1EB21DDC-E24F-4F3F-8819-5BE4988D7BCF.png', alt: 'Floral cake design' },
            { src: '/27954A13-CE76-4803-AC91-DA28BE656B84.png', alt: 'Tiered wedding cake' },
            { src: '/2881EBD7-CCEE-4A1F-BD63-B876A2EC2227.png', alt: 'Custom birthday cake' },
          ].map(({ src, alt }) => (
            <div key={src} className="glass-border-img relative aspect-square rounded-2xl overflow-hidden shadow-sm">
              <Image src={src} alt={alt} fill className="object-cover hover:scale-105 transition-transform duration-500" />
            </div>
          ))}
        </motion.div>

        {/* Testimonial strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 bg-gradient-to-r from-rose-gold to-[#B8855A] rounded-3xl p-8 md:p-10 text-center text-white"
        >
          <p className="font-serif text-xl md:text-2xl italic leading-relaxed max-w-3xl mx-auto">
            &ldquo;My clients are consistently surprised that the cake tastes even better than it looks — and they love that their cake becomes the focal point of the event. Something guests talk about, photograph, and remember.&rdquo;
          </p>
          <p className="mt-4 text-white/70 text-sm font-medium">— Onyinye, Founder</p>
        </motion.div>
      </div>
    </section>
  )
}
