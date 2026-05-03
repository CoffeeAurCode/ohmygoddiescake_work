'use client'

import PillNav from './PillNav'

const items = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Order Now', href: '#order' },
]

export default function Navbar() {
  return (
    <PillNav
      items={items}
      baseColor="#FDF8F3"
      pillColor="#C9956A"
      pillTextColor="#FDF8F3"
      hoveredPillTextColor="#C9956A"
      ease="power3.out"
      initialLoadAnimation
    />
  )
}
