import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Gem, Sparkles, Crown, Shield } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    icon: Gem,
    title: 'Materiales Premium',
    description: 'Selección exclusiva de telas y acabados de la más alta calidad, importados de los mejores proveedores europeos.',
  },
  {
    icon: Sparkles,
    title: 'Acabados Artesanales',
    description: 'Cada detalle es trabajado a mano por nuestros maestros artesanos con décadas de experiencia.',
  },
  {
    icon: Crown,
    title: 'Diseño Exclusivo',
    description: 'Creaciones únicas adaptadas a la visión y medidas exactas de cada cliente.',
  },
  {
    icon: Shield,
    title: 'Garantía de Calidad',
    description: 'Compromiso absoluto con la excelencia y un servicio post-venta sin precedentes.',
  },
]

const FeatureCard = ({ feature, index }) => {
  const cardRef = useRef(null)
  const Icon = feature.icon

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          delay: index * 0.15,
        }
      )
    }, cardRef)

    return () => ctx.revert()
  }, [index])

  return (
    <div
      ref={cardRef}
      className="relative group p-8 border-luxury bg-noir-900/50 backdrop-blur-sm
                 transition-all duration-500 hover:bg-noir-800/60 hover:border-champagne-500/30"
    >
      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-px h-0 group-hover:h-full bg-gradient-to-b from-champagne-400 to-transparent transition-all duration-700" />
        <div className="absolute top-0 right-0 w-0 h-px bg-gradient-to-l from-champagne-400 to-transparent group-hover:w-full transition-all duration-700 delay-100" />
      </div>

      {/* Icon */}
      <div className="mb-6">
        <Icon 
          size={32} 
          className="text-champagne-400 group-hover:scale-110 transition-transform duration-500" 
          strokeWidth={1.5}
        />
      </div>

      {/* Content */}
      <h3 className="font-display text-xl md:text-2xl mb-4 text-ivory-100 tracking-wide">
        {feature.title}
      </h3>
      <p className="text-body-elegant text-noir-400">
        {feature.description}
      </p>

      {/* Hover line */}
      <div className="mt-6 h-px bg-gradient-to-r from-champagne-400/50 to-transparent w-0 group-hover:w-24 transition-all duration-500" />
    </div>
  )
}

const FeatureGrid = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section title animation
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
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
      className="relative py-section bg-noir-950 section-padding"
    >
      {/* Section Header */}
      <div ref={titleRef} className="text-center mb-16 md:mb-20">
        <span className="text-champagne-400 text-sm tracking-ultra-wide uppercase mb-4 block">
          Características
        </span>
        <h2 className="font-display text-display text-ivory-100 mb-6">
          Excelencia en Cada<br />
          <span className="italic text-champagne-300">Detalle</span>
        </h2>
        <p className="max-w-2xl mx-auto text-body-elegant">
          Descubre los pilares que definen nuestra filosofía de trabajo 
          y hacen de cada pieza RM Designs una obra de arte.
        </p>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-noir-800">
        {features.map((feature, index) => (
          <FeatureCard key={feature.title} feature={feature} index={index} />
        ))}
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-champagne-400/5 to-transparent" />
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tl from-champagne-400/5 to-transparent" />
    </section>
  )
}

export default FeatureGrid
