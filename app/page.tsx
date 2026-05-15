import StartingAnimation from '@/components/StartingAnimation'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import HowItWorks from '@/components/HowItWorks'
import Pricing from '@/components/Pricing'
import Reviews from '@/components/Reviews'
import { OrderForm } from '@/components/OrderCTA'
import About from '@/components/About'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <StartingAnimation />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <HowItWorks />
        <Pricing />
        <Reviews />
        <OrderForm />
        <About />
      </main>
      <Footer />
    </>
  )
}
