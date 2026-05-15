import { Instagram, Phone, Mail, MapPin } from 'lucide-react'

const navLinks = [
  { label: 'Gallery', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Quote form', href: '#order-form' },
  { label: 'Our Story', href: '#about' },
]

export default function Footer() {
  return (
    <footer className="border-t border-amber/10" style={{ background: '#1E1A16' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-14">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <p className="font-serif text-2xl text-white mb-3">O&apos; My Goodies</p>
            <p className="text-white/45 text-sm leading-relaxed max-w-xs">
              Luxury custom cakes in Downtown Calgary. Elevated design, exceptional taste — made for your most important moments.
            </p>
            <div className="flex gap-3 mt-5">
              <a
                href="https://instagram.com/omygoodiesyyc"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full flex items-center justify-center text-white/50 transition-all duration-500 ease-in-out hover:text-amber-glow footer-instagram-btn"
              >
                <Instagram size={16} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-white text-sm font-semibold tracking-widest uppercase mb-4">Quick Links</p>
            <ul className="space-y-2.5">
              {navLinks.map(l => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-white/45 hover:text-amber-glow transition-colors duration-500 ease-in-out">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-white text-sm font-semibold tracking-widest uppercase mb-4">Contact</p>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-white/45">
                <MapPin size={15} className="text-amber flex-shrink-0 mt-0.5" />
                <span>1122 15 Ave SW<br />Calgary, AB · T2R 1K5<br />(Home Bakery)</span>
              </li>
              <li>
                <a href="tel:4034045262" className="flex items-center gap-2.5 text-sm text-white/45 hover:text-amber-glow transition-colors duration-500 ease-in-out">
                  <Phone size={15} className="text-amber flex-shrink-0" />
                  403-404-5262
                </a>
              </li>
              <li>
                <a href="mailto:omygoodies00@gmail.com" className="flex items-center gap-2.5 text-sm text-white/45 hover:text-amber-glow transition-colors duration-500 ease-in-out">
                  <Mail size={15} className="text-amber flex-shrink-0" />
                  omygoodies00@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/25"
          style={{ borderTop: '1px solid rgba(245,158,66,0.1)' }}>
          <p>© {new Date().getFullYear()} O&apos; My Goodies Custom Cakes. All rights reserved.</p>
          <p>Business Reg. TN23607229 · Calgary, AB</p>
        </div>
      </div>
    </footer>
  )
}
