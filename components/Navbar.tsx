'use client'

import PillNav from './PillNav'

const items = [
  { label: 'Gallery', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Quote', href: '#order-form' },
  { label: 'Our Story', href: '#about' },
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
