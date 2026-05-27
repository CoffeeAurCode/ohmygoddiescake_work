import { Instagram, Phone, Mail, MapPin, ArrowRight } from 'lucide-react'

const navLinks = [
  { label: 'Gallery',    href: '#services' },
  { label: 'Process',    href: '#process' },
  { label: 'Reviews',    href: '#reviews' },
  { label: 'Quote form', href: '#order-form' },
  { label: 'Our Story',  href: '#about' },
]

export default function Footer() {
  return (
    <footer className="relative bg-[#1E1A16] text-ink-inverse">
      {/* Fade strip — blends from warm surface into dark footer */}
      <div
        className="absolute -top-24 left-0 right-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(30,26,22,0) 0%, rgba(30,26,22,0.5) 50%, #1E1A16 100%)' }}
        aria-hidden
      />
      <div className="footer-gradient-border relative" />

      {/* CTA strip */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-white/[0.06]">
        <div className="text-center sm:text-left">
          <p className="font-display text-2xl md:text-3xl leading-tight">Ready to order your custom cake?</p>
          <p className="text-white/50 text-sm mt-1.5">We&apos;ll respond with a quote within 24 hours.</p>
        </div>
        <a
          href="#order-form"
          className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-clay-pill font-semibold bg-clay-pink-deep text-ink-inverse shadow-clay-button hover:shadow-clay-glow-pink hover:-translate-y-0.5 active:scale-[0.96] active:shadow-clay-pressed transition-all duration-200 ease-press"
        >
          Start your order
          <ArrowRight size={16} />
        </a>
      </div>

      {/* Columns */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-14">
          {/* Brand */}
          <div className="relative">
            <div
              className="absolute -top-6 -left-6 w-40 h-20 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at center, rgba(244,166,184,0.18) 0%, transparent 70%)' }}
              aria-hidden
            />
            <p className="font-display text-3xl mb-3 relative">O&apos; My Goodies</p>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Luxury custom cakes in Downtown Calgary. Elevated design, exceptional taste — made for your most important moments.
            </p>
            <div className="flex gap-3 mt-6">
              <a
                href="https://instagram.com/omygoodiesyyc"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-11 h-11 rounded-clay-pill flex items-center justify-center text-white/70 hover:text-clay-pink bg-white/[0.04] hover:bg-white/[0.08] hover:-translate-y-0.5 transition-all duration-300"
                style={{ boxShadow: '0 6px 18px rgba(244,166,184,0.18), inset 0 1px 0 rgba(255,255,255,0.08)' }}
              >
                <Instagram size={17} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-white/90 text-xs font-bold tracking-[0.22em] uppercase mb-6">Quick Links</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              {navLinks.map(l => (
                <a
                  key={l.href}
                  href={l.href}
                  className="footer-link-animated text-sm text-white/55 hover:text-clay-pink transition-colors duration-300"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-white/90 text-xs font-bold tracking-[0.22em] uppercase mb-6">Contact</p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-white/55">
                <MapPin size={15} className="text-clay-pink shrink-0 mt-0.5" />
                <span className="leading-snug">1122 15 Ave SW<br />Calgary, AB · T2R 1K5<br />(Home Bakery)</span>
              </li>
              <li>
                <a
                  href="tel:4034045262"
                  className="footer-link-animated flex items-center gap-3 text-sm text-white/55 hover:text-clay-pink transition-colors duration-300"
                >
                  <Phone size={15} className="text-clay-pink shrink-0" />
                  <span>403-404-5262</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:omygoodies00@gmail.com"
                  className="footer-link-animated flex items-center gap-3 text-sm text-white/55 hover:text-clay-pink transition-colors duration-300"
                >
                  <Mail size={15} className="text-clay-pink shrink-0" />
                  <span>omygoodies00@gmail.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="relative pt-8">
          <div className="absolute top-0 left-0 right-0 flex items-center">
            <div className="flex-1 h-px bg-white/[0.08]" />
            <span className="mx-4 text-clay-pink/60 text-xs">◆</span>
            <div className="flex-1 h-px bg-white/[0.08]" />
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30 pt-2">
            <p>© {new Date().getFullYear()} O&apos; My Goodies Custom Cakes. All rights reserved.</p>
            <p>Business Reg. TN23607229 · Calgary, AB</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
