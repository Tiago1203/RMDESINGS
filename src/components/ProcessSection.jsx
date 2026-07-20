import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MessageCircle, Pencil, Scissors, Award } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/**
 * Process Section Component
 * 
 * Displays the artisanal crafting process with sequential scroll-triggered animations.
 * Features a timeline structure with step-by-step reveal.
 */

/**
 * Process Steps Data
 */
const processSteps = [
  {
    number: '01',
    title: 'Consulta Privada',
    description: 'Reunión exclusiva para comprender tu visión, estilo y necesidades específicas. Analizamos cada detalle para crear la pieza perfecta.',
    icon: MessageCircle,
    duration: '1-2 horas',
  },
  {
    number: '02',
    title: 'Diseño Artesanal',
    description: 'Nuestros diseñadores crean bocetos exclusivos y seleccionan los materiales más adecuados para tu proyecto.',
    icon: Pencil,
    duration: '3-5 días',
  },
  {
    number: '03',
    title: 'Confección a Medida',
    description: 'Artesanos expertos trabajan cada pieza con precisión milimétrica, asegurando un ajuste perfecto.',
    icon: Scissors,
    duration: '4-6 semanas',
  },
  {
    number: '04',
    title: 'Entrega Final',
    description: 'Revisión exhaustiva de cada detalle, ajustes finales y entrega con garantía de satisfacción total.',
    icon: Award,
    duration: '1 día',
  },
]

/**
 * Individual Process Step Component
 */
const ProcessStep = ({ step, index, isLast }) => {
  const stepRef = useRef(null)
  const Icon = step.icon

  useEffect(() => {
    if (!stepRef.current) return

    const ctx = gsap.context(() => {
      // Set initial state - 4D depth
      gsap.set(stepRef.current, {
        opacity: 0,
        y: 70,
        scale: 0.88,
        rotationY: 6,
        filter: 'blur(8px)'
      })

      // Create timeline for sequential reveal
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stepRef.current,
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        },
      })

      // 4D step reveal animation
      tl.to(stepRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationY: 0,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power4.out',
      })
      // Icon animation
      .fromTo(
        stepRef.current.querySelector('.step-icon'),
        { scale: 0, rotation: -45 },
        { scale: 1, rotation: 0, duration: 0.5, ease: 'back.out(1.7)' },
        '-=0.4'
      )
      // Content animation
      .fromTo(
        stepRef.current.querySelectorAll('.step-content'),
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' },
        '-=0.3'
      )

      // Number counter animation
      gsap.fromTo(
        stepRef.current.querySelector('.step-number'),
        { textContent: '00' },
        {
          textContent: step.number,
          duration: 0.8,
          ease: 'power2.out',
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: stepRef.current,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, stepRef)

    return () => ctx.revert()
  }, [step.number])

  return (
    <div
      ref={stepRef}
      className={`process-step relative ${isLast ? '' : 'mb-12 lg:mb-0'}`}
    >
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
        {/* Desktop: Number and Icon inline */}
        <div className="hidden lg:flex items-center gap-5 w-64 flex-shrink-0">
          {/* Step Number */}
          <span className="step-number font-display text-5xl font-light text-noir-700 tracking-widest">
            {step.number}
          </span>
          
          {/* Icon */}
          <div className="step-icon w-14 h-14 rounded-full border border-champagne-400/30 flex items-center justify-center bg-noir-950 group-hover:border-champagne-400 transition-colors duration-500 shadow-lg shadow-champagne-400/5">
            <Icon size={24} className="text-champagne-400" strokeWidth={1.5} />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          {/* Mobile: Number and Icon */}
          <div className="flex lg:hidden items-center gap-4 mb-4">
            <span className="step-number font-display text-4xl font-light text-noir-700">
              {step.number}
            </span>
            <div className="step-icon w-12 h-12 rounded-full border border-champagne-400/30 flex items-center justify-center bg-noir-950">
              <Icon size={20} className="text-champagne-400" strokeWidth={1.5} />
            </div>
          </div>

          {/* Title */}
          <h3 className="step-content font-display text-2xl lg:text-xl mb-3 text-ivory-100 tracking-wide">
            {step.title}
          </h3>

          {/* Description */}
          <p className="step-content text-sm lg:text-base text-noir-400 leading-relaxed mb-4">
            {step.description}
          </p>

          {/* Duration Badge */}
          <div className="step-content inline-flex items-center gap-2">
            <div className="w-6 h-px bg-champagne-400/40" />
            <span className="text-xs text-champagne-400/70 tracking-widest uppercase">
              {step.duration}
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Connector */}
      {!isLast && (
        <div className="lg:hidden absolute -bottom-6 left-[1.625rem] lg:left-1/2">
          <div className="w-px h-6 bg-gradient-to-b from-champagne-400/30 to-transparent" />
        </div>
      )}
    </div>
  )
}

/**
 * Animated Timeline Connector
 */
const TimelineConnector = () => {
  const connectorRef = useRef(null)
  const progressRef = useRef(null)

  useEffect(() => {
    if (!connectorRef.current || !progressRef.current) return

    const ctx = gsap.context(() => {
      // Set initial progress width to 0
      gsap.set(progressRef.current, { width: 0 })

      // Animate progress on scroll
      gsap.to(progressRef.current, {
        width: '100%',
        duration: 1.5,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: connectorRef.current,
          start: 'top 70%',
          end: 'bottom 60%',
          scrub: 0.5,
        },
      })

      // Fade in dots as progress reaches them
      processSteps.forEach((_, index) => {
        if (index < processSteps.length - 1) {
          gsap.to(connectorRef.current.querySelector(`.dot-${index}`), {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            scrollTrigger: {
              trigger: connectorRef.current,
              start: `${15 + index * 25}% 70%`,
              toggleActions: 'play none none reverse',
            },
          })
        }
      })
    }, connectorRef)

    return () => ctx.revert()
  }, [])

  return (
    <div 
      ref={connectorRef}
      className="hidden lg:flex items-center justify-between w-full max-w-3xl mx-auto px-4"
    >
      {processSteps.map((step, index) => (
        <div key={step.number} className="relative flex flex-col items-center">
          {/* Dot */}
          <div 
            className={`dot-${index} w-3 h-3 rounded-full bg-champagne-400 border-2 border-noir-900 opacity-0 scale-0 transition-all duration-300`}
          />
          
          {/* Label below dot */}
          <span className="absolute top-6 text-xs text-champagne-400/50 tracking-wider whitespace-nowrap">
            {step.number}
          </span>
        </div>
      ))}
      
      {/* Progress line */}
      <div className="absolute top-1 left-0 right-0 h-px bg-noir-800">
        <div 
          ref={progressRef}
          className="h-full bg-gradient-to-r from-champagne-400 via-champagne-300 to-champagne-400"
        />
      </div>
    </div>
  )
}

/**
 * Main ProcessSection Component
 */
const ProcessSection = () => {
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

      // CTA button animation
      gsap.fromTo(
        '.process-cta',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.process-cta',
            start: 'top 90%',
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
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-noir-950 via-transparent to-noir-900" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-champagne-400/10 to-transparent" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-champagne-400/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-20 lg:mb-28">
          <span className="header-badge opacity-0 text-champagne-400 text-xs tracking-[0.3em] uppercase mb-6 block">
            Nuestro Proceso
          </span>
          
          <h2 className="header-title opacity-0 font-display text-display text-ivory-100 mb-8">
            Del Concepto a la
            <span className="block italic text-champagne-400 font-light">Realidad</span>
          </h2>

          {/* Decorative Line */}
          <div className="header-line origin-center flex justify-center mb-8">
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-champagne-400 to-transparent" />
          </div>

          <p className="header-description opacity-0 max-w-2xl mx-auto text-base md:text-lg text-noir-400 leading-relaxed">
            Un viaje creativo meticulosamente diseñado para transformar 
            tu visión en una obra maestra de alta costura.
          </p>
        </div>

        {/* Timeline Connector */}
        <div className="mb-12 lg:mb-16">
          <TimelineConnector />
        </div>

        {/* Process Steps */}
        <div className="process-steps relative">
          {processSteps.map((step, index) => (
            <ProcessStep 
              key={step.number} 
              step={step} 
              index={index}
              isLast={index === processSteps.length - 1}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="process-cta opacity-0 text-center mt-20 lg:mt-24">
          <div className="inline-flex flex-col items-center gap-6">
            <p className="text-noir-500 text-sm">
              ¿Listo para comenzar tu transformación?
            </p>
            <a href="#contacto" className="btn-luxury group">
              <span>Iniciar Tu Proyecto</span>
              <svg 
                className="ml-2 w-4 h-4 inline-block transition-transform group-hover:translate-x-1" 
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

      {/* Decorative corners */}
      <div className="absolute top-6 left-6 w-12 h-12 border-l border-t border-noir-700/50" />
      <div className="absolute top-6 right-6 w-12 h-12 border-r border-t border-noir-700/50" />
      <div className="absolute bottom-6 left-6 w-12 h-12 border-l border-b border-noir-700/50" />
      <div className="absolute bottom-6 right-6 w-12 h-12 border-r border-b border-noir-700/50" />
    </section>
  )
}

export default ProcessSection
