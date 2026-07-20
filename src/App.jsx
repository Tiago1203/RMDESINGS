import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'
import LandingPage from './components/LandingPage'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FeatureGrid from './components/FeatureGrid'
import ProductGallery from './components/ProductGallery'
import Testimonials from './components/Testimonials'
import ProcessSection from './components/ProcessSection'
import Footer from './components/Footer'

gsap.registerPlugin(ScrollTrigger)

function MainSite() {
  const mainRef = useRef(null)

  useEffect(() => {
    if (!mainRef.current) return

    gsap.defaults({ ease: 'power3.out', duration: 0.8 })

    /* entrance */
    const entranceTl = gsap.timeline({ defaults: { ease: 'power4.out' } })

    gsap.set(mainRef.current, { opacity: 0 })
    gsap.set('.hero-4d', { scale: 1.2, opacity: 0, filter: 'blur(20px)' })
    gsap.set('.content-4d', { y: 100, opacity: 0 })

    entranceTl
      .to(mainRef.current, { opacity: 1, duration: 0.6 })
      .to('.hero-4d', { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 1.2 }, '-=0.3')
      .to('.content-4d', { y: 0, opacity: 1, duration: 0.8, stagger: 0.08 }, '-=0.5')

    /* Lenis */
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })
    lenis.on('scroll', ScrollTrigger.update)
    const updateLenis = (time) => { lenis.raf(time * 1000) }
    gsap.ticker.add(updateLenis)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(updateLenis)
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <div ref={mainRef} className="relative min-h-screen bg-noir-950 grain-texture">
      <Navbar />

      <main className="lenis-smooth">
        <div className="hero-4d"><Hero /></div>
        <div className="content-4d"><FeatureGrid /></div>
        <div className="content-4d"><ProductGallery /></div>
        <div className="content-4d"><Testimonials /></div>
        <div className="content-4d"><ProcessSection /></div>
      </main>

      <div className="content-4d"><Footer /></div>
    </div>
  )
}

function App() {
  const [showLanding, setShowLanding] = useState(true)
  const [transitioning, setTransitioning] = useState(false)
  const wrapperRef = useRef(null)

  const handleEnter = useCallback(() => {
    if (transitioning) return
    setTransitioning(true)

    gsap.to(wrapperRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.inOut',
      onComplete: () => {
        setShowLanding(false)
        window.scrollTo(0, 0)
      },
    })
  }, [transitioning])

  /* fade-in when main site mounts after transition */
  useEffect(() => {
    if (!showLanding && wrapperRef.current) {
      gsap.fromTo(wrapperRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: 'power2.out' }
      )
    }
  }, [showLanding])

  return (
    <div ref={wrapperRef}>
      {showLanding ? (
        <LandingPage onEnter={handleEnter} />
      ) : (
        <MainSite />
      )}
    </div>
  )
}

export default App
