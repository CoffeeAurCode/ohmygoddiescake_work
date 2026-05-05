import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import HowItWorks from '@/components/HowItWorks'
import Reviews from '@/components/Reviews'
import { OrderForm } from '@/components/OrderCTA'
import About from '@/components/About'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <HowItWorks />
        <Reviews />
        <OrderForm />
        <About />
      </main>
      <Footer />
    </>
  )
}
