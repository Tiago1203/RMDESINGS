import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Gem, Sparkles, Crown, Shield, Watch, Palette, Star, Award } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/**
 * Feature Grid Component
 * 
 * Displays brand pillars and exclusive features with scroll-triggered animations.
 * Optimized for 60fps with GSAP ScrollTrigger and memory-safe context.
 */

const features = [
  {
    icon: Gem,
    title: 'Materiales Premium',
    description: 'Selección exclusiva de telas y acabados de la más alta calidad, importados de los mejores proveedores europeos.',
    metric: '100% Naturales',
  },
  {
    icon: Sparkles,
    title: 'Acabados Artesanales',
    description: 'Cada detalle es trabajado a mano por nuestros maestros artesanos con décadas de experiencia.',
    metric: '+50 Años',
  },
  {
    icon: Crown,
    title: 'Diseño Exclusivo',
    description: 'Creaciones únicas adaptadas a la visión y medidas exactas de cada cliente.',
    metric: 'Hecho a Medida',
  },
  {
    icon: Shield,
    title: 'Garantía de Calidad',
    description: 'Compromiso absoluto con la excelencia y un servicio post-venta sin precedentes.',
    metric: '5 Años',
  },
]

/**
 * Individual Feature Card Component
 * Handles its own scroll-triggered entrance animation
 */
const FeatureCard = ({ feature, index }) => {
  const cardRef = useRef(null)
  const contentRef = useRef(null)
  const Icon = feature.icon

  useEffect(() => {
    if (!cardRef.current) return

    const ctx = gsap.context(() => {
      // Card entrance with staggered reveal
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        },
      })

      // Initial state
      gsap.set(cardRef.current, { opacity: 0, y: 60 })

      // Staggered entrance animation
      tl.to(cardRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        delay: index * 0.12,
      })
      .fromTo(
        contentRef.current.querySelector('.feature-icon'),
        { scale: 0, rotation: -10 },
        { scale: 1, rotation: 0, duration: 0.5, ease: 'back.out(1.7)' },
        '-=0.5'
      )
      .fromTo(
        contentRef.current.querySelectorAll('.feature-animate'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' },
        '-=0.3'
      )

      // Hover parallax effect
      const handleMouseEnter = () => {
        gsap.to(cardRef.current.querySelector('.feature-icon'), {
          scale: 1.1,
          y: -5,
          duration: 0.4,
          ease: 'power2.out',
        })
      }

      const handleMouseLeave = () => {
        gsap.to(cardRef.current.querySelector('.feature-icon'), {
          scale: 1,
          y: 0,
          duration: 0.4,
          ease: 'power2.out',
        })
      }

      const card = cardRef.current
      card.addEventListener('mouseenter', handleMouseEnter)
      card.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        card.removeEventListener('mouseenter', handleMouseEnter)
        card.removeEventListener('mouseleave', handleMouseLeave)
      }
    }, cardRef)

    return () => ctx.revert()
  }, [index])

  return (
    <div
      ref={cardRef}
      className="feature-card relative group p-8 lg:p-10 bg-noir-900/40 
                 border border-noir-800 hover:border-champagne-500/40
                 transition-all duration-500 ease-out
                 hover:bg-noir-900/60 hover:shadow-xl hover:shadow-champagne-900/10
                 overflow-hidden"
    >
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-champagne-400/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      {/* Animated corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-px h-0 group-hover:h-full bg-gradient-to-b from-champagne-400/60 to-transparent transition-all duration-700 origin-top" />
        <div className="absolute top-0 right-0 w-0 h-px bg-gradient-to-l from-champagne-400/60 to-transparent group-hover:w-full transition-all duration-700 delay-75 origin-right" />
      </div>

      {/* Icon Container */}
      <div 
        ref={contentRef}
        className="relative"
      >
        {/* Icon with animation wrapper */}
        <div className="feature-icon-wrapper mb-6 inline-block">
          <Icon 
            size={36} 
            className="feature-icon text-champagne-400" 
            strokeWidth={1.25}
          />
        </div>

        {/* Title */}
        <h3 className="feature-animate font-display text-xl md:text-2xl mb-3 text-ivory-100 tracking-wide">
          {feature.title}
        </h3>

        {/* Description */}
        <p className="feature-animate text-sm md:text-base text-noir-400 leading-relaxed mb-6">
          {feature.description}
        </p>

        {/* Metric Badge */}
        <div className="feature-animate inline-flex items-center gap-2">
          <div className="w-8 h-px bg-gradient-to-r from-champagne-400/60 to-champagne-400/20" />
          <span className="text-xs text-champagne-400 tracking-widest uppercase">
            {feature.metric}
          </span>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-champagne-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  )
}

/**
 * Collections Preview Section
 */
const CollectionsPreview = () => {
  const previewRef = useRef(null)
  
  const collections = [
    { name: 'Flamenco Elite', category: 'Trajes de Baile' },
    { name: 'Latin Fusion', category: 'Ritmo y Gracia' },
    { name: 'Clásico Español', category: 'Tradición' },
  ]

  useEffect(() => {
    if (!previewRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(previewRef.current.querySelectorAll('.collection-card'),
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: previewRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, previewRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={previewRef} className="mt-20 lg:mt-28">
      {/* Section Divider */}
      <div className="flex items-center gap-6 mb-12">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-noir-700 to-noir-700" />
        <span className="text-champagne-400 text-xs tracking-ultra-wide uppercase">
          Colecciones Destacadas
        </span>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent via-noir-700 to-noir-700" />
      </div>

      {/* Collections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {collections.map((collection, index) => (
          <div 
            key={collection.name}
            className="collection-card group relative aspect-[3/4] overflow-hidden bg-noir-900 border border-noir-800 hover:border-champagne-500/30 transition-all duration-500"
          >
            {/* Placeholder gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-noir-800 to-noir-950 group-hover:from-noir-700 group-hover:to-noir-900 transition-all duration-500" />
            
            {/* Pattern overlay */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, rgba(229, 201, 141, 0.3) 1px, transparent 0)`,
                backgroundSize: '24px 24px'
              }} />
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8">
              <span className="text-champagne-400/70 text-xs tracking-widest uppercase mb-2">
                {collection.category}
              </span>
              <h4 className="font-display text-2xl lg:text-3xl text-ivory-100 tracking-wide mb-4">
                {collection.name}
              </h4>
              <div className="flex items-center gap-2 text-sm text-noir-400 group-hover:text-champagne-400 transition-colors duration-300">
                <span>Explorar</span>
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>

            {/* Corner decoration */}
            <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-champagne-400/20 group-hover:border-champagne-400/50 transition-colors duration-500" />
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * Main FeatureGrid Component
 */
const FeatureGrid = () => {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Section header animation
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })

      headerTl
        .fromTo(
          headerRef.current.querySelector('.header-badge'),
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
        )
        .fromTo(
          headerRef.current.querySelector('.header-title'),
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
          '-=0.5'
        )
        .fromTo(
          headerRef.current.querySelector('.header-description'),
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.6'
        )

      // Decorative line animation
      gsap.fromTo(
        '.header-line',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      id="colecciones"
      ref={sectionRef}
      className="relative py-section bg-noir-950 section-padding overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-champagne-400/10 to-transparent" />
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-gradient-to-br from-champagne-400/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-to-tl from-gold-900/10 to-transparent rounded-full blur-3xl" />

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16 md:mb-20">
          {/* Badge */}
          <span className="header-badge opacity-0 text-champagne-400 text-xs tracking-[0.3em] uppercase mb-6 block">
            Nuestros Pilares
          </span>
          
          {/* Title */}
          <h2 className="header-title opacity-0 font-display text-display text-ivory-100 mb-8">
            Excelencia en Cada
            <span className="block italic text-champagne-400 font-light">Detalle</span>
          </h2>

          {/* Decorative Line */}
          <div className="header-line origin-center flex justify-center mb-8">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-champagne-400 to-transparent" />
          </div>

          {/* Description */}
          <p className="header-description opacity-0 max-w-2xl mx-auto text-base md:text-lg text-noir-400 leading-relaxed">
            Descubre los pilares que definen nuestra filosofía de trabajo 
            y hacen de cada pieza RM Designs una obra de arte atemporal.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-noir-800/50 rounded-sm overflow-hidden">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>

        {/* Collections Preview */}
        <CollectionsPreview />
      </div>

      {/* Bottom decorative element */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-champagne-400/20 to-transparent" />
    </section>
  )
}

export default FeatureGrid
