import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Star, Quote } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/**
 * Testimonials Component
 * 
 * Premium testimonials section showcasing client experiences.
 * Features elegant animations and luxury presentation.
 */

const testimonials = [
  {
    id: 1,
    name: 'María Fernández',
    role: 'Bailarina Profesional - Flamenco',
    location: 'Madrid, España',
    content: 'El traje que RM Designs creó para mi competencia internacional fue simplemente espectacular. La calidad de los materiales y la atención al detalle superaron todas mis expectativas. Me sentí verdaderamente única en el escenario.',
    rating: 5,
    featured: true
  },
  {
    id: 2,
    name: 'Carmen López',
    role: 'Maestra de Baile',
    location: 'Sevilla, España',
    content: 'Llevo años recomendando RM Designs a mis alumnas. La confección artesanal y el ajuste perfecto son incomparables. Cada pieza es una obra de arte que realza el movimiento de la bailarina.',
    rating: 5,
    featured: false
  },
  {
    id: 3,
    name: 'Isabella Rossi',
    role: 'Competidora Internacional',
    location: 'Milán, Italia',
    content: 'Desde Italia busqué los mejores trajes de baile y encontré en RM Designs la excelencia que necesitaba. El diseño exclusivo y los acabados premium me dieron la confianza para ganar mi campeonato.',
    rating: 5,
    featured: true
  }
]

/**
 * Individual Testimonial Card Component
 */
const TestimonialCard = ({ testimonial, index }) => {
  const cardRef = useRef(null)

  useEffect(() => {
    if (!cardRef.current) return

    const ctx = gsap.context(() => {
      // 4D entrance animation
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 70, scale: 0.92, rotationX: 8, filter: 'blur(9px)' },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          filter: 'blur(0px)',
          duration: 1.1,
          ease: 'power4.out',
          delay: index * 0.15,
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, cardRef)

    return () => ctx.revert()
  }, [index])

  return (
    <div
      ref={cardRef}
      className={`relative p-8 lg:p-10 bg-noir-900/40 border border-noir-800 hover:border-champagne-500/30 transition-all duration-500 ${testimonial.featured ? 'lg:col-span-2' : ''}`}
    >
      {/* Quote Icon */}
      <div className="absolute top-6 right-6 text-champagne-400/20">
        <Quote size={48} strokeWidth={1} />
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1 mb-6">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} size={16} className="text-champagne-400 fill-current" strokeWidth={1.5} />
        ))}
      </div>

      {/* Content */}
      <p className="text-noir-300 text-base lg:text-lg leading-relaxed mb-8 font-light italic">
        "{testimonial.content}"
      </p>

      {/* Author */}
      <div className="flex items-start gap-4">
        {/* Avatar Placeholder */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-champagne-400/20 to-champagne-400/5 flex items-center justify-center text-champagne-400 font-display text-xl">
          {testimonial.name.charAt(0)}
        </div>

        {/* Info */}
        <div>
          <h4 className="text-ivory-100 font-display text-lg tracking-wide mb-1">
            {testimonial.name}
          </h4>
          <p className="text-champagne-400/80 text-sm tracking-wide">
            {testimonial.role}
          </p>
          <p className="text-noir-500 text-xs mt-1">
            {testimonial.location}
          </p>
        </div>
      </div>

      {/* Decorative Corner */}
      <div className="absolute bottom-0 left-0 w-8 h-8 border-l border-b border-champagne-400/20" />
    </div>
  )
}

/**
 * Main Testimonials Component
 */
const Testimonials = () => {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Header animation
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
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      id="testimonios"
      ref={sectionRef}
      className="relative py-section bg-noir-950 section-padding overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-champagne-400/10 to-transparent" />
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-gradient-to-tl from-champagne-400/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-gradient-to-br from-gold-900/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16 md:mb-20">
          <span className="header-badge opacity-0 text-champagne-400 text-xs tracking-[0.3em] uppercase mb-6 block">
            Experiencias Reales
          </span>
          
          <h2 className="header-title opacity-0 font-display text-display text-ivory-100 mb-8">
            Lo Que Dicen
            <span className="block italic text-champagne-400 font-light">Nuestros Clientes</span>
          </h2>

          <div className="flex justify-center mb-8">
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-champagne-400 to-transparent" />
          </div>

          <p className="header-description opacity-0 max-w-2xl mx-auto text-base md:text-lg text-noir-400 leading-relaxed">
            Descubre por qué bailarinas profesionales de todo el mundo confían 
            en RM Designs para sus momentos más importantes en el escenario.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: '500+', label: 'Clientes Satisfechos' },
            { number: '15+', label: 'Países' },
            { number: '98%', label: 'Satisfacción' },
            { number: '24/7', label: 'Soporte Premium' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="font-display text-3xl lg:text-4xl text-champagne-400 mb-2">
                {stat.number}
              </div>
              <div className="text-noir-500 text-sm tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Decoration */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-champagne-400/20 to-transparent" />
    </section>
  )
}

export default Testimonials
