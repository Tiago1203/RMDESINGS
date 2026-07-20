import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ClipboardList, Scissors, Palette, Check } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const processSteps = [
  {
    number: '01',
    icon: ClipboardList,
    title: 'Consulta Privada',
    description: 'Reunión exclusiva para comprender tu visión, estilo y necesidades específicas. Analizamos cada detalle para crear la pieza perfecta.',
  },
  {
    number: '02',
    icon: Scissors,
    title: 'Diseño Artesanal',
    description: 'Nuestros diseñadores crean bocetos exclusivos y seleccionan los materiales más adecuados para tu proyecto.',
  },
  {
    number: '03',
    icon: Palette,
    title: 'Confección a Medida',
    description: 'Artesanos expertos trabajan cada pieza con precisión milimétrica, asegurando un ajuste perfecto.',
  },
  {
    number: '04',
    icon: Check,
    title: 'Acabado Final',
    description: 'Revisión exhaustiva de cada detalle y entrega con garantía de satisfacción total.',
  },
]

const ProcessSection = () => {
  const sectionRef = useRef(null)
  const lineRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animated connecting line
      gsap.fromTo(lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: 'top center',
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: lineRef.current,
            start: 'top 70%',
            end: 'bottom 30%',
            scrub: 1,
          },
        }
      )

      // Process steps stagger animation
      gsap.fromTo('.process-step',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.process-steps',
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      id="proceso"
      ref={sectionRef}
      className="relative py-section bg-noir-900 section-padding overflow-hidden"
    >
      {/* Background texture */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-b from-noir-950/80 to-noir-900" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <span className="text-champagne-400 text-sm tracking-ultra-wide uppercase mb-4 block">
            Proceso
          </span>
          <h2 className="font-display text-display text-ivory-100 mb-6">
            Del Concepto a la<br />
            <span className="italic text-champagne-300">Realidad</span>
          </h2>
          <p className="max-w-2xl mx-auto text-body-elegant">
            Un viaje creativo meticulosamente diseñado para transformar 
            tu visión en una obra maestra de alta costura.
          </p>
        </div>

        {/* Process Steps */}
        <div className="process-steps relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {/* Vertical line (desktop only) */}
          <div 
            ref={lineRef}
            className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-champagne-400/30 to-transparent scale-y-0"
          />

          {processSteps.map((step, index) => {
            const Icon = step.icon
            return (
              <div 
                key={step.number}
                className="process-step relative text-center lg:text-left"
              >
                {/* Step number and icon */}
                <div className="flex lg:flex-col items-center lg:items-start gap-4 mb-4">
                  <span className="font-display text-5xl md:text-6xl text-noir-700 font-light tracking-wider">
                    {step.number}
                  </span>
                  <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full border border-champagne-400/30 
                                flex items-center justify-center bg-noir-900
                                group-hover:border-champagne-400 transition-colors duration-500">
                    <Icon 
                      size={24} 
                      className="text-champagne-400"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-display text-xl md:text-2xl mb-3 text-ivory-100 tracking-wide">
                  {step.title}
                </h3>
                <p className="text-noir-400 text-sm leading-relaxed">
                  {step.description}
                </p>

                {/* Connector (mobile) */}
                {index < processSteps.length - 1 && (
                  <div className="lg:hidden flex justify-center my-6">
                    <div className="w-px h-8 bg-gradient-to-b from-champagne-400/30 to-transparent" />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-16 md:mt-20">
          <a href="#contacto" className="btn-luxury">
            Iniciar Tu Proyecto
          </a>
        </div>
      </div>

      {/* Decorative corners */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l border-t border-noir-700" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-noir-700" />
    </section>
  )
}

export default ProcessSection
