import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Heart, Eye, Shirt, Footprints, Dumbbell, Watch } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/* ───────── DATA ───────── */
const catalogData = {
  trajes: {
    title: 'Trajes de Baile',
    subtitle: 'Alta costura que inspira',
    icon: Shirt,
    gradient: 'from-champagne-400/20 via-gold-600/10 to-transparent',
    heroGradient: 'linear-gradient(135deg, #1a1508 0%, #0a0a0a 50%, #12100a 100%)',
    mujer: [
      { id: 't1', name: 'Flamenco Royal', price: 'Consultar', desc: 'Encaje italiano y bordados a mano.', colors: ['#e5c98d', '#d4a82a', '#818181'], tag: 'Nuevo' },
      { id: 't2', name: 'Latin Passion', price: 'Consultar', desc: 'Seda importada y cristales Swarovski.', colors: ['#fefef9', '#e5c98d', '#0a0a0a'], tag: 'Destacado' },
      { id: 't3', name: 'Classic Elegance', price: 'Consultar', desc: 'Corte imperial y acabados artesanales.', colors: ['#434343', '#818181', '#fefef9'], tag: null },
      { id: 't4', name: 'Spanish Heritage', price: 'Consultar', desc: 'Polisón y volantes artesanales.', colors: ['#e5c98d', '#818181', '#d4a82a'], tag: null },
    ],
    hombre: [
      { id: 't5', name: 'Salsa Noir', price: 'Consultar', desc: 'Traje masculino con corte elegante y tejido premium.', colors: ['#0a0a0a', '#434343', '#d4a82a'], tag: 'Nuevo' },
      { id: 't6', name: 'Tango Executive', price: 'Consultar', desc: 'Chaquetón clásico con detalles en cuero.', colors: ['#434343', '#818181', '#e5c98d'], tag: null },
      { id: 't7', name: 'Ballroom Gold', price: 'Consultar', desc: 'Elegancia masculina con hilos dorados.', colors: ['#d4a82a', '#0a0a0a', '#fefef9'], tag: 'Destacado' },
    ],
  },
  accesorios: {
    title: 'Accesorios',
    subtitle: 'Detalles que marcan la diferencia',
    icon: Watch,
    gradient: 'from-gold-400/20 via-champagne-400/10 to-transparent',
    heroGradient: 'linear-gradient(135deg, #12100a 0%, #0a0a0a 50%, #1a1508 100%)',
    mujer: [
      { id: 'a1', name: 'Aretes Brillantes', price: 'Consultar', desc: 'Cristales premium que complementan cualquier traje.', colors: ['#d4a82a', '#e5c98d', '#fefef9'], tag: 'Popular' },
      { id: 'a2', name: 'Polainas Pro', price: 'Consultar', desc: 'Tejido técnico y ajuste perfecto.', colors: ['#d4a82a', '#0a0a0a', '#e5c98d'], tag: null },
      { id: 'a3', name: 'Tiara Royal', price: 'Consultar', desc: 'Diadema con cristales para competencia.', colors: ['#d4a82a', '#fefef9', '#e5c98d'], tag: 'Nuevo' },
      { id: 'a4', name: 'Bolso Couture', price: 'Consultar', desc: 'Bolso de mano con detalles en cuero.', colors: ['#0a0a0a', '#d4a82a', '#434343'], tag: null },
    ],
    hombre: [
      { id: 'a5', name: 'Corbata Elegance', price: 'Consultar', desc: 'Seda premium con bordado sutil.', colors: ['#d4a82a', '#0a0a0a', '#434343'], tag: null },
      { id: 'a6', name: 'Pañuelo Velvet', price: 'Consultar', desc: 'Terciopelo italiano para el look perfecto.', colors: ['#434343', '#d4a82a', '#818181'], tag: 'Nuevo' },
    ],
  },
  entrenamiento: {
    title: 'Prendas de Entrenamiento',
    subtitle: 'Rendimiento y estilo',
    icon: Dumbbell,
    gradient: 'from-noir-400/30 via-champagne-400/10 to-transparent',
    heroGradient: 'linear-gradient(135deg, #0f0f0f 0%, #0a0a0a 50%, #151515 100%)',
    mujer: [
      { id: 'e1', name: 'Body Technique', price: 'Consultar', desc: 'Respirabilidad y soporte para entrenamiento.', colors: ['#0a0a0a', '#434343', '#818181'], tag: 'Best Seller' },
      { id: 'e2', name: 'Mallas Performance', price: 'Consultar', desc: 'Alta compresión para máximo rendimiento.', colors: ['#e5c98d', '#d4a82a', '#0a0a0a'], tag: null },
      { id: 'e3', name: 'Top Core', price: 'Consultar', desc: 'Soporte superior y diseño elegante.', colors: ['#fefef9', '#818181', '#e5c98d'], tag: null },
      { id: 'e4', name: 'Leggings Studio', price: 'Consultar', desc: 'Flexibilidad total con estilo premium.', colors: ['#0a0a0a', '#434343', '#d4a82a'], tag: 'Nuevo' },
    ],
    hombre: [
      { id: 'e5', name: 'Tank Pro', price: 'Consultar', desc: 'Camiseta técnica de secado rápido.', colors: ['#0a0a0a', '#434343', '#818181'], tag: null },
      { id: 'e6', name: 'Shorts Training', price: 'Consultar', desc: 'Cómodos y ligeros para clase.', colors: ['#0a0a0a', '#d4a82a', '#434343'], tag: 'Nuevo' },
      { id: 'e7', name: 'Hoodie Couture', price: 'Consultar', desc: 'Sudadera premium post-entrenamiento.', colors: ['#434343', '#0a0a0a', '#e5c98d'], tag: null },
    ],
  },
  tacos: {
    title: 'Tacos y Calzado',
    subtitle: 'Pies que bailan con elegancia',
    icon: Footprints,
    gradient: 'from-champagne-400/15 via-gold-600/10 to-transparent',
    heroGradient: 'linear-gradient(135deg, #1a1508 0%, #0a0a0a 50%, #12100a 100%)',
    mujer: [
      { id: 'c1', name: 'Tacos Elite', price: 'Consultar', desc: 'Suela de alta adherencia y diseño ergonómico.', colors: ['#fefef9', '#818181', '#d4a82a'], tag: 'Popular' },
      { id: 'c2', name: 'Stilettos Crystal', price: 'Consultar', desc: 'Tacones con cristales para competencia.', colors: ['#d4a82a', '#e5c98d', '#fefef9'], tag: 'Nuevo' },
      { id: 'c3', name: 'Satin Flare', price: 'Consultar', desc: 'Tacos con cierre de velcro y satén.', colors: ['#e5c98d', '#d4a82a', '#0a0a0a'], tag: null },
      { id: 'c4', name: 'Character Shoe', price: 'Consultar', desc: 'Zapato clásico para danza contemporánea.', colors: ['#818181', '#0a0a0a', '#434343'], tag: null },
    ],
    hombre: [
      { id: 'c5', name: 'Salsa Shoes', price: 'Consultar', desc: 'Zapatos de cuero para baile latino.', colors: ['#0a0a0a', '#434343', '#d4a82a'], tag: 'Popular' },
      { id: 'c6', name: 'Ballroom Oxfords', price: 'Consultar', desc: 'Oxford elegante con suela flexible.', colors: ['#0a0a0a', '#434343', '#818181'], tag: null },
    ],
  },
}

const categoryOrder = ['trajes', 'accesorios', 'entrenamiento', 'tacos']

/* ───────── PRODUCT CARD ───────── */
const CatalogCard = ({ product }) => (
  <div className="group relative">
    <div className="relative overflow-hidden bg-noir-900 border border-noir-800 hover:border-champagne-500/40 transition-all duration-500">
      {/* Image placeholder */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-noir-800 via-noir-900 to-noir-950 transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(229,201,141,0.4) 1px, transparent 0)', backgroundSize: '28px 28px' }} />

        {/* Tag */}
        {product.tag && (
          <div className="absolute top-3 left-3 z-10">
            <span className="px-2.5 py-1 text-[10px] tracking-widest uppercase bg-champagne-400/90 text-noir-950 font-medium">{product.tag}</span>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-noir-950/90 via-noir-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <div className="flex items-center justify-between">
              <button className="flex items-center gap-2 text-ivory-100 hover:text-champagne-400 transition-colors">
                <Eye size={16} strokeWidth={1.5} />
                <span className="text-xs tracking-wide">Vista Rápida</span>
              </button>
              <button className="p-2 rounded-full bg-noir-800 text-ivory-100 hover:bg-champagne-400 hover:text-noir-950 transition-all">
                <Heart size={16} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>

        {/* ID */}
        <div className="absolute top-3 right-3 z-10">
          <span className="text-noir-600 text-[10px] font-mono">{product.id.toUpperCase()}</span>
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className="font-display text-lg text-ivory-100 tracking-wide mb-1 group-hover:text-champagne-400 transition-colors">{product.name}</h3>
        <p className="text-noir-400 text-xs leading-relaxed mb-3 line-clamp-2">{product.desc}</p>
        <div className="flex items-center gap-1.5 mb-3">
          {product.colors.map((c, i) => (
            <div key={i} className="w-3.5 h-3.5 rounded-full border border-noir-700" style={{ backgroundColor: c }} />
          ))}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-champagne-400 font-display text-base">{product.price}</span>
          <button className="text-noir-400 hover:text-champagne-400 transition-colors">
            <ArrowRight size={18} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  </div>
)

/* ───────── CATEGORY SECTION ───────── */
const CategorySection = ({ catKey, data }) => {
  const [gender, setGender] = useState('mujer')
  const sectionRef = useRef(null)
  const Icon = data.icon
  const items = data[gender] || []

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current.querySelector('.cat-hero-title'),
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' }
        }
      )
      gsap.fromTo(sectionRef.current.querySelector('.cat-hero-sub'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none reverse' }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id={`cat-${catKey}`} className="relative overflow-hidden">
      {/* Hero banner */}
      <div className="relative h-[60vh] md:h-[70vh] flex items-center justify-center" style={{ background: data.heroGradient }}>
        {/* Ambient glow */}
        <div className={`absolute inset-0 bg-gradient-to-br ${data.gradient} opacity-40`} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(229,201,141,0.06) 0%, transparent 60%)' }} />

        <div className="relative z-10 text-center px-6">
          <div className="cat-hero-title opacity-0 flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full border border-champagne-400/20 flex items-center justify-center">
              <Icon size={28} className="text-champagne-400" strokeWidth={1.5} />
            </div>
          </div>
          <h2 className="cat-hero-title opacity-0 font-display text-hero text-ivory-100 mb-4">
            {data.title}
          </h2>
          <p className="cat-hero-sub opacity-0 text-noir-300 text-base md:text-lg tracking-wide">{data.subtitle}</p>
        </div>
      </div>

      {/* Tabs + Products */}
      <div className="relative py-16 section-padding" style={{ background: '#0a0a0a' }}>
        <div className="max-w-7xl mx-auto">
          {/* Gender Tabs */}
          <div className="flex justify-center gap-1 mb-12 bg-noir-900 border border-noir-800 w-fit mx-auto p-1">
            {['mujer', 'hombre'].map((g) => (
              <button
                key={g}
                onClick={() => setGender(g)}
                className={`px-8 py-3 text-xs tracking-[0.2em] uppercase font-sans transition-all duration-300 ${
                  gender === g
                    ? 'bg-champagne-400 text-noir-950 font-medium'
                    : 'text-noir-400 hover:text-ivory-100'
                }`}
              >
                {g === 'mujer' ? 'Mujer' : 'Hombre'}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {items.map((p) => (
              <CatalogCard key={p.id} product={p} />
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <a href="#contacto" className="btn-luxury group inline-flex items-center gap-3">
              <span>Ver Todo {data.title}</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ───────── MAIN CATALOG ───────── */
const CatalogPage = () => {
  const navRef = useRef(null)
  const [active, setActive] = useState('trajes')

  const scrollToCategory = (key) => {
    setActive(key)
    const el = document.getElementById(`cat-${key}`)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="relative bg-noir-950">
      {/* Sticky category nav */}
      <nav ref={navRef} className="sticky top-0 z-40 bg-noir-950/95 backdrop-blur-md border-b border-noir-800/50">
        <div className="max-w-7xl mx-auto section-padding py-4 flex items-center justify-between">
          <span className="text-champagne-400 text-xs tracking-[0.3em] uppercase hidden md:block">Catálogo</span>
          <div className="flex gap-1 mx-auto md:mx-0 overflow-x-auto">
            {categoryOrder.map((key) => {
              const Icon = catalogData[key].icon
              return (
                <button
                  key={key}
                  onClick={() => scrollToCategory(key)}
                  className={`flex items-center gap-2 px-4 py-2.5 text-xs tracking-[0.15em] uppercase whitespace-nowrap transition-all duration-300 ${
                    active === key
                      ? 'text-champagne-400 border-b-2 border-champagne-400'
                      : 'text-noir-400 hover:text-ivory-100 border-b-2 border-transparent'
                  }`}
                >
                  <Icon size={14} strokeWidth={1.5} />
                  {catalogData[key].title}
                </button>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Category Sections */}
      {categoryOrder.map((key) => (
        <CategorySection key={key} catKey={key} data={catalogData[key]} />
      ))}
    </div>
  )
}

export default CatalogPage
