import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FeatureGrid from './components/FeatureGrid'
import ProcessSection from './components/ProcessSection'
import Footer from './components/Footer'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

function App() {
  useEffect(() => {
    // Configure GSAP defaults for luxury animations
    gsap.defaults({
      ease: 'power3.out',
      duration: 0.8,
    })

    // Cleanup function to prevent memory leaks
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      ScrollTrigger.clearScrollTrigger()
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-noir-950 grain-texture">
      {/* Fixed Navigation with Branding */}
      <Navbar />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero />

        {/* Feature Grid Section */}
        <FeatureGrid />

        {/* Process Section */}
        <ProcessSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App
