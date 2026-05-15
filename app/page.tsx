import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import HowItWorks from '@/components/HowItWorks'
import Pricing from '@/components/Pricing'
import Reviews from '@/components/Reviews'
import { OrderForm } from '@/components/OrderCTA'
import About from '@/components/About'
import Footer from '@/components/Footer'
import SectionReveal from '@/components/SectionReveal'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <SectionReveal><HowItWorks /></SectionReveal>
        <SectionReveal><Pricing /></SectionReveal>
        <SectionReveal><Reviews /></SectionReveal>
        <SectionReveal><OrderForm /></SectionReveal>
        <SectionReveal><About /></SectionReveal>
      </main>
      <Footer />
    </>
  )
}
