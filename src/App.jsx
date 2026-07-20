import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FeatureGrid from './components/FeatureGrid'
import ProductGallery from './components/ProductGallery'
import Testimonials from './components/Testimonials'
import ProcessSection from './components/ProcessSection'
import Footer from './components/Footer'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

/**
 * App Component
 * * Main application component with smooth scrolling enabled via Lenis.
 * Lenis provides inertia-based smooth scrolling integrated with GSAP ScrollTrigger.
 */
function App() {
  const appRef = useRef(null)

  useEffect(() => {
    // Configure GSAP defaults for luxury animations
    gsap.defaults({
      ease: 'power3.out',
      duration: 0.8,
    })

    // 4D Entrance Animation
    const entranceTl = gsap.timeline({ defaults: { ease: 'power4.out' } })

    // Initial state - everything hidden and scaled
    gsap.set(appRef.current, { opacity: 0 })
    gsap.set('.navbar-4d', { y: -100, opacity: 0 })
    gsap.set('.hero-4d', { scale: 1.2, opacity: 0, filter: 'blur(20px)' })
    gsap.set('.content-4d', { y: 100, opacity: 0 })

    // 4D entrance sequence
    entranceTl
      .to(appRef.current, { opacity: 1, duration: 0.5 })
      .to('.navbar-4d', { y: 0, opacity: 1, duration: 1.2 }, '-=0.3')
      .to('.hero-4d', { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 1.5 }, '-=0.8')
      .to('.content-4d', { y: 0, opacity: 1, duration: 1, stagger: 0.1 }, '-=0.5')

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
    const updateLenis = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(updateLenis)

    // Prevent lag smoothing issues
    gsap.ticker.lagSmoothing(0)

    // Cleanup function to prevent memory leaks
    return () => {
      lenis.destroy()
      gsap.ticker.remove(updateLenis)
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <div ref={appRef} className="relative min-h-screen bg-noir-950 grain-texture">
      {/* Fixed Navigation with Branding */}
      <div className="navbar-4d">
        <Navbar />
      </div>

      {/* Main Content - Smooth Scrolling Container */}
      <main className="lenis-smooth">
        {/* Hero Section */}
        <div className="hero-4d">
          <Hero />
        </div>

        {/* Feature Grid Section */}
        <div className="content-4d">
          <FeatureGrid />
        </div>

        {/* Product Gallery Section */}
        <div className="content-4d">
          <ProductGallery />
        </div>

        {/* Testimonials Section */}
        <div className="content-4d">
          <Testimonials />
        </div>

        {/* Process Section */}
        <div className="content-4d">
          <ProcessSection />
        </div>
      </main>

      {/* Footer */}
      <div className="content-4d">
        <Footer />
      </div>
    </div>
  )
}

export default App