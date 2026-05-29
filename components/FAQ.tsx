'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

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
    <section className="section-padding bg-cream">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="label-tag mb-4">FAQ</p>
          <h2 className="heading-lg text-charcoal">
            Questions We{' '}
            <span className="text-rose-gold italic">Always Get</span>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-border bg-white rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="font-serif text-charcoal font-medium leading-snug">{faq.q}</span>
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cream-dark flex items-center justify-center text-rose-gold">
                  {open === i ? <Minus size={16} /> : <Plus size={16} />}
                </span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="px-6 pb-5 text-sm text-charcoal/65 leading-relaxed border-t border-blush/20 pt-4">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
