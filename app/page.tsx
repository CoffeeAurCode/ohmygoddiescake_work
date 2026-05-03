import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import WhyUs from '@/components/WhyUs'
import Services from '@/components/Services'
import FlavorsOptions from '@/components/FlavorsOptions'
import AddOns from '@/components/AddOns'
import HowItWorks from '@/components/HowItWorks'
import Pricing from '@/components/Pricing'
import Policies from '@/components/Policies'
import FAQ from '@/components/FAQ'
import OrderCTA from '@/components/OrderCTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <WhyUs />
        <Services />
        <FlavorsOptions />
        <AddOns />
        <HowItWorks />
        <Pricing />
        <Policies />
        <FAQ />
        <OrderCTA />
      </main>
      <Footer />
    </>
  )
}
