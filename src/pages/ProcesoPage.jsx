import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MessageCircle, Pencil, Scissors, Award, ArrowRight, ArrowLeft } from 'lucide-react'

const steps = [
  {
    icon: MessageCircle,
    number: '01',
    title: 'Consulta',
    desc: 'Nos reunimos contigo para entender tu visión, el estilo de baile, la competencia o presentación, y tus preferencias personales.',
  },
  {
    icon: Pencil,
    number: '02',
    title: 'Diseño',
    desc: 'Nuestro equipo crea bocetos personalizados con telas, colores y detalles que reflejan tu personalidad y necesidades técnicas.',
  },
  {
    icon: Scissors,
    number: '03',
    title: 'Confección',
    desc: 'Cada traje es confeccionado a mano por artesanos expertos. Cristales, bordados y acabados se aplican con precisión milimétrica.',
  },
  {
    icon: Award,
    number: '04',
    title: 'Entrega',
    desc: 'Probamos, ajustamos y entregamos tu traje listo para brillar en el escenario. Incluimos bolsa de transporte y cuidados.',
  },
]

const ProcesoPage = () => {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="min-h-screen bg-noir-950">
      {/* Hero */}
      <section className="relative h-[50vh] md:h-[60vh] flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #1a1508 0%, #0a0a0a 50%, #12100a 100%)' }}>
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(229,201,141,0.06) 0%, transparent 60%)' }} />
        <div className="relative z-10 text-center section-padding">
          <span className="text-champagne-400 text-xs tracking-[0.3em] uppercase mb-6 block">Nuestro Proceso</span>
          <h1 className="font-display text-hero text-ivory-100 mb-4">
            De la <span className="italic text-champagne-400 font-light">Visión</span> al Escenario
          </h1>
          <p className="max-w-xl mx-auto text-noir-300 text-base md:text-lg">Cada traje cuenta una historia de 4 pasos artesanales.</p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 section-padding">
        <div className="max-w-4xl mx-auto">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <div key={step.number} className="flex gap-8 mb-16 last:mb-0">
                {/* Timeline line */}
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full border border-champagne-400/30 flex items-center justify-center flex-shrink-0">
                    <Icon size={22} className="text-champagne-400" strokeWidth={1.5} />
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-px flex-1 bg-gradient-to-b from-champagne-400/30 to-transparent mt-4" />
                  )}
                </div>

                {/* Content */}
                <div className="pt-2 pb-8">
                  <span className="text-champagne-400/50 text-xs tracking-[0.3em] uppercase font-mono">{step.number}</span>
                  <h3 className="font-display text-2xl text-ivory-100 tracking-wide mt-2 mb-3">{step.title}</h3>
                  <p className="text-noir-400 text-sm leading-relaxed max-w-lg">{step.desc}</p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center mt-16">
          <Link to="/" className="btn-luxury group inline-flex items-center gap-3">
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            <span>Volver al Inicio</span>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default ProcesoPage
