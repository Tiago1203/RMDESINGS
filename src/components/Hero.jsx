import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Instagram, ArrowDown } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/**
 * Hero Section Component
 * 
 * Optimized video background with GSAP entrance animations.
 * Navigation is handled by separate Navbar component.
 * Features:
 * - Video with poster fallback for LCP optimization
 * - Parallax scroll effect
 * - Staggered text animations with 60fps performance
 */
const Hero = () => {
  const containerRef = useRef(null)
  const videoRef = useRef(null)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      // Master timeline for coordinated entrance sequence
      const tl = gsap.timeline({ 
        defaults: { ease: 'power3.out' },
        delay: 0.8 // Start after Navbar animation
      })

      // Staggered entrance animations - 60fps optimized
      tl.fromTo('.hero-badge', 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.1 }
      )
      .fromTo('.hero-title', 
        { opacity: 0, y: 80, skewY: 4 },
        { opacity: 1, y: 0, skewY: 0, duration: 1.4 },
        '-=0.6'
      )
      .fromTo('.hero-subtitle', 
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1 },
        '-=0.8'
      )
      .fromTo('.hero-cta', 
        { opacity: 0, y: 25, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8 },
        '-=0.6'
      )
      .fromTo('.hero-scroll', 
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        '-=0.4'
      )

      // Video parallax effect on scroll
      gsap.to('.hero-video', {
        yPercent: 25,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })

      // Video entrance animation with scale
      gsap.fromTo('.hero-video',
        { scale: 1.15, opacity: 0.7 },
        { 
          scale: 1, 
          opacity: 1, 
          duration: 2, 
          ease: 'power2.out',
          delay: -0.5
        }
      )

      // Subtle floating animation for decorative elements
      gsap.to('.hero-float-element', {
        y: -15,
        duration: 2.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.5
      })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  const handleVideoCanPlay = () => {
    setIsVideoLoaded(true)
    gsap.to('.hero-video', {
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out'
    })
  }

  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden"
      role="banner"
      aria-label="Hero section - RM Designs Alta Costura"
    >
      {/* Video Background with Optimized Loading */}
      <div className="absolute inset-0">
        {/* Poster Image - Shown immediately (LCP optimization) */}
        <div 
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-0' : 'opacity-100'}`}
          style={{ 
            backgroundImage: 'url(/assets/hero-poster.jpg)',
            backgroundColor: '#0a0a0a'
          }}
          aria-hidden="true"
        />
        
        {/* Video Element - Loads after poster */}
        <video
          ref={videoRef}
          className="hero-video w-full h-full object-cover opacity-0"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/assets/hero-poster.jpg"
          onCanPlay={handleVideoCanPlay}
          aria-hidden="true"
        >
          <source src="/assets/hero-video.mp4" type="video/mp4" />
          <source src="/assets/hero-video.webm" type="video/webm" />
        </video>

        {/* Multi-layer Overlays for Depth */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-noir-950/60 via-noir-950/30 to-noir-950" 
          aria-hidden="true"
        />
        <div 
          className="gradient-radial absolute inset-0 opacity-60" 
          aria-hidden="true"
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full section-padding text-center">
        {/* Badge */}
        <span className="hero-badge opacity-0 inline-block mb-6 md:mb-8 font-sans text-xs md:text-sm text-champagne-400 tracking-[0.3em] uppercase">
          <span className="inline-block w-8 h-px bg-gradient-to-r from-transparent to-champagne-400/50 mr-4 align-middle" />
          Alta Costura Premium
          <span className="inline-block w-8 h-px bg-gradient-to-l from-transparent to-champagne-400/50 ml-4 align-middle" />
        </span>
        
        {/* Title - Editorial Typography */}
        <h1 className="hero-title opacity-0 font-display text-hero font-light mb-6 md:mb-8 max-w-5xl">
          <span className="block text-ivory-100 tracking-wide">Elegancia</span>
          <span className="block text-champagne-400 italic font-light">Redefinida</span>
        </h1>
        
        {/* Subtitle */}
        <p className="hero-subtitle opacity-0 max-w-xl md:max-w-2xl mb-10 md:mb-12 text-base md:text-lg text-noir-300 leading-relaxed">
          Trajes de baile e implementos de alta gama, 
          artesanalmente creados para quienes buscan la perfección absoluta.
        </p>
        
        {/* CTA Button */}
        <a 
          href="#colecciones" 
          className="hero-cta opacity-0 group inline-flex items-center gap-3 px-8 py-4 text-sm tracking-[0.2em] uppercase
                   text-noir-950 bg-champagne-400 font-medium
                   hover:bg-gold-400 transition-all duration-300
                   shadow-lg shadow-champagne-400/20 hover:shadow-champagne-400/40"
        >
          <span>Descubrir Colección</span>
          <svg 
            className="w-4 h-4 transition-transform group-hover:translate-x-1" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>

      {/* Scroll Indicator */}
      <div className="hero-scroll opacity-0 absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="text-noir-400 text-[10px] md:text-xs tracking-[0.25em] uppercase">Scroll</span>
        <ArrowDown 
          size={16} 
          className="text-champagne-400" 
          style={{ animation: 'bounce 2s infinite' }} 
        />
      </div>

      {/* Decorative Elements */}
      <div 
        className="hero-float-element absolute top-1/4 right-[8%] lg:right-[12%] w-1 h-1 bg-champagne-400/40 rounded-full hidden lg:block"
        aria-hidden="true"
      />
      <div 
        className="hero-float-element absolute bottom-1/3 left-[6%] lg:left-[10%] w-px h-16 bg-gradient-to-b from-transparent via-champagne-400/30 to-transparent hidden lg:block"
        aria-hidden="true"
      />

      {/* Social Links - Sidebar */}
      <div className="absolute right-6 lg:right-10 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-6">
        <a 
          href="https://instagram.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-noir-500 hover:text-champagne-400 transition-colors duration-500 focus:outline-none focus:text-champagne-400"
          aria-label="Síguenos en Instagram"
        >
          <Instagram size={20} strokeWidth={1.5} />
        </a>
        <div className="w-px h-20 bg-gradient-to-b from-noir-700 to-transparent" aria-hidden="true" />
      </div>

      {/* Keyframe Animation */}
      <style>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(8px); }
          60% { transform: translateY(4px); }
        }
      `}</style>
    </section>
  )
}

export default Hero
