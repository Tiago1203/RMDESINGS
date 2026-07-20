import { useEffect, useRef, useState, useCallback } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'
import LandingPage from './components/LandingPage'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import CategoryPage from './pages/CategoryPage'
import ProcesoPage from './pages/ProcesoPage'
import NosotrosPage from './pages/NosotrosPage'
import ContactoPage from './pages/ContactoPage'

gsap.registerPlugin(ScrollTrigger)

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function MainLayout() {
  const mainRef = useRef(null)

  useEffect(() => {
    if (!mainRef.current) return

    gsap.defaults({ ease: 'power3.out', duration: 0.8 })

    gsap.set(mainRef.current, { opacity: 0 })
    gsap.to(mainRef.current, { opacity: 1, duration: 0.6, ease: 'power2.out' })

    const lenis = new Lenis({
      duration: 0.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.2,
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
      <ScrollToTop />
      <main className="lenis-smooth">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/coleccion/:categorySlug" element={<CategoryPage />} />
          <Route path="/proceso" element={<ProcesoPage />} />
          <Route path="/nosotros" element={<NosotrosPage />} />
          <Route path="/contacto" element={<ContactoPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      <Footer />
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
      duration: 0.4,
      ease: 'power2.inOut',
      onComplete: () => {
        setShowLanding(false)
        window.scrollTo(0, 0)
      },
    })
  }, [transitioning])

  useEffect(() => {
    if (!showLanding && wrapperRef.current) {
      gsap.fromTo(wrapperRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      )
    }
  }, [showLanding])

  return (
    <div ref={wrapperRef}>
      {showLanding ? (
        <LandingPage onEnter={handleEnter} />
      ) : (
        <BrowserRouter>
          <MainLayout />
        </BrowserRouter>
      )}
    </div>
  )
}

export default App
