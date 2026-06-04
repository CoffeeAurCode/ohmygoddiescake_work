import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import HowItWorks from '@/components/HowItWorks'
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
        <SectionReveal><OrderForm /></SectionReveal>
        <SectionReveal><Reviews /></SectionReveal>
        <SectionReveal><About /></SectionReveal>
      </main>
      <Footer />
    </>
  )
}
