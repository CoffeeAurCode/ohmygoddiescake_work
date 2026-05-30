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
    { size: '6" (2 layers)',  servings: '8–10',   price: '$120', num: 120 },
    { size: '6" (3 layers)',  servings: '10–15',  price: '$145', num: 145 },
    { size: '6" (4 layers)',  servings: '15–20',  price: '$165', num: 165 },
    { size: '8" (2 layers)',  servings: '15–20',  price: '$165', num: 165 },
    { size: '8" (3 layers)',  servings: '20–25',  price: '$195', num: 195 },
    { size: '8" (4 layers)',  servings: '25–30',  price: '$225', num: 225 },
    { size: '10" (3 layers)', servings: '35–45',  price: '$295', num: 295 },
    { size: '10" (4 layers)', servings: '45–55',  price: '$345', num: 345 },
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
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.32, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction * -40,
    transition: { duration: 0.22, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  }),
}

/* Animated price cell — each is its own component so hooks are called at top level */
function AnimatedPrice({
  num,
  fallback,
  className,
}: {
  num: number
  fallback: string
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const mv = useMotionValue(0)

  useEffect(() => {
    if (!inView) return
    const c = animate(mv, num, {
      duration: 0.8,
      ease: 'easeOut',
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = `$${Math.round(v)}`
      },
    })
    return c.stop
  }, [inView, num, mv])

  return (
    <span ref={ref} className={className}>
      {fallback}
    </span>
  )
}

/* Single row for the celebration pricing table */
function BirthdayRow({
  size,
  servings,
  price,
  num,
  last,
}: {
  size: string
  servings: string
  price: string
  num: number
  last: boolean
}) {
  return (
    <div
      className={`grid grid-cols-3 px-6 py-3.5 ${!last ? 'border-b border-amber/10' : ''} hover:bg-amber-glow/10 transition-colors duration-300`}
    >
      <span className="text-sm font-semibold text-charcoal self-center">{size}</span>
      <span className="text-sm text-charcoal/55 text-center self-center">{servings}</span>
      <AnimatedPrice num={num} fallback={price} className="font-serif text-lg font-bold text-rose-gold text-right self-center block" />
    </div>
  )
}

/* Single extra card with count-up */
function ExtraCard({ label, note, price, num }: { label: string; note: string; price: string; num: number }) {
  return (
    <div className="glass-border warm-card rounded-3xl p-5 text-center">
      <p className="text-[10px] font-bold uppercase tracking-wider text-charcoal/45 mb-2">{label}</p>
      <AnimatedPrice num={num} fallback={price} className="font-serif text-3xl font-bold text-charcoal block" />
      <p className="text-xs text-charcoal/40 mt-1">{note}</p>
    </div>
  )
}

function BirthdayPanel() {
  return (
    <div className="glass-border warm-card rounded-3xl overflow-hidden">
      <div className="grid grid-cols-3 px-6 py-3 bg-amber-glow/20 border-b border-amber/15">
        <span className="text-[10px] font-bold tracking-wider uppercase text-charcoal/45">Size</span>
        <span className="text-[10px] font-bold tracking-wider uppercase text-charcoal/45 text-center">Servings</span>
        <span className="text-[10px] font-bold tracking-wider uppercase text-charcoal/45 text-right">Starting Price</span>
      </div>
      {celebrationData.rows.map((row, i) => (
        <BirthdayRow
          key={row.size}
          size={row.size}
          servings={row.servings}
          price={row.price}
          num={row.num}
          last={i === celebrationData.rows.length - 1}
        />
      ))}
    </div>
  )
}

/* Single wedding tier row */
function WeddingTierRow({
  tier,
  last,
}: {
  tier: { size: string; servings: number; price: string; num: number }
  last: boolean
}) {
  return (
    <div
      className={`grid grid-cols-3 px-6 py-3 ${!last ? 'border-b border-amber/10' : ''} hover:bg-amber-glow/12 transition-colors duration-300`}
    >
      <span className="font-serif text-lg font-bold text-charcoal self-center">{tier.size}</span>
      <span className="text-sm text-charcoal/55 text-center self-center">{tier.servings}</span>
      <AnimatedPrice num={tier.num} fallback={tier.price} className="font-semibold text-rose-gold text-right self-center block" />
    </div>
  )
}

function WeddingPanel() {
  return (
    <div className="space-y-4">
      <div
        className="rounded-3xl px-6 py-5 flex items-center gap-4"
        style={{
          background: 'linear-gradient(135deg, #C9956A 0%, #D4845A 100%)',
          boxShadow: '0 0 40px rgba(245,158,66,0.2), 0 4px 20px rgba(0,0,0,0.15)',
        }}
      >
        <div>
          <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-1">Per serving minimum</p>
          <span className="font-serif text-4xl font-bold text-white">$14</span>
        </div>
        <div className="ml-auto text-right">
          <p className="text-white/80 text-sm">All tiers priced individually</p>
          <p className="text-white/50 text-xs mt-0.5">Final quote on request</p>
        </div>
      </div>
      <div className="glass-border warm-card rounded-3xl overflow-hidden">
        <div className="grid grid-cols-3 px-6 py-3 bg-amber-glow/20 border-b border-amber/15">
          <span className="text-[10px] font-bold tracking-wider uppercase text-charcoal/45">Tier</span>
          <span className="text-[10px] font-bold tracking-wider uppercase text-charcoal/45 text-center">Serves</span>
          <span className="text-[10px] font-bold tracking-wider uppercase text-charcoal/45 text-right">Price</span>
        </div>
        {weddingTiers.map((tier, i) => (
          <WeddingTierRow key={tier.size} tier={tier} last={i === weddingTiers.length - 1} />
        ))}
      </div>
    </div>
  )
}

/* Corporate item row */
function CorporateRow({
  item,
  last,
}: {
  item: { label: string; note: string; price: string; unit: string; num: number }
  last: boolean
}) {
  return (
    <div className={`flex items-center justify-between py-3.5 ${!last ? 'border-b border-amber/15' : ''}`}>
      <div>
        <p className="font-medium text-charcoal text-sm">{item.label}</p>
        <p className="text-xs text-charcoal/45 mt-0.5">{item.note}</p>
      </div>
      <div className="text-right ml-4 flex items-baseline gap-0.5">
        <AnimatedPrice num={item.num} fallback={item.price} className="font-serif text-2xl font-bold text-charcoal" />
        <span className="text-charcoal/45 text-xs">{item.unit}</span>
      </div>
    </div>
  )
}

function CorporatePanel() {
  return (
    <div className="glass-border warm-card rounded-3xl overflow-hidden">
      {corporateItems.map((item, i) => (
        <div key={item.label} className="px-6">
          <CorporateRow item={item} last={i === corporateItems.length - 1} />
        </div>
      ))}
      <div className="px-6 pb-4">
        <p className="text-[11px] text-charcoal/40">Sheet cake minimum order: 30 servings ($270)</p>
      </div>
    </div>
  )
}

/* Extras item row */
function ExtrasRow({
  item,
  last,
}: {
  item: { label: string; note: string; price: string; num: number }
  last: boolean
}) {
  return (
    <div className={`flex items-center justify-between py-3.5 ${!last ? 'border-b border-amber/15' : ''}`}>
      <div>
        <p className="font-medium text-charcoal text-sm">{item.label}</p>
        <p className="text-xs text-charcoal/45 mt-0.5">{item.note}</p>
      </div>
      <AnimatedPrice num={item.num} fallback={item.price} className="font-serif text-2xl font-bold text-rose-gold ml-4" />
    </div>
  )
}

function ExtrasPanel() {
  return (
    <div className="glass-border warm-card rounded-3xl overflow-hidden">
      {extrasItems.map((item, i) => (
        <div key={item.label} className="px-6">
          <ExtrasRow item={item} last={i === extrasItems.length - 1} />
        </div>
      ))}
    </div>
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
          <p className="mt-4 text-charcoal/55 max-w-lg mx-auto text-sm">
            Every cake is made to order. Fill out the order form for your exact quote.
          </p>
        </motion.div>

        {/* Direction-aware underline tab switcher */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex border-b border-amber/20 mb-8 overflow-x-auto"
        >
          {tabs.map(tab => {
            const Icon = tabIcons[tab]
            return (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className="relative flex items-center gap-2 px-4 py-3 text-sm font-semibold whitespace-nowrap transition-colors duration-300 flex-shrink-0"
                style={{ color: activeTab === tab ? '#C9956A' : 'rgba(45,45,45,0.45)' }}
              >
                <Icon size={14} />
                {tab}
                {activeTab === tab && (
                  <motion.div
                    layoutId="tab-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-gold rounded-full"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            )
          })}
        </motion.div>

        {/* Direction-aware panel transition */}
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

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-10 flex flex-col items-center gap-3"
        >
          <a
            href="#order"
            className="btn-glow btn-amber-glow w-full sm:w-auto bg-rose-gold text-white text-sm font-semibold px-10 py-4 rounded-full hover:bg-opacity-90 transition-all duration-500 ease-in-out text-center"
          >
            Get a Custom Quote
          </a>
          <p className="text-xs text-charcoal/40 text-center max-w-sm leading-relaxed">
            Prices are estimates. Final quote depends on design complexity. Rush orders under 3 days notice incur an additional fee.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
