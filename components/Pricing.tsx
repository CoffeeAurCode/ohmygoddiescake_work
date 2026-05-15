'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const tabs = ['Birthday & Celebration', 'Wedding', 'Corporate', 'Extras'] as const
type Tab = typeof tabs[number]

const celebrationData = {
  sixInch: [
    { size: 'Small 6"', price: '$185' },
    { size: 'Medium 6"', price: '$245' },
    { size: 'Tall 6"', price: '$325' },
  ],
  eightInch: [
    { size: 'Small 8"', price: '$240' },
    { size: 'Medium 8"', price: '$325' },
    { size: 'Tall 8"', price: '$425' },
  ],
  other: [
    { label: 'Cupcakes', note: 'per dozen', price: '$72' },
    { label: 'Cupcake Set', note: '4" cake + 8 cupcakes', price: '$185' },
  ],
}

const weddingTiers = [
  { size: '4"',  servings: 8,  price: '$125' },
  { size: '6"',  servings: 15, price: '$225' },
  { size: '8"',  servings: 20, price: '$325' },
  { size: '10"', servings: 25, price: '$425' },
  { size: '12"', servings: 36, price: '$575' },
  { size: '14"', servings: 50, price: '$775' },
  { size: '16"', servings: 65, price: '$975' },
]

const corporateItems = [
  { label: 'Sheet Cake', note: 'minimum 30 servings', price: '$9', unit: '/serving' },
  { label: 'Sugar Cookies', note: 'with edible image print', price: '$10', unit: ' each' },
  { label: 'Cupcakes', note: 'with edible image print', price: '$9', unit: ' each' },
]

const extrasItems = [
  { label: 'Stacking Fee', note: 'per cake', price: '$40' },
  { label: 'Fondant Covered Tier', note: 'per tier', price: '$50' },
  { label: 'Delivery & Setup', note: 'starting at', price: '$125' },
]

const tabVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] } },
}

function BirthdayPanel() {
  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass-border warm-card rounded-3xl p-6">
          <p className="label-tag mb-4">6" Cakes</p>
          <div className="space-y-3">
            {celebrationData.sixInch.map(item => (
              <div key={item.size} className="flex justify-between items-center py-2 border-b border-amber/20 last:border-0">
                <span className="text-charcoal/80 text-sm font-medium">{item.size}</span>
                <span className="font-serif text-xl font-bold text-charcoal">{item.price}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-border warm-card rounded-3xl p-6">
          <p className="label-tag mb-4">8" Cakes</p>
          <div className="space-y-3">
            {celebrationData.eightInch.map(item => (
              <div key={item.size} className="flex justify-between items-center py-2 border-b border-amber/20 last:border-0">
                <span className="text-charcoal/80 text-sm font-medium">{item.size}</span>
                <span className="font-serif text-xl font-bold text-charcoal">{item.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {celebrationData.other.map(item => (
          <div key={item.label} className="glass-border warm-card rounded-3xl p-5 flex flex-col items-center text-center">
            <p className="text-charcoal/60 text-xs font-semibold uppercase tracking-wider mb-1">{item.label}</p>
            <p className="font-serif text-2xl font-bold text-charcoal">{item.price}</p>
            <p className="text-charcoal/45 text-xs mt-1">{item.note}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function WeddingPanel() {
  return (
    <div className="space-y-5">
      <div className="glass-border-dark bg-charcoal rounded-3xl px-6 py-4 flex items-center gap-3"
        style={{ boxShadow: '0 0 40px rgba(245,158,66,0.12), 0 4px 24px rgba(0,0,0,0.2)' }}>
        <span className="text-amber-glow font-serif text-2xl font-bold">$14</span>
        <div>
          <p className="text-white text-sm font-semibold">Per serving minimum</p>
          <p className="text-white/50 text-xs">All tiers priced individually</p>
        </div>
      </div>

      <div className="glass-border warm-card rounded-3xl overflow-hidden">
        <div className="grid grid-cols-3 px-6 py-3 bg-amber-glow/20 border-b border-amber/15">
          <span className="text-xs font-semibold tracking-wider uppercase text-charcoal/50">Tier Size</span>
          <span className="text-xs font-semibold tracking-wider uppercase text-charcoal/50 text-center">Servings</span>
          <span className="text-xs font-semibold tracking-wider uppercase text-charcoal/50 text-right">Price</span>
        </div>
        {weddingTiers.map((tier, i) => (
          <div
            key={tier.size}
            className={`grid grid-cols-3 px-6 py-3.5 ${i < weddingTiers.length - 1 ? 'border-b border-amber/10' : ''} hover:bg-amber-glow/20 transition-colors duration-500`}
          >
            <span className="font-serif text-lg font-bold text-charcoal">{tier.size}</span>
            <span className="text-charcoal/60 text-sm text-center self-center">{tier.servings} servings</span>
            <span className="font-semibold text-rose-gold text-right self-center">{tier.price}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function CorporatePanel() {
  return (
    <div className="space-y-4">
      {corporateItems.map(item => (
        <div key={item.label} className="glass-border warm-card rounded-3xl p-5 flex items-center justify-between">
          <div>
            <p className="font-serif text-lg font-semibold text-charcoal">{item.label}</p>
            <p className="text-charcoal/50 text-sm">{item.note}</p>
          </div>
          <div className="text-right">
            <span className="font-serif text-2xl font-bold text-charcoal">{item.price}</span>
            <span className="text-charcoal/50 text-sm">{item.unit}</span>
          </div>
        </div>
      ))}
      <p className="text-xs text-charcoal/45 text-center pt-2">Sheet cake minimum order: 30 servings ($270)</p>
    </div>
  )
}

function ExtrasPanel() {
  return (
    <div className="space-y-4">
      {extrasItems.map(item => (
        <div key={item.label} className="glass-border warm-card rounded-3xl p-5 flex items-center justify-between">
          <div>
            <p className="font-serif text-lg font-semibold text-charcoal">{item.label}</p>
            <p className="text-charcoal/50 text-sm">{item.note}</p>
          </div>
          <span className="font-serif text-2xl font-bold text-rose-gold">{item.price}</span>
        </div>
      ))}
    </div>
  )
}

export default function Pricing() {
  const [activeTab, setActiveTab] = useState<Tab>('Birthday & Celebration')

  return (
    <section id="pricing" className="section-padding section-ambient bg-amber-light overflow-hidden">
      <div className="relative z-10 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-10"
        >
          <p className="label-tag mb-4">Investment</p>
          <h2 className="heading-lg text-charcoal">
            Transparent{' '}
            <span className="text-rose-gold italic">Pricing</span>
          </h2>
          <p className="mt-4 text-charcoal/60 max-w-lg mx-auto">
            Every cake is made to order. Fill out the order form for your exact quote.
          </p>
        </motion.div>

        {/* Tab Pills */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-500 ease-in-out ${
                activeTab === tab
                  ? 'bg-rose-gold text-white shadow-md'
                  : 'warm-card text-charcoal/60 glass-border hover:text-rose-gold'
              }`}
            >
              {tab}
            </button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={tabVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {activeTab === 'Birthday & Celebration' && <BirthdayPanel />}
            {activeTab === 'Wedding' && <WeddingPanel />}
            {activeTab === 'Corporate' && <CorporatePanel />}
            {activeTab === 'Extras' && <ExtrasPanel />}
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-10 flex flex-col items-center gap-4"
        >
          <a
            href="#order"
            className="btn-glow btn-amber-glow bg-rose-gold text-white text-sm font-semibold px-9 py-3.5 rounded-full hover:bg-opacity-90 transition-all duration-500 ease-in-out"
          >
            Get a Custom Quote
          </a>
          <p className="text-xs text-charcoal/45 text-center max-w-sm">
            Prices are estimates. Final quote depends on design complexity. Rush orders under 3 days notice incur an additional fee.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
