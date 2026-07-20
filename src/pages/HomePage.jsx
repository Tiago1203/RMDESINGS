import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Sparkles } from 'lucide-react'
import catalogData, { categoryOrder } from '../data/catalogData'

gsap.registerPlugin(ScrollTrigger)

const categoryImages = {
  trajes: 'linear-gradient(135deg, #2a1f0e 0%, #1a1508 40%, #0a0a0a 100%)',
  accesorios: 'linear-gradient(135deg, #1a1508 0%, #12100a 40%, #0a0a0a 100%)',
  entrenamiento: 'linear-gradient(135deg, #151515 0%, #0f0f0f 40%, #0a0a0a 100%)',
  tacos: 'linear-gradient(135deg, #1a1508 0%, #12100a 40%, #0a0a0a 100%)',
}

const HomePage = () => {
  const heroRef = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (!heroRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.home-hero-title',
        { opacity: 0, y: 60, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out', delay: 0.2 }
      )
      gsap.fromTo('.home-hero-sub',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.5 }
      )
      gsap.fromTo('.home-hero-cta',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.8 }
      )
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={heroRef} className="min-h-screen bg-noir-950">
      {/* Hero */}
      <section className="relative h-[70vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #1a1508 0%, #0a0a0a 50%, #12100a 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(229,201,141,0.08) 0%, transparent 60%)' }} />

        <div className="relative z-10 text-center section-padding">
          <div className="home-hero-title opacity-0 flex justify-center mb-8">
            <Sparkles size={32} className="text-champagne-400" strokeWidth={1} />
          </div>
          <h1 className="home-hero-title opacity-0 font-display text-hero text-ivory-100 mb-6">
            Nueva <span className="italic text-champagne-400 font-light">Colección</span>
          </h1>
          <p className="home-hero-sub opacity-0 max-w-xl mx-auto text-noir-300 text-base md:text-lg leading-relaxed mb-10">
            Descubre piezas de alta costura diseñadas para bailarinas profesionales.
            Cada traje es una obra de arte.
          </p>
          <div className="home-hero-cta opacity-0">
            <Link to="/coleccion" className="inline-flex items-center gap-3 px-10 py-4 text-sm tracking-[0.2em] uppercase text-noir-950 bg-champagne-400 font-medium hover:bg-gold-400 transition-all duration-300 shadow-lg shadow-champagne-400/20 hover:shadow-champagne-400/40">
              <span>Explorar Colección</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Category Grid - Adidas Style */}
      <section className="section-padding py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-champagne-400 text-xs tracking-[0.3em] uppercase mb-4 block">Catálogo</span>
            <h2 className="font-display text-display text-ivory-100">
              Explora por <span className="italic text-champagne-400 font-light">Categoría</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categoryOrder.map((key) => {
              const cat = catalogData[key]
              const Icon = cat.icon
              return (
                <Link
                  key={key}
                  to={`/coleccion/${key}`}
                  className="group relative overflow-hidden h-[350px] md:h-[420px] flex items-end transition-all duration-500 hover:shadow-champagne-lg"
                  style={{ background: categoryImages[key] }}
                >
                  {/* Glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-700`} />

                  {/* Pattern */}
                  <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(229,201,141,0.3) 1px, transparent 0)', backgroundSize: '40px 40px' }} />

                  {/* Icon top-left */}
                  <div className="absolute top-6 left-6 w-12 h-12 rounded-full border border-champagne-400/15 flex items-center justify-center opacity-60 group-hover:opacity-100 group-hover:border-champagne-400/40 transition-all duration-500">
                    <Icon size={20} className="text-champagne-400" strokeWidth={1.5} />
                  </div>

                  {/* Arrow top-right */}
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-2 group-hover:translate-x-0">
                    <ArrowRight size={20} className="text-champagne-400" />
                  </div>

                  {/* Bottom content */}
                  <div className="relative z-10 p-8 w-full">
                    <h3 className="font-display text-2xl md:text-3xl text-ivory-100 tracking-wide mb-2 group-hover:text-champagne-400 transition-colors duration-300">
                      {cat.title}
                    </h3>
                    <p className="text-noir-400 text-sm tracking-wide mb-4">{cat.subtitle}</p>
                    <div className="flex items-center gap-2 text-champagne-400 text-xs tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                      <span>Ver Productos</span>
                      <ArrowRight size={14} />
                    </div>
                  </div>

                  {/* Border on hover */}
                  <div className="absolute inset-0 border border-champagne-400/0 group-hover:border-champagne-400/20 transition-all duration-500" />
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Brand Banner */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(229,201,141,0.05) 0%, transparent 70%)' }} />
        <div className="relative z-10 text-center section-padding">
          <span className="text-champagne-400 text-xs tracking-[0.3em] uppercase mb-6 block">Nuestro Compromiso</span>
          <h2 className="font-display text-display text-ivory-100 mb-6 max-w-2xl mx-auto">
            <span className="italic text-champagne-400 font-light">Artesanía</span> que transforma
          </h2>
          <p className="max-w-xl mx-auto text-noir-400 text-sm md:text-base leading-relaxed mb-10">
            Cada pieza pasa por nuestras manos expertas. Desde la selección de la tela
            hasta el último cristal, todo es hecho con amor y dedicación.
          </p>
          <Link to="/proceso" className="btn-luxury group inline-flex items-center gap-3">
            <span>Conoce Nuestro Proceso</span>
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default HomePage
