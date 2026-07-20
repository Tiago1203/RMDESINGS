import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Instagram, ArrowDown } from 'lucide-react'
import Logo from './branding/Logo'

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
      // Master timeline for coordinated entrance sequence - 4D effect
      const tl = gsap.timeline({ 
        defaults: { ease: 'power4.out' },
        delay: 0.8 // Start after Navbar animation
      })

      // Staggered entrance animations with 4D depth effects
      tl.fromTo('.hero-badge', 
        { opacity: 0, y: 50, scale: 0.8, filter: 'blur(10px)' },
        { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 1.2 }
      )
      .fromTo('.hero-title', 
        { opacity: 0, y: 100, scale: 1.15, filter: 'blur(20px)', skewY: 4 },
        { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', skewY: 0, duration: 1.8 },
        '-=0.8'
      )
      .fromTo('.hero-subtitle', 
        { opacity: 0, y: 60, scale: 0.9, filter: 'blur(12px)' },
        { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 1.4 },
        '-=1.0'
      )
      .fromTo('.hero-cta', 
        { opacity: 0, y: 40, scale: 0.85, filter: 'blur(8px)' },
        { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 1 },
        '-=0.8'
      )
      .fromTo('.hero-scroll', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.5'
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

      // Video entrance animation with scale - 4D effect
      gsap.fromTo('.hero-video',
        { scale: 1.3, opacity: 0.5, filter: 'blur(15px)' },
        { 
          scale: 1, 
          opacity: 1, 
          filter: 'blur(0px)',
          duration: 2.5, 
          ease: 'power2.out',
          delay: -0.5
        }
      )

      // 4D Perspective tilt effect on mouse move
      const handleMouseMove = (e) => {
        if (!containerRef.current) return
        
        const { clientX, clientY } = e
        const { innerWidth, innerHeight } = window
        
        const xPercent = (clientX / innerWidth - 0.5) * 2
        const yPercent = (clientY / innerHeight - 0.5) * 2

        gsap.to('.hero-content', {
          rotationY: xPercent * 5,
          rotationX: -yPercent * 5,
          duration: 0.8,
          ease: 'power2.out'
        })

        gsap.to('.hero-video', {
          rotationY: xPercent * 2,
          rotationX: -yPercent * 2,
          scale: 1 + (Math.abs(xPercent) * 0.05),
          duration: 0.8,
          ease: 'power2.out'
        })

        gsap.to('.hero-title', {
          x: xPercent * 20,
          y: -yPercent * 20,
          duration: 0.8,
          ease: 'power2.out'
        })
      }

      const handleMouseLeave = () => {
        gsap.to('.hero-content', {
          rotationY: 0,
          rotationX: 0,
          duration: 1,
          ease: 'power2.out'
        })
        gsap.to('.hero-video', {
          rotationY: 0,
          rotationX: 0,
          scale: 1,
          duration: 1,
          ease: 'power2.out'
        })
        gsap.to('.hero-title', {
          x: 0,
          y: 0,
          duration: 1,
          ease: 'power2.out'
        })
      }

      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseleave', handleMouseLeave)
      }

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
      <div className="hero-content relative z-10 flex flex-col items-center justify-center h-full section-padding text-center" style={{ perspective: '1000px' }}>
        {/* Logo Rendered */}
        <div className="hero-logo opacity-0 absolute top-8 left-8 md:top-12 md:left-12">
          <Logo size="hero" animated={true} />
        </div>

        {/* Badge */}
        <span className="hero-badge opacity-0 inline-block mb-6 md:mb-8 font-sans text-xs md:text-sm text-champagne-400 tracking-[0.3em] uppercase">
          <span className="inline-block w-8 h-px bg-gradient-to-r from-transparent to-champagne-400/50 mr-4 align-middle" />
          Alta Costura en Baile
          <span className="inline-block w-8 h-px bg-gradient-to-l from-transparent to-champagne-400/50 ml-4 align-middle" />
        </span>
        
        {/* Dancer 3D Representation */}
        <div className="hero-title opacity-0 relative mb-8 md:mb-12">
          {/* Silhouette of dancer */}
          <div className="relative w-64 h-96 md:w-80 md:h-[500px] mx-auto">
            {/* Dancer silhouette with gradient */}
            <svg 
              viewBox="0 0 200 300" 
              className="w-full h-full"
              style={{ filter: 'drop-shadow(0 0 30px rgba(229, 201, 141, 0.4))' }}
            >
              <defs>
                <linearGradient id="dancerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#e5c98d', stopOpacity: 0.9 }} />
                  <stop offset="50%" style={{ stopColor: '#d4a82a', stopOpacity: 0.7 }} />
                  <stop offset="100%" style={{ stopColor: '#fefef9', stopOpacity: 0.5 }} />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {/* Stylized dancer silhouette */}
              <path 
                d="M100 20 
                   C115 20 125 30 125 45 
                   C125 55 120 62 115 65
                   L130 80 L140 120 L135 125 L120 95 L115 90
                   L110 140 L105 180 L95 180 L90 140 L85 90
                   L80 95 L65 125 L60 120 L70 80 L85 65
                   C80 62 75 55 75 45
                   C75 30 85 20 100 20
                   M100 180
                   L95 250 L85 280 L95 280 L100 250 L105 280 L115 280 L105 250 Z"
                fill="url(#dancerGradient)"
                filter="url(#glow)"
                opacity="0.9"
              />
              
              {/* Dress details */}
              <path 
                d="M85 90 Q100 85 115 90 L120 150 Q100 160 80 150 Z"
                fill="none"
                stroke="#e5c98d"
                strokeWidth="1"
                opacity="0.6"
              />
              
              {/* Sparkle effects */}
              <circle cx="130" cy="50" r="2" fill="#e5c98d" opacity="0.8">
                <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite"/>
              </circle>
              <circle cx="70" cy="70" r="1.5" fill="#d4a82a" opacity="0.7">
                <animate attributeName="opacity" values="0.7;0.2;0.7" dur="1.5s" repeatCount="indefinite"/>
              </circle>
              <circle cx="140" cy="100" r="2" fill="#fefef9" opacity="0.6">
                <animate attributeName="opacity" values="0.6;0.1;0.6" dur="2.5s" repeatCount="indefinite"/>
              </circle>
            </svg>
            
            {/* Floating particles */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-champagne-400/60 rounded-full"
                  style={{
                    left: `${20 + (i * 10)}%`,
                    top: `${30 + (i * 8)}%`,
                    animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
                    animationDelay: `${i * 0.3}s`
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Subtitle */}
        <p className="hero-subtitle opacity-0 max-w-xl md:max-w-2xl mb-10 md:mb-12 text-base md:text-lg text-noir-300 leading-relaxed">
          Diseños exclusivos para bailarinas profesionales. 
          Cada pieza es una obra de arte creada para destacar en el escenario.
        </p>
        
        {/* CTA Button */}
        <a 
          href="#productos" 
          className="hero-cta opacity-0 group inline-flex items-center gap-3 px-8 py-4 text-sm tracking-[0.2em] uppercase
                   text-noir-950 bg-champagne-400 font-medium
                   hover:bg-gold-400 transition-all duration-300
                   shadow-lg shadow-champagne-400/20 hover:shadow-champagne-400/40"
        >
          <span>Ver Colección</span>
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
