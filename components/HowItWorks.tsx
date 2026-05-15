'use client'

import { motion } from 'framer-motion'
import { FileText, DollarSign, CheckCircle, Clock, Calendar, CreditCard } from 'lucide-react'
import Image from 'next/image'

const steps = [
  {
    icon: FileText,
    step: '01',
    title: 'Build Your Cake',
    body: 'Choose your occasion, size, flavour, and add-ons in our instant quote form. Takes less than 2 minutes.',
    accent: Clock,
    accentLabel: '< 2 min',
  },
  {
    icon: DollarSign,
    step: '02',
    title: 'Get Your Price Instantly',
    body: 'See your custom quote right away — no waiting, no back and forth.',
    accent: Calendar,
    accentLabel: 'Instant quote',
  },
  {
    icon: CheckCircle,
    step: '03',
    title: "Confirm & We'll Handle the Rest",
    body: 'Send your 50% deposit via e-transfer to lock in your date. We bake, you celebrate.',
    accent: CreditCard,
    accentLabel: '50% deposit',
  },
]

export default function HowItWorks() {
  return (
    <section id="process" className="section-padding section-ambient bg-amber-muted overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-16"
        >
          <p className="label-tag mb-4">The Process</p>
          <h2 className="heading-lg text-charcoal">
            How to Order Your{' '}
            <span className="text-rose-gold italic">Custom Cake</span>
          </h2>
          <p className="mt-4 text-charcoal/55 max-w-xl mx-auto text-sm">
            Three simple steps from first message to first bite. We keep it straightforward so you can focus on celebrating.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connector line (desktop only) */}
          <div className="hidden md:block absolute top-12 left-[16.666%] right-[16.666%] h-px">
            <div className="w-full h-full border-t-2 border-dashed border-amber/40" />
            {/* Animated glow dot */}
            <motion.div
              animate={{ x: ['0%', '100%', '0%'] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-rose-gold shadow-[0_0_12px_rgba(201,149,106,0.7)]"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {steps.map((s, i) => {
              const Icon = s.icon
              const AccentIcon = s.accent
              return (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.65, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
                  className="relative flex flex-col items-center md:items-start text-center md:text-left"
                >
                  {/* Step circle */}
                  <div className="relative mb-6 z-10">
                    <div className="w-24 h-24 rounded-full bg-amber-light border-2 border-amber/20 flex items-center justify-center shadow-[0_0_32px_rgba(245,158,66,0.12)]">
                      <Icon size={28} className="text-rose-gold" />
                    </div>
                    {/* Step number badge */}
                    <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-rose-gold flex items-center justify-center text-white text-[11px] font-bold font-serif shadow-md">
                      {i + 1}
                    </span>
                  </div>

                  {/* Content card */}
                  <div className="glass-border warm-card rounded-3xl p-6 w-full relative overflow-hidden">
                    {/* Ghost step number */}
                    <span className="absolute bottom-3 right-4 font-serif text-6xl font-bold text-amber-glow/20 leading-none select-none">
                      {s.step}
                    </span>

                    <h3 className="font-serif text-lg text-charcoal mb-2 pr-8 leading-snug">{s.title}</h3>
                    <p className="text-sm text-charcoal/60 leading-relaxed mb-4">{s.body}</p>

                    {/* Accent chip */}
                    <div className="inline-flex items-center gap-1.5 bg-amber-glow/30 rounded-full px-3 py-1">
                      <AccentIcon size={11} className="text-rose-gold" />
                      <span className="text-[11px] font-semibold text-charcoal/70">{s.accentLabel}</span>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Photo row — middle image offset upward */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-12 grid grid-cols-3 gap-4 items-end"
        >
          {[
            { src: '/5D581933-F7D4-4D2A-A509-B39B9880E450.png', alt: 'Cake in progress', offset: false },
            { src: '/5E2A5DFB-B609-4BAB-B9F5-89EF60E8178A.png', alt: 'Finished custom cake', offset: true },
            { src: '/606FB398-83B5-4291-9662-7B11DDABD84C.png', alt: 'Cake art detail', offset: false },
          ].map(({ src, alt, offset }) => (
            <div
              key={src}
              className={`glass-border-img relative rounded-3xl overflow-hidden shadow-sm transition-transform duration-700 ${offset ? '-translate-y-5' : ''}`}
              style={{ aspectRatio: '4/3' }}
            >
              <Image src={src} alt={alt} fill className="object-cover hover:scale-105 transition-transform duration-700 ease-in-out" />
            </div>
          ))}
        </motion.div>

        {/* Notice band */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.45, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="glass-border mt-10 rounded-3xl overflow-hidden"
          style={{ background: 'rgba(245,158,66,0.06)' }}
        >
          <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-amber/15">
            {[
              { label: 'Minimum notice', value: '3 days', note: 'Rush fee $15–25 if under 3 days' },
              { label: 'Recommended', value: '2 weeks', note: 'Book early for your date' },
              { label: 'Deposit', value: '50%', note: 'Via e-transfer to confirm' },
            ].map(item => (
              <div key={item.label} className="flex-1 px-6 py-4 text-center">
                <p className="text-[10px] font-semibold tracking-widest uppercase text-charcoal/40 mb-1">{item.label}</p>
                <p className="font-serif text-xl font-bold text-charcoal">{item.value}</p>
                <p className="text-[11px] text-charcoal/50 mt-0.5">{item.note}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
