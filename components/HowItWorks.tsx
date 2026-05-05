'use client'

import { motion } from 'framer-motion'
import { FileText, DollarSign, CheckCircle } from 'lucide-react'
import Image from 'next/image'

const steps = [
  {
    icon: FileText,
    step: '01',
    title: 'Build Your Cake',
    body: 'Choose your occasion, size, flavour, and add-ons in our instant quote form. Takes less than 2 minutes.',
  },
  {
    icon: DollarSign,
    step: '02',
    title: 'Get Your Price Instantly',
    body: 'See your custom quote right away — no waiting, no back and forth.',
  },
  {
    icon: CheckCircle,
    step: '03',
    title: "Confirm & We'll Handle the Rest",
    body: 'Send your 50% deposit via e-transfer to lock in your date. We bake, you celebrate.',
  },
]

export default function HowItWorks() {
  return (
    <section id="process" className="section-padding bg-cream-dark">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="label-tag mb-4">The Process</p>
          <h2 className="heading-lg text-charcoal">
            How to Order Your{' '}
            <span className="text-rose-gold italic">Custom Cake</span>
          </h2>
          <p className="mt-4 text-charcoal/60 max-w-xl mx-auto">
            Three simple steps from first message to first bite. We keep it straightforward so you can focus on celebrating.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="glass-border relative bg-white rounded-3xl p-6 hover:shadow-md transition-all duration-300"
              >
                {/* Step number */}
                <span className="absolute top-5 right-5 font-serif text-4xl font-bold text-blush/40 leading-none">
                  {s.step}
                </span>

                {/* Icon */}
                <div className="w-11 h-11 rounded-xl bg-rose-gold/10 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-rose-gold" />
                </div>

                <h3 className="font-serif text-lg text-charcoal mb-2 pr-8">{s.title}</h3>
                <p className="text-sm text-charcoal/60 leading-relaxed">{s.body}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Decorative photo row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 grid grid-cols-3 gap-4"
        >
          {[
            { src: '/5D581933-F7D4-4D2A-A509-B39B9880E450.png', alt: 'Cake in progress' },
            { src: '/5E2A5DFB-B609-4BAB-B9F5-89EF60E8178A.png', alt: 'Finished custom cake' },
            { src: '/606FB398-83B5-4291-9662-7B11DDABD84C.png', alt: 'Cake art detail' },
          ].map(({ src, alt }) => (
            <div key={src} className="glass-border-img relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm">
              <Image src={src} alt={alt} fill className="object-cover hover:scale-105 transition-transform duration-500" />
            </div>
          ))}
        </motion.div>

        {/* Notice box */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="glass-border mt-10 bg-rose-gold/10 rounded-2xl px-6 py-4 flex flex-wrap gap-4 justify-center text-sm text-charcoal/70 text-center"
        >
          <span>⏰ <strong className="text-charcoal">Minimum notice:</strong> 3 days (rush fee $15–25 applies if under 3 days)</span>
          <span className="hidden md:block text-blush">·</span>
          <span>📅 <strong className="text-charcoal">Recommended:</strong> 2 weeks in advance</span>
          <span className="hidden md:block text-blush">·</span>
          <span>💸 <strong className="text-charcoal">Deposit:</strong> 50% via e-transfer to book</span>
        </motion.div>
      </div>
    </section>
  )
}
