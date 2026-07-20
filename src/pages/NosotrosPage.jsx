import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Heart, Star, Users } from 'lucide-react'

const stats = [
  { icon: Heart, value: '500+', label: 'Bailarinas Atendidas' },
  { icon: Star, value: '12', label: 'Años de Experiencia' },
  { icon: Users, value: '50+', label: 'Colecciones Creadas' },
]

const NosotrosPage = () => {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="min-h-screen bg-noir-950">
      {/* Hero */}
      <section className="relative h-[50vh] md:h-[60vh] flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #12100a 0%, #0a0a0a 50%, #1a1508 100%)' }}>
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(212,168,42,0.05) 0%, transparent 60%)' }} />
        <div className="relative z-10 text-center section-padding">
          <span className="text-champagne-400 text-xs tracking-[0.3em] uppercase mb-6 block">Sobre Nosotros</span>
          <h1 className="font-display text-hero text-ivory-100 mb-4">
            <span className="italic text-champagne-400 font-light">RM Designs</span>
          </h1>
          <p className="max-w-xl mx-auto text-noir-300 text-base md:text-lg">Donde el arte se encuentra con la elegancia.</p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 section-padding">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <span className="text-champagne-400 text-xs tracking-[0.3em] uppercase mb-4 block">Nuestra Historia</span>
              <h2 className="font-display text-display text-ivory-100 mb-6">
                Fundada por <span className="italic text-champagne-400 font-light">bailarinas</span>
              </h2>
              <p className="text-noir-400 text-sm leading-relaxed mb-4">
                RM Designs nació de la necesidad de crear trajes que no solo se vean increíbles,
                sino que se sientan como una segunda piel. Fundada por bailarinas profesionales
                que entendían la frustración de buscar trajes que cumplieran con ambos estándares.
              </p>
              <p className="text-noir-400 text-sm leading-relaxed">
                Hoy, cada pieza que sale de nuestro taller es una obra de arte confeccionada
                con los mejores materiales y la técnica más refinada.
              </p>
            </div>
            <div className="relative h-80 bg-gradient-to-br from-noir-800 to-noir-900 border border-noir-800 flex items-center justify-center">
              <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(229,201,141,0.4) 1px, transparent 0)', backgroundSize: '28px 28px' }} />
              <span className="font-display text-6xl text-champagne-400/20">RM</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 py-12 border-y border-noir-800/50">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="text-center">
                  <Icon size={24} className="text-champagne-400 mx-auto mb-3" strokeWidth={1.5} />
                  <span className="block font-display text-3xl text-ivory-100 mb-1">{stat.value}</span>
                  <span className="text-noir-400 text-xs tracking-wide">{stat.label}</span>
                </div>
              )
            })}
          </div>

          {/* Values */}
          <div className="mt-20 text-center">
            <span className="text-champagne-400 text-xs tracking-[0.3em] uppercase mb-4 block">Nuestros Valores</span>
            <h2 className="font-display text-display text-ivory-100 mb-10">
              Lo que nos <span className="italic text-champagne-400 font-light">define</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: 'Artesanía', desc: 'Cada traje es hecho a mano con atención al detalle.' },
                { title: 'Exclusividad', desc: 'Diseños únicos que no encontrarás en ningún otro lugar.' },
                { title: 'Pasión', desc: 'Amamos lo que hacemos y se nota en cada costura.' },
              ].map((v) => (
                <div key={v.title} className="p-8 bg-noir-900/50 border border-noir-800 hover:border-champagne-500/30 transition-all duration-500">
                  <h3 className="font-display text-xl text-ivory-100 mb-3">{v.title}</h3>
                  <p className="text-noir-400 text-sm leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-16">
            <Link to="/" className="btn-luxury group inline-flex items-center gap-3">
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
              <span>Volver al Inicio</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default NosotrosPage
