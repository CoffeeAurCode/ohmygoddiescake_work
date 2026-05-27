'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'

const faqs = [
  {
    q: 'Will my cake look exactly like the inspiration photo?',
    a: "We work from inspiration photos but create original designs — never exact copies of another baker's work. Think of it as your vision interpreted through our unique artistic style. In most cases, clients tell us the final result exceeded their expectations.",
  },
  {
    q: 'Does it taste as good as it looks?',
    a: "Yes — and our clients consistently say this is what surprises them most. We refuse to compromise on flavor. The cake must be as delicious as it is stunning. Taste it at pickup and we're confident you'll agree.",
  },
  {
    q: 'Is it worth the price compared to a grocery store cake?',
    a: "A grocery store cake is mass-produced with no personalization. Our cakes are made from scratch, custom-designed for your exact event, and crafted with premium ingredients. You're not paying for a cake — you're paying for a centerpiece that becomes part of the memory.",
  },
  {
    q: 'How far in advance should I order?',
    a: "We recommend at least 2 weeks notice for most custom cakes. Rush orders (under 3 days) are sometimes possible with an additional $15–25 fee, depending on availability. For weddings and large events, the earlier the better — ideally 4–8 weeks.",
  },
  {
    q: 'Do you accommodate dietary restrictions?',
    a: "Yes — we can accommodate gluten-free, dairy-free, nut-free, vegan, and halal requests. Please mention any dietary needs when filling out the order form. Note that our kitchen handles common allergens, so we cannot guarantee zero cross-contamination for severe allergies.",
  },
  {
    q: 'Can I get a consultation before ordering?',
    a: "A phone consultation is available upon request, especially for larger or more complex orders like wedding cakes. For most standard custom cakes, our order form and a quick message exchange are sufficient to get everything just right.",
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="relative section-padding section-ambient overflow-hidden">
      <div className="blob bg-clay-violet/30 w-72 h-72 -top-12 right-0 animate-float" />
      <div className="relative z-10 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="eyebrow eyebrow-dot mb-6">FAQ</span>
          <h2 className="heading-lg text-ink">
            Questions We{' '}
            <span className="italic text-clay-pink-deep">Always Get</span>
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = open === i
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className={`bg-surface rounded-clay-lg overflow-hidden transition-shadow duration-300 ${
                  isOpen ? 'shadow-neu-pressed' : 'shadow-neu-raised'
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 md:px-7 py-5 md:py-6 text-left focus-clay"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-lg md:text-xl text-ink font-medium leading-snug">{faq.q}</span>
                  <span
                    className={`shrink-0 w-10 h-10 rounded-clay-pill bg-surface text-clay-pink-deep flex items-center justify-center transition-all duration-300 ease-clay ${
                      isOpen ? 'shadow-neu-inset-deep rotate-45' : 'shadow-neu-raised'
                    }`}
                  >
                    <Plus size={18} />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
                    >
                      <p className="px-6 md:px-7 pb-6 text-base text-ink-soft leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
