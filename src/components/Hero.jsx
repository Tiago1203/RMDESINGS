import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Menu, X, Instagram, ArrowDown } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
  const containerRef = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero content animations
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo('.hero-badge', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 }
      )
      .fromTo('.hero-title', 
        { opacity: 0, y: 60, skewY: 3 },
        { opacity: 1, y: 0, skewY: 0, duration: 1.2 },
        '-=0.4'
      )
      .fromTo('.hero-subtitle', 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.6'
      )
      .fromTo('.hero-cta', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.4'
      )
      .fromTo('.hero-scroll', 
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        '-=0.2'
      )

      // Parallax effect on scroll
      gsap.to('.hero-video', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Video entrance
      gsap.fromTo('.hero-video',
        { scale: 1.1, opacity: 0.6 },
        { scale: 1, opacity: 1, duration: 1.8, ease: 'power2.out' }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Video Background with Fallback */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          className="hero-video w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/assets/hero-poster.jpg"
        >
          <source src="/assets/hero-video.mp4" type="video/mp4" />
        </video>
        {/* Overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-noir-950/40 via-transparent to-noir-950" />
        <div className="gradient-radial absolute inset-0 opacity-60" />
      </div>

      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 section-padding">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="hero-badge opacity-0">
            <span className="font-display text-2xl md:text-3xl tracking-extra-wide text-ivory-100">
              RM<span className="text-champagne-400">.</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-12">
            <a href="#colecciones" className="hero-badge link-luxury opacity-0 text-sm tracking-extra-wide uppercase">
              Colecciones
            </a>
            <a href="#proceso" className="hero-badge link-luxury opacity-0 text-sm tracking-extra-wide uppercase">
              Proceso
            </a>
            <a href="#nosotros" className="hero-badge link-luxury opacity-0 text-sm tracking-extra-wide uppercase">
              Nosotros
            </a>
            <a href="#contacto" className="hero-badge btn-luxury opacity-0">
              Contactar
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden hero-badge opacity-0 p-2 text-ivory-100">
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full section-padding text-center">
        <span className="hero-badge opacity-0 inline-block mb-6 text-champagne-400 text-sm tracking-ultra-wide uppercase">
          Alta Costura Premium
        </span>
        
        <h1 className="hero-title opacity-0 text-hero font-light mb-6">
          <span className="block">Elegancia</span>
          <span className="block text-champagne-400 italic">Redefinida</span>
        </h1>
        
        <p className="hero-subtitle opacity-0 max-w-xl text-subheading mb-10">
          Trajes de baile e implementos de alta gama, 
          artesanalmente creados para quienes buscan la perfección.
        </p>
        
        <a href="#colecciones" className="hero-cta opacity-0 btn-luxury">
          Descubrir Colección
        </a>
      </div>

      {/* Scroll Indicator */}
      <div className="hero-scroll opacity-0 absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="text-noir-400 text-xs tracking-ultra-wide uppercase">Scroll</span>
        <ArrowDown size={16} className="text-champagne-400 animate-bounce" />
      </div>

      {/* Social Links */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-6">
        <a 
          href="https://instagram.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-noir-400 hover:text-champagne-400 transition-colors duration-300"
          aria-label="Instagram"
        >
          <Instagram size={18} />
        </a>
      </div>
    </section>
  )
}

export default Hero
