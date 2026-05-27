'use client'

import { motion } from 'framer-motion'
import { FileText, DollarSign, CheckCircle, Clock, Calendar, CreditCard, ArrowRight } from 'lucide-react'

const steps = [
  {
    icon: FileText,
    tone: 'pink' as const,
    step: '01',
    title: 'Fill Out Our Quote Form',
    body: 'Choose your occasion, size, flavour, and add-ons. Takes less than 2 minutes.',
    accent: Clock,
    accentLabel: '< 2 min',
  },
  {
    icon: DollarSign,
    tone: 'amber' as const,
    step: '02',
    title: 'Receive Your Custom Quote',
    body: 'Get your personalised quote within 48 hours — no back and forth.',
    accent: Calendar,
    accentLabel: 'Within 48 hrs',
  },
  {
    icon: CheckCircle,
    tone: 'violet' as const,
    step: '03',
    title: 'Approve & Pay Your Deposit',
    body: 'Confirm your order with a 50% deposit via e-transfer to lock in your date.',
    accent: CreditCard,
    accentLabel: '50% deposit',
  },
]

const toneBg = {
  pink:   'bg-clay-pink text-clay-pink-deep',
  amber:  'bg-amber-glow text-amber-deep',
  violet: 'bg-clay-violet text-ink-inverse',
}

export default function HowItWorks() {
  return (
    <section id="process" className="relative section-padding section-ambient overflow-hidden">
      <div className="blob bg-clay-violet/30 w-80 h-80 top-20 -left-32 animate-float" />
      <div className="blob bg-amber/30 w-80 h-80 bottom-10 -right-24 animate-float-delayed" />
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="eyebrow eyebrow-dot mb-6">The Process</span>
          <h2 className="heading-lg text-ink">
            How to Order Your{' '}
            <span className="italic text-clay-pink-deep">Custom Cake</span>
          </h2>
          <p className="mt-5 text-ink-soft max-w-xl mx-auto text-lg leading-relaxed">
            Three simple steps from first message to first bite. We keep it straightforward so you can focus on celebrating.
          </p>
        </motion.div>

        <div className="relative">
          {/* Dotted connector */}
          <div className="hidden md:block absolute top-14 left-[16.666%] right-[16.666%] h-0.5">
            <svg width="100%" height="2" viewBox="0 0 100 2" preserveAspectRatio="none">
              <motion.path
                d="M0 1 L100 1"
                stroke="#C9956A"
                strokeOpacity="0.45"
                strokeWidth="0.4"
                strokeDasharray="1.5 1.5"
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1.4, ease: 'easeInOut', delay: 0.2 }}
              />
            </svg>
            <motion.div
              animate={{ x: ['0%', '100%', '0%'] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-clay-pink-deep shadow-clay-glow-pink"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-6">
            {steps.map((s, i) => {
              const Icon = s.icon
              const AccentIcon = s.accent
              return (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                  className="relative flex flex-col items-center text-center"
                >
                  {/* Step circle */}
                  <div className="relative mb-7 z-10">
                    <motion.div
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.6 }}
                      className={`w-28 h-28 rounded-clay-pill ${toneBg[s.tone]} shadow-clay-card flex items-center justify-center`}
                    >
                      <div className="w-20 h-20 rounded-clay-pill bg-surface shadow-neu-inset-deep flex items-center justify-center">
                        <Icon size={30} className="text-clay-pink-deep" />
                      </div>
                    </motion.div>
                    <span className="absolute -top-1 -right-1 w-9 h-9 rounded-clay-pill bg-ink text-ink-inverse flex items-center justify-center text-xs font-bold font-display shadow-clay-card">
                      {i + 1}
                    </span>
                  </div>

                  {/* Content card */}
                  <div className="bg-surface rounded-clay-lg shadow-neu-raised p-7 w-full relative overflow-hidden hover:shadow-clay-float hover:-translate-y-1 transition-all duration-300">
                    <span className="absolute -bottom-4 -right-2 font-display text-8xl font-bold text-clay-pink/25 leading-none select-none">
                      {s.step}
                    </span>
                    <h3 className="font-display text-xl text-ink mb-2.5 leading-snug relative">{s.title}</h3>
                    <p className="text-sm text-ink-soft leading-relaxed mb-5 relative">{s.body}</p>
                    <div className="relative inline-flex items-center gap-2 bg-surface shadow-neu-inset rounded-clay-pill px-3.5 py-1.5">
                      <AccentIcon size={12} className="text-clay-pink-deep" />
                      <span className="text-xs font-bold text-ink-soft tracking-wide">{s.accentLabel}</span>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-14 flex justify-center"
        >
          <a
            href="#order-form"
            className="group inline-flex items-center gap-2.5 px-10 py-4 rounded-clay-pill font-semibold text-base bg-clay-pink-deep text-ink-inverse shadow-clay-button hover:shadow-clay-glow-pink hover:-translate-y-0.5 active:scale-[0.96] active:shadow-clay-pressed transition-all duration-200 ease-press"
          >
            Get My Custom Quote
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
