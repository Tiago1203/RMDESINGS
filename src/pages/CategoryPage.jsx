import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowRight, Heart, Eye, ArrowLeft } from 'lucide-react'
import catalogData from '../data/catalogData'

const CatalogCard = ({ product }) => (
  <div className="group relative">
    <div className="relative overflow-hidden bg-noir-900 border border-noir-800 hover:border-champagne-500/40 transition-all duration-500">
      <div className="relative aspect-[3/4] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-noir-800 via-noir-900 to-noir-950 transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(229,201,141,0.4) 1px, transparent 0)', backgroundSize: '28px 28px' }} />

        {product.tag && (
          <div className="absolute top-3 left-3 z-10">
            <span className="px-2.5 py-1 text-[10px] tracking-widest uppercase bg-champagne-400/90 text-noir-950 font-medium">{product.tag}</span>
          </div>
        )}

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

        <div className="absolute top-3 right-3 z-10">
          <span className="text-noir-600 text-[10px] font-mono">{product.id.toUpperCase()}</span>
        </div>
      </div>

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

const CategoryPage = () => {
  const { categorySlug } = useParams()
  const [gender, setGender] = useState('mujer')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [categorySlug])

  const data = catalogData[categorySlug]

  if (!data) {
    return (
      <div className="min-h-screen bg-noir-950 flex items-center justify-center section-padding">
        <div className="text-center">
          <h1 className="font-display text-display text-ivory-100 mb-4">Categoría no encontrada</h1>
          <Link to="/" className="btn-luxury">Volver al Inicio</Link>
        </div>
      </div>
    )
  }

  const Icon = data.icon
  const items = data[gender] || []

  return (
    <div className="min-h-screen bg-noir-950">
      {/* Hero Banner */}
      <div className="relative h-[50vh] md:h-[60vh] flex items-center justify-center" style={{ background: data.heroGradient }}>
        <div className={`absolute inset-0 bg-gradient-to-br ${data.gradient} opacity-40`} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(229,201,141,0.06) 0%, transparent 60%)' }} />

        <div className="relative z-10 text-center px-6">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full border border-champagne-400/20 flex items-center justify-center">
              <Icon size={28} className="text-champagne-400" strokeWidth={1.5} />
            </div>
          </div>
          <h1 className="font-display text-hero text-ivory-100 mb-4">{data.title}</h1>
          <p className="text-noir-300 text-base md:text-lg tracking-wide">{data.subtitle}</p>
        </div>
      </div>

      {/* Tabs + Products */}
      <div className="py-16 section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Back + Tabs */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
            <Link to="/" className="flex items-center gap-2 text-noir-400 hover:text-champagne-400 transition-colors text-sm">
              <ArrowLeft size={16} />
              Volver
            </Link>

            <div className="flex gap-1 bg-noir-900 border border-noir-800 p-1">
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
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {items.map((p) => (
              <CatalogCard key={p.id} product={p} />
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <Link to="/" className="btn-luxury group inline-flex items-center gap-3">
              <span>Ver Otros Productos</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryPage
