'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView, useMotionValue, animate } from 'framer-motion'
import { Cake, Crown, Briefcase, Plus } from 'lucide-react'

const tabs = ['Birthday & Celebration', 'Wedding', 'Corporate', 'Extras'] as const
type Tab = typeof tabs[number]

const tabIcons: Record<Tab, typeof Cake> = {
  'Birthday & Celebration': Cake,
  'Wedding': Crown,
  'Corporate': Briefcase,
  'Extras': Plus,
}

const celebrationData = {
  rows: [
    { label: 'Small',  six: { price: '$185', num: 185 }, eight: { price: '$240', num: 240 } },
    { label: 'Medium', six: { price: '$245', num: 245 }, eight: { price: '$325', num: 325 } },
    { label: 'Tall',   six: { price: '$325', num: 325 }, eight: { price: '$425', num: 425 } },
  ],
  other: [
    { label: 'Cupcakes', note: 'per dozen', price: '$72', num: 72 },
    { label: 'Cupcake Set', note: '4" cake + 8 cupcakes', price: '$185', num: 185 },
  ],
}

const weddingTiers = [
  { size: '4"',  servings: 8,  price: '$125', num: 125 },
  { size: '6"',  servings: 15, price: '$225', num: 225 },
  { size: '8"',  servings: 20, price: '$325', num: 325 },
  { size: '10"', servings: 25, price: '$425', num: 425 },
  { size: '12"', servings: 36, price: '$575', num: 575 },
  { size: '14"', servings: 50, price: '$775', num: 775 },
  { size: '16"', servings: 65, price: '$975', num: 975 },
]

const corporateItems = [
  { label: 'Sheet Cake', note: 'minimum 30 servings', price: '$9', unit: '/serving', num: 9 },
  { label: 'Sugar Cookies', note: 'with edible image print', price: '$10', unit: ' each', num: 10 },
  { label: 'Cupcakes', note: 'with edible image print', price: '$9', unit: ' each', num: 9 },
]

const extrasItems = [
  { label: 'Stacking Fee', note: 'per cake', price: '$40', num: 40 },
  { label: 'Fondant Covered Tier', note: 'per tier', price: '$50', num: 50 },
  { label: 'Delivery & Setup', note: 'starting at', price: '$125', num: 125 },
]

const panelVariants = {
  initial: (direction: number) => ({ opacity: 0, x: direction * 40 }),
  animate: { opacity: 1, x: 0, transition: { duration: 0.32, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
  exit: (direction: number) => ({ opacity: 0, x: direction * -40, transition: { duration: 0.22 } }),
}

function AnimatedPrice({ num, fallback, className }: { num: number; fallback: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const mv = useMotionValue(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(mv, num, {
      duration: 0.8, ease: 'easeOut',
      onUpdate: v => { if (ref.current) ref.current.textContent = `$${Math.round(v)}` },
    })
    return c.stop
  }, [inView, num, mv])
  return <span ref={ref} className={className}>{fallback}</span>
}

function PanelCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-surface rounded-clay-xl shadow-neu-raised overflow-hidden">
      {children}
    </div>
  )
}

function BirthdayPanel() {
  return (
    <div className="space-y-5">
      <PanelCard>
        <div className="grid grid-cols-3 px-7 py-4 bg-clay-pink/30 border-b border-ink/[0.06]">
          <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-ink-soft">Size</span>
          <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-ink-soft text-center">6&quot; Cake</span>
          <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-ink-soft text-right">8&quot; Cake</span>
        </div>
        {celebrationData.rows.map((row, i) => (
          <div
            key={row.label}
            className={`grid grid-cols-3 px-7 py-4 ${i < celebrationData.rows.length - 1 ? 'border-b border-ink/[0.06]' : ''} hover:bg-clay-pink/10 transition-colors duration-300`}
          >
            <span className="text-sm font-semibold text-ink-soft self-center">{row.label}</span>
            <AnimatedPrice num={row.six.num} fallback={row.six.price} className="font-display text-xl font-bold text-ink text-center self-center block" />
            <AnimatedPrice num={row.eight.num} fallback={row.eight.price} className="font-display text-xl font-bold text-clay-pink-deep text-right self-center block" />
          </div>
        ))}
      </PanelCard>
      <div className="grid grid-cols-2 gap-4">
        {celebrationData.other.map(item => (
          <div key={item.label} className="bg-surface rounded-clay-lg p-5 text-center shadow-neu-raised hover:shadow-clay-float hover:-translate-y-0.5 transition-all duration-300">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink-muted mb-2">{item.label}</p>
            <AnimatedPrice num={item.num} fallback={item.price} className="font-display text-3xl font-bold text-ink block" />
            <p className="text-xs text-ink-muted mt-1.5">{item.note}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function WeddingPanel() {
  return (
    <div className="space-y-4">
      <div className="relative rounded-clay-xl px-7 py-6 flex items-center gap-4 bg-clay-pink-deep text-ink-inverse shadow-clay-card overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-amber/40 blur-2xl" />
        <div className="relative">
          <p className="text-white/75 text-[10px] font-bold uppercase tracking-[0.18em] mb-1.5">Per serving minimum</p>
          <span className="font-display text-4xl font-bold text-white">$14</span>
        </div>
        <div className="relative ml-auto text-right">
          <p className="text-white/85 text-sm font-semibold">All tiers priced individually</p>
          <p className="text-white/60 text-xs mt-1">Final quote on request</p>
        </div>
      </div>
      <PanelCard>
        <div className="grid grid-cols-3 px-7 py-4 bg-amber-glow/40 border-b border-ink/[0.06]">
          <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-ink-soft">Tier</span>
          <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-ink-soft text-center">Serves</span>
          <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-ink-soft text-right">Price</span>
        </div>
        {weddingTiers.map((tier, i) => (
          <div
            key={tier.size}
            className={`grid grid-cols-3 px-7 py-3.5 ${i < weddingTiers.length - 1 ? 'border-b border-ink/[0.06]' : ''} hover:bg-amber-glow/15 transition-colors duration-300`}
          >
            <span className="font-display text-lg font-bold text-ink self-center">{tier.size}</span>
            <span className="text-sm text-ink-soft text-center self-center">{tier.servings}</span>
            <AnimatedPrice num={tier.num} fallback={tier.price} className="font-semibold text-clay-pink-deep text-right self-center block" />
          </div>
        ))}
      </PanelCard>
    </div>
  )
}

function CorporatePanel() {
  return (
    <PanelCard>
      {corporateItems.map((item, i) => (
        <div key={item.label} className={`flex items-center justify-between px-7 py-4 ${i < corporateItems.length - 1 ? 'border-b border-ink/[0.06]' : ''}`}>
          <div>
            <p className="font-semibold text-ink text-sm">{item.label}</p>
            <p className="text-xs text-ink-muted mt-1">{item.note}</p>
          </div>
          <div className="text-right ml-4 flex items-baseline gap-0.5">
            <AnimatedPrice num={item.num} fallback={item.price} className="font-display text-2xl font-bold text-ink" />
            <span className="text-ink-muted text-xs">{item.unit}</span>
          </div>
        </div>
      ))}
      <div className="px-7 pb-5">
        <p className="text-xs text-ink-muted">Sheet cake minimum order: 30 servings ($270)</p>
      </div>
    </PanelCard>
  )
}

function ExtrasPanel() {
  return (
    <PanelCard>
      {extrasItems.map((item, i) => (
        <div key={item.label} className={`flex items-center justify-between px-7 py-4 ${i < extrasItems.length - 1 ? 'border-b border-ink/[0.06]' : ''}`}>
          <div>
            <p className="font-semibold text-ink text-sm">{item.label}</p>
            <p className="text-xs text-ink-muted mt-1">{item.note}</p>
          </div>
          <AnimatedPrice num={item.num} fallback={item.price} className="font-display text-2xl font-bold text-clay-pink-deep ml-4" />
        </div>
      ))}
    </PanelCard>
  )
}

export default function Pricing() {
  const [activeTab, setActiveTab] = useState<Tab>('Birthday & Celebration')
  const [direction, setDirection] = useState(0)
  const tabIndex = tabs.indexOf(activeTab)

  const handleTabChange = (tab: Tab) => {
    const newIndex = tabs.indexOf(tab)
    setDirection(newIndex > tabIndex ? 1 : -1)
    setActiveTab(tab)
  }

  return (
    <section id="pricing" className="relative section-padding section-ambient overflow-hidden">
      <div className="blob bg-clay-pink/40 w-80 h-80 -top-16 right-10 animate-drift" />
      <div className="relative z-10 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="eyebrow eyebrow-dot mb-6">Investment</span>
          <h2 className="heading-lg text-ink">
            Transparent{' '}
            <span className="italic text-clay-pink-deep">Pricing</span>
          </h2>
          <p className="mt-5 text-ink-soft max-w-lg mx-auto text-lg">
            Every cake is made to order. Fill out the order form for your exact quote.
          </p>
        </motion.div>

        {/* Tab switcher — neumorphic pill */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-surface rounded-clay-xl shadow-neu-inset p-1.5 mb-10 flex gap-1 overflow-x-auto"
        >
          {tabs.map(tab => {
            const Icon = tabIcons[tab]
            const isActive = activeTab === tab
            return (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`relative flex-1 min-w-max flex items-center justify-center gap-2 px-4 py-3 rounded-clay-lg text-sm font-bold whitespace-nowrap transition-all duration-300 ease-press ${
                  isActive
                    ? 'bg-clay-pink-deep text-ink-inverse shadow-clay-button'
                    : 'text-ink-soft hover:text-ink'
                }`}
              >
                <Icon size={14} />
                {tab}
              </button>
            )
          })}
        </motion.div>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeTab}
            custom={direction}
            variants={panelVariants}
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

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-12 flex flex-col items-center gap-4"
        >
          <a
            href="#order-form"
            className="inline-flex items-center justify-center gap-2.5 px-10 py-4 rounded-clay-pill font-semibold text-base bg-clay-pink-deep text-ink-inverse shadow-clay-button hover:shadow-clay-glow-pink hover:-translate-y-0.5 active:scale-[0.96] active:shadow-clay-pressed transition-all duration-200 ease-press"
          >
            Get a Custom Quote
          </a>
          <p className="text-xs text-ink-muted text-center max-w-sm leading-relaxed">
            Prices are estimates. Final quote depends on design complexity. Rush orders under 3 days notice incur an additional fee.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
