'use client'

import { motion } from 'framer-motion'
import { MapPin, Calendar, Sparkles } from 'lucide-react'
import Image from 'next/image'

const stats = [
  { icon: Calendar, value: 'Since 2020', label: 'Baking professionally' },
  { icon: MapPin, value: 'Calgary, AB', label: 'Home bakery, Downtown' },
  { icon: Sparkles, value: 'Custom Only', label: 'No templates, ever' },
]

export default function About() {
  return (
    <section id="about" className="section-padding section-ambient bg-amber-light overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="label-tag mb-4">Our Story</p>
            <h2 className="heading-lg text-charcoal mb-6">
              Crafted with Passion,{' '}
              <span className="text-rose-gold italic">Since Age 10</span>
            </h2>
            <div className="space-y-4 text-charcoal/70 leading-relaxed">
              <p>
                It started with a Wilton decorating course at 10 years old — and never stopped. Through culinary training, hands-on apprenticeships, and years of refinement, what began as childhood curiosity became a full creative practice.
              </p>
              <p>
                When friends and family started asking to <em>pay</em> for these cakes, it clicked: this wasn&apos;t just baking. It was creating something people valued for their most important moments.
              </p>
              <p>
                Today, O&apos; My Goodies Custom Cakes is built on one belief — that a cake made for a milestone should feel as extraordinary as the milestone itself.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-4">
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
            </div>
          </motion.div>

          {/* Visual panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col gap-5"
          >
            {/* Photo mosaic */}
            <div className="grid grid-cols-2 gap-3">
              <div className="glass-border-img relative aspect-[3/4] rounded-3xl overflow-hidden">
                <Image src="/02185D58-85EA-4093-A3C1-2D685329BFEE.png" alt="Custom cake design" fill className="object-cover hover:scale-105 transition-transform duration-700 ease-in-out" />
              </div>
              <div className="flex flex-col gap-3">
                <div className="glass-border-img relative aspect-square rounded-3xl overflow-hidden">
                  <Image src="/03030855-5FA1-4A91-BC1A-820F96BCD343.png" alt="Elegant cake" fill className="object-cover hover:scale-105 transition-transform duration-700 ease-in-out" />
                </div>
                <div className="glass-border-img relative aspect-square rounded-3xl overflow-hidden">
                  <Image src="/0E16201C-4525-4570-8F96-FA20816FE2C3.png" alt="Wedding cake" fill className="object-cover hover:scale-105 transition-transform duration-700 ease-in-out" />
                </div>
              </div>
            </div>

            {/* Founder tag */}
            <div className="glass-border rounded-3xl px-5 py-4 flex items-center gap-4"
              style={{ background: 'linear-gradient(135deg, rgba(250,215,160,0.35) 0%, rgba(201,149,106,0.18) 100%)' }}>
              <div className="w-10 h-10 rounded-full bg-rose-gold flex items-center justify-center text-white font-serif font-bold text-lg flex-shrink-0"
                style={{ boxShadow: '0 0 16px rgba(245,158,66,0.35)' }}>
                O
              </div>
              <div>
                <p className="font-serif text-sm font-semibold text-charcoal">Onyinye Jessica Ekwulugo</p>
                <p className="text-xs text-rose-gold font-medium">Founder & Lead Cake Artist</p>
              </div>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-3 gap-3">
              {stats.map(({ icon: Icon, value, label }) => (
                <div
                  key={label}
                  className="glass-border warm-card rounded-3xl p-4 text-center"
                >
                  <Icon className="mx-auto mb-2 text-amber" size={20} />
                  <p className="font-serif text-sm font-semibold text-charcoal">{value}</p>
                  <p className="text-[10px] text-charcoal/50 mt-0.5 leading-tight">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
