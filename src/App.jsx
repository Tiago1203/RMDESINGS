import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FeatureGrid from './components/FeatureGrid'
import ProcessSection from './components/ProcessSection'
import Footer from './components/Footer'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

/**
 * App Component
 * 
 * Main application component with smooth scrolling enabled via Lenis.
 * Lenis provides inertia-based smooth scrolling integrated with GSAP ScrollTrigger.
 */
function App() {
  useEffect(() => {
    // Configure GSAP defaults for luxury animations
    gsap.defaults({
      ease: 'power3.out',
      duration: 0.8,
    })

    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    // Connect Lenis to GSAP ScrollTrigger for synchronized animations
    lenis.on('scroll', ScrollTrigger.update)

    // RAF loop for smooth animation frame
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    // Prevent lag smoothing issues
    gsap.ticker.lagSmoothing(0)

    // Cleanup function to prevent memory leaks
    return () => {
      lenis.destroy()
      gsap.ticker.remove((time) => lenis.raf(time * 1000))
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      ScrollTrigger.clearScrollTrigger()
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-noir-950 grain-texture">
      {/* Fixed Navigation with Branding */}
      <Navbar />

      {/* Main Content - Smooth Scrolling Container */}
      <main className="lenis-smooth">
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
