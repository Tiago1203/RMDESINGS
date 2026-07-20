import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, ArrowLeft } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/**
 * Hero Layered Component
 * 
 * Premium hero with layered costume animation that reveals fabric details
 * as user scrolls horizontally. Each layer separates to show the construction.
 */

const layers = [
  {
    id: 1,
    name: 'Capa Exterior',
    description: 'Tela principal con bordados',
    color: 'from-champagne-400/30 to-champagne-400/10',
    delay: 0
  },
  {
    id: 2,
    name: 'Estructura',
    description: 'Forro y soporte interno',
    color: 'from-gold-400/20 to-gold-400/5',
    delay: 0.1
  },
  {
    id: 3,
    name: 'Detalles',
    description: 'Cristales y pedrería',
    color: 'from-ivory-400/20 to-ivory-400/5',
    delay: 0.2
  },
  {
    id: 4,
    name: 'Base',
    description: 'Confección artesanal',
    color: 'from-noir-400/30 to-noir-400/10',
    delay: 0.3
  }
]

const HeroLayered = () => {
  const containerRef = useRef(null)
  const layersRef = useRef(null)
  const scrollContainerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      // Initial entrance animation
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo('.hero-title',
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0, duration: 1.2 }
      )
      .fromTo('.hero-subtitle',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1 },
        '-=0.6'
      )
      .fromTo('.hero-instruction',
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        '-=0.4'
      )

      // Simple layer animation without complex scroll triggers
      const layerElements = layersRef.current?.children || []
      
      layerElements.forEach((layer, index) => {
        gsap.fromTo(layer,
          { opacity: 0, scale: 0.8 },
          { 
            opacity: 1, 
            scale: 1, 
            duration: 1, 
            delay: 0.5 + (index * 0.15),
            ease: 'power3.out'
          }
        )
      })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-noir-950"
      role="banner"
      aria-label="Hero section - Exploración de capas del traje"
    >
      {/* Horizontal Scroll Container */}
      <div 
        ref={scrollContainerRef}
        className="absolute inset-0 overflow-x-auto overflow-y-hidden"
        style={{ scrollBehavior: 'smooth' }}
      >
        <div className="flex h-full w-[300vw]">
          {/* Left Section - Title */}
          <div className="w-screen flex-shrink-0 flex items-center justify-center section-padding">
            <div className="text-center max-w-4xl">
              <span className="inline-block mb-6 text-champagne-400 text-xs tracking-[0.3em] uppercase">
                Exploración Interactiva
              </span>
              
              <h1 className="hero-title font-display text-hero font-light mb-8">
                <span className="block text-ivory-100 tracking-wide">Descubre las</span>
                <span className="block text-champagne-400 italic font-light">Capas del Arte</span>
              </h1>
              
              <p className="hero-subtitle text-noir-300 text-lg leading-relaxed mb-12">
                Desliza horizontalmente para desglosar cada capa de nuestros trajes 
                y apreciar la artesanía detrás de cada costura.
              </p>

              <div className="hero-instruction flex items-center justify-center gap-8 text-noir-500">
                <div className="flex items-center gap-2">
                  <ArrowLeft size={20} className="text-champagne-400" />
                  <span className="text-sm tracking-wide">Desliza izquierda</span>
                </div>
                <div className="w-px h-8 bg-noir-700" />
                <div className="flex items-center gap-2">
                  <span className="text-sm tracking-wide">Desliza derecha</span>
                  <ArrowRight size={20} className="text-champagne-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Middle Section - Layered Costume */}
          <div className="w-screen flex-shrink-0 relative flex items-center justify-center">
            <div 
              ref={layersRef}
              className="relative w-96 h-[500px] flex items-center justify-center"
            >
              {layers.map((layer, index) => (
                <div
                  key={layer.id}
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${layer.color} 
                             border border-champagne-400/20 backdrop-blur-sm
                             transition-all duration-500`}
                  style={{
                    transform: `translateZ(${index * 20}px)`,
                    zIndex: layers.length - index
                  }}
                >
                  {/* Layer Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                    <div className="text-center">
                      <span className="text-6xl font-display text-champagne-400/30 mb-4">
                        {String(layer.id).padStart(2, '0')}
                      </span>
                      <h3 className="text-xl text-ivory-100 mb-2">{layer.name}</h3>
                      <p className="text-sm text-noir-400">{layer.description}</p>
                    </div>
                  </div>

                  {/* Fabric Texture Pattern */}
                  <div className="fabric-texture absolute inset-0 opacity-30">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `radial-gradient(circle at 2px 2px, rgba(229, 201, 141, 0.3) 1px, transparent 0)`,
                      backgroundSize: '20px 20px'
                    }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Floating Labels */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center">
              <p className="text-champagne-400/70 text-xs tracking-widest uppercase mb-2">
                Desliza para explorar
              </p>
              <div className="flex gap-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-champagne-400/30"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Section - Details */}
          <div className="w-screen flex-shrink-0 flex items-center justify-center section-padding">
            <div className="text-center max-w-4xl">
              <span className="inline-block mb-6 text-champagne-400 text-xs tracking-[0.3em] uppercase">
                Artesanía Revelada
              </span>
              
              <h2 className="font-display text-display text-ivory-100 mb-8">
                <span className="block italic text-champagne-400 font-light">Cada Detalle</span>
                <span className="block text-ivory-100 tracking-wide">Cuenta una Historia</span>
              </h2>
              
              <p className="text-noir-300 text-lg leading-relaxed mb-12">
                Desde la selección de telas premium hasta el último bordado a mano, 
                cada capa representa nuestro compromiso con la excelencia en alta costura.
              </p>

              <a 
                href="#productos" 
                className="btn-luxury group inline-flex items-center gap-3"
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
          </div>
        </div>
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-noir-950 to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-noir-950 to-transparent" />
      </div>

      {/* Scroll Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 text-noir-500">
        <div className="w-16 h-px bg-gradient-to-r from-transparent to-champagne-400/30" />
        <span className="text-xs tracking-widest uppercase">Scroll horizontal</span>
        <div className="w-16 h-px bg-gradient-to-l from-transparent to-champagne-400/30" />
      </div>
    </section>
  )
}

export default HeroLayered
