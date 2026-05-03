'use client'

import { motion } from 'framer-motion'
import { Instagram, Phone, Mail, ExternalLink } from 'lucide-react'
import Image from 'next/image'

export default function OrderCTA() {
  return (
    <section id="order" className="section-padding bg-charcoal relative overflow-hidden">
      {/* Background cake image */}
      <div className="absolute inset-0">
        <Image
          src="/719244DA-380B-43BD-B1EC-CF3F5F4F2DB6.png"
          alt="Background cake"
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/90 to-charcoal/95" />
      </div>
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Decorative dots */}
        <div className="flex justify-center gap-2 mb-8">
          {[0, 1, 2].map(i => (
            <span key={i} className={`rounded-full bg-rose-gold ${i === 1 ? 'w-3 h-3' : 'w-2 h-2 opacity-50 mt-0.5'}`} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-rose-gold mb-4">
            Ready to Order
          </p>
          <h2 className="heading-lg text-white mb-5">
            Let&apos;s Create Something{' '}
            <span className="text-rose-gold italic">Unforgettable</span>
          </h2>
          <p className="text-white/55 max-w-xl mx-auto leading-relaxed mb-10">
            Fill out the order form to get started — or reach us directly on Instagram, by phone, or email. We typically respond within 24 hours.
          </p>

          {/* Primary CTA */}
          <a
            href="https://instagram.com/omygoodiesyyc"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glow glass-border-dark inline-flex items-center gap-2.5 bg-rose-gold text-white font-bold text-base px-10 py-4 rounded-full hover:bg-opacity-90 hover:-translate-y-0.5 transition-all mb-10"
          >
            <ExternalLink size={18} />
            Fill Out the Order Form
          </a>

          {/* Contact methods */}
          <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <a
              href="https://instagram.com/omygoodiesyyc"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-border-dark flex flex-col items-center gap-2 bg-white/5 rounded-2xl py-5 px-4 hover:bg-white/10 transition-all group"
            >
              <Instagram size={22} className="text-rose-gold" />
              <span className="text-xs font-semibold text-white group-hover:text-rose-gold transition-colors">@omygoodiesyyc</span>
              <span className="text-[10px] text-white/40 uppercase tracking-wider">Instagram / DMs</span>
            </a>

            <a
              href="tel:4034045262"
              className="glass-border-dark flex flex-col items-center gap-2 bg-white/5 rounded-2xl py-5 px-4 hover:bg-white/10 transition-all group"
            >
              <Phone size={22} className="text-rose-gold" />
              <span className="text-xs font-semibold text-white group-hover:text-rose-gold transition-colors">403-404-5262</span>
              <span className="text-[10px] text-white/40 uppercase tracking-wider">Call / Text</span>
            </a>

            <a
              href="mailto:omygoodies00@gmail.com"
              className="glass-border-dark flex flex-col items-center gap-2 bg-white/5 rounded-2xl py-5 px-4 hover:bg-white/10 transition-all group"
            >
              <Mail size={22} className="text-rose-gold" />
              <span className="text-xs font-semibold text-white group-hover:text-rose-gold transition-colors break-all">omygoodies00@gmail.com</span>
              <span className="text-[10px] text-white/40 uppercase tracking-wider">Email</span>
            </a>
          </div>

          {/* Location note */}
          <p className="mt-8 text-white/35 text-xs">
            📍 Home studio · Downtown Calgary · 1122 15 Ave SW, T2R 1K5
          </p>
        </motion.div>
      </div>
    </section>
  )
}
