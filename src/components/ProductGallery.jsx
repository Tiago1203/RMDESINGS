import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Heart, Eye, ArrowRight, Sparkles, Scissors, Gem, Zap } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/**
 * Product Gallery Component
 * 
 * Premium gallery showcasing dance costumes with luxury presentation.
 * Features hover effects, quick view functionality, and elegant animations.
 */

const products = [
  // TRAJES DE BAILE
  {
    id: 1,
    name: 'Flamenco Royal',
    category: 'Traje de Baile',
    price: 'Consultar',
    description: 'Traje flamenco premium con encaje italiano y bordados a mano.',
    colors: ['#e5c98d', '#d4a82a', '#818181'],
    featured: true
  },
  {
    id: 2,
    name: 'Latin Passion',
    category: 'Ritmo Latino',
    price: 'Consultar',
    description: 'Diseño contemporáneo con seda importada y cristales Swarovski.',
    colors: ['#fefef9', '#e5c98d', '#0a0a0a'],
    featured: true
  },
  {
    id: 3,
    name: 'Classic Elegance',
    category: 'Baile de Salón',
    price: 'Consultar',
    description: 'Elegancia atemporal con corte imperial y acabados artesanales.',
    colors: ['#434343', '#818181', '#fefef9'],
    featured: false
  },
  // IMPLEMENTOS DE DANZA
  {
    id: 4,
    name: 'Polainas Pro',
    category: 'Implementos',
    price: 'Consultar',
    description: 'Polainas profesionales con tejido técnico y ajuste perfecto.',
    colors: ['#d4a82a', '#0a0a0a', '#e5c98d'],
    featured: true
  },
  {
    id: 5,
    name: 'Tacos Elite',
    category: 'Calzado',
    price: 'Consultar',
    description: 'Tacos de baile con suela de alta adherencia y diseño ergonómico.',
    colors: ['#fefef9', '#818181', '#d4a82a'],
    featured: true
  },
  {
    id: 6,
    name: 'Aretes Brillantes',
    category: 'Accesorios',
    price: 'Consultar',
    description: 'Aretes con cristales premium que complementan cualquier traje.',
    colors: ['#d4a82a', '#e5c98d', '#fefef9'],
    featured: false
  },
  // ROPA DE ENTRENAMIENTO
  {
    id: 7,
    name: 'Body Technique',
    category: 'Entrenamiento',
    price: 'Consultar',
    description: 'Body técnico para entrenamiento con respirabilidad y soporte.',
    colors: ['#0a0a0a', '#434343', '#818181'],
    featured: true
  },
  {
    id: 8,
    name: 'Mallas Performance',
    category: 'Entrenamiento',
    price: 'Consultar',
    description: 'Mallas de alta compresión para máximo rendimiento en clase.',
    colors: ['#e5c98d', '#d4a82a', '#0a0a0a'],
    featured: true
  },
  {
    id: 9,
    name: 'Top Core',
    category: 'Entrenamiento',
    price: 'Consultar',
    description: 'Top de entrenamiento con soporte superior y diseño elegante.',
    colors: ['#fefef9', '#818181', '#e5c98d'],
    featured: false
  },
  // COLECCIÓN ESPECIAL
  {
    id: 10,
    name: 'Spanish Heritage',
    category: 'Tradición Española',
    price: 'Consultar',
    description: 'Homenaje a la tradición con polisón y volantes artesanales.',
    colors: ['#e5c98d', '#818181', '#d4a82a'],
    featured: false
  },
  {
    id: 11,
    name: 'Golden Era',
    category: 'Colección Limitada',
    price: 'Consultar',
    description: 'Pieza exclusiva con hilos de oro y pedrería fina.',
    colors: ['#d4a82a', '#fefef9', '#0a0a0a'],
    featured: true
  },
  {
    id: 12,
    name: 'Velvet Rose',
    category: 'Colección Limitada',
    price: 'Consultar',
    description: 'Traje en terciopelo premium con detalles en rosa champagne.',
    colors: ['#d4a82a', '#e5c98d', '#434343'],
    featured: true
  }
]

/**
 * Individual Product Card Component
 */
const ProductCard = ({ product, index }) => {
  const cardRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  // Custom animations based on category
  const getCategoryAnimation = () => {
    switch(product.category) {
      case 'Traje de Baile':
      case 'Tradición Española':
      case 'Colección Limitada':
        return {
          hoverScale: 1.05,
          hoverRotate: 1,
          iconAnimation: 'rotate-slow',
          icon: Sparkles
        }
      case 'Implementos':
      case 'Calzado':
      case 'Accesorios':
        return {
          hoverScale: 1.08,
          hoverRotate: -2,
          iconAnimation: 'bounce-gentle',
          icon: Gem
        }
      case 'Entrenamiento':
        return {
          hoverScale: 1.03,
          hoverRotate: 0,
          iconAnimation: 'pulse-subtle',
          icon: Zap
        }
      default:
        return {
          hoverScale: 1.05,
          hoverRotate: 0,
          iconAnimation: 'fade-in',
          icon: Scissors
        }
    }
  }

  const animationConfig = getCategoryAnimation()
  const CategoryIcon = animationConfig.icon

  useEffect(() => {
    if (!cardRef.current) return

    const ctx = gsap.context(() => {
      // 4D entrance animation
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 80, scale: 0.85, rotationY: 5, filter: 'blur(10px)' },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationY: 0,
          filter: 'blur(0px)',
          duration: 1,
          ease: 'power4.out',
          delay: index * 0.1,
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

  const handleLike = (e) => {
    e.preventDefault()
    setIsLiked(!isLiked)
  }

  return (
    <div
      ref={cardRef}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Card */}
      <div className="relative overflow-hidden bg-noir-900 border border-noir-800 hover:border-champagne-500/40 transition-all duration-500">
        {/* Image Placeholder with Gradient */}
        <div className="relative aspect-[3/4] overflow-hidden">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-noir-800 via-noir-900 to-noir-950 transition-transform duration-700 group-hover:scale-105" />
          
          {/* Pattern Overlay */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(229, 201, 141, 0.4) 1px, transparent 0)`,
              backgroundSize: '32px 32px'
            }} />
          </div>

          {/* Featured Badge */}
          {product.featured && (
            <div className="absolute top-4 left-4 z-10">
              <span className="px-3 py-1 text-xs tracking-widest uppercase bg-champagne-400/90 text-noir-950 font-medium">
                Destacado
              </span>
            </div>
          )}

          {/* Quick Actions Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t from-noir-950/90 via-noir-950/40 to-transparent transition-all duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-center justify-between">
                <button className="flex items-center gap-2 text-ivory-100 hover:text-champagne-400 transition-colors duration-300">
                  <Eye size={18} strokeWidth={1.5} />
                  <span className="text-sm tracking-wide">Vista Rápida</span>
                </button>
                <button
                  onClick={handleLike}
                  className={`p-2 rounded-full transition-all duration-300 ${isLiked ? 'bg-champagne-400 text-noir-950' : 'bg-noir-800 text-ivory-100 hover:bg-champagne-400 hover:text-noir-950'}`}
                >
                  <Heart size={18} strokeWidth={1.5} fill={isLiked ? 'currentColor' : 'none'} />
                </button>
              </div>
            </div>
          </div>

          {/* Product Number */}
          <div className="absolute top-4 right-4 z-10">
            <span className="text-noir-600 text-xs font-mono">
              {String(product.id).padStart(2, '0')}
            </span>
          </div>

          {/* Category Icon */}
          <div className="absolute top-4 left-4 z-10">
            <div className="product-icon w-10 h-10 rounded-full bg-noir-950/80 border border-champagne-400/30 flex items-center justify-center text-champagne-400">
              <CategoryIcon size={18} strokeWidth={1.5} />
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-6">
          {/* Category */}
          <span className="text-champagne-400/70 text-xs tracking-widest uppercase mb-2 block">
            {product.category}
          </span>

          {/* Title */}
          <h3 className="font-display text-xl text-ivory-100 tracking-wide mb-3 group-hover:text-champagne-400 transition-colors duration-300">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-noir-400 text-sm leading-relaxed mb-4 line-clamp-2">
            {product.description}
          </p>

          {/* Color Options */}
          <div className="flex items-center gap-2 mb-4">
            {product.colors.map((color, colorIndex) => (
              <div
                key={colorIndex}
                className="w-4 h-4 rounded-full border border-noir-700"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>

          {/* Price and CTA */}
          <div className="flex items-center justify-between">
            <span className="text-champagne-400 font-display text-lg">
              {product.price}
            </span>
            <button className="text-noir-400 hover:text-champagne-400 transition-colors duration-300">
              <ArrowRight size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Corner Decoration */}
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-champagne-400/20 group-hover:border-champagne-400/50 transition-colors duration-500" />
      </div>
    </div>
  )
}

/**
 * Main ProductGallery Component
 */
const ProductGallery = () => {
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
      id="productos"
      ref={sectionRef}
      className="relative py-section bg-noir-950 section-padding overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-champagne-400/10 to-transparent" />
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-gradient-to-br from-champagne-400/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-gradient-to-tl from-gold-900/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16 md:mb-20">
          <span className="header-badge opacity-0 text-champagne-400 text-xs tracking-[0.3em] uppercase mb-6 block">
            Colección Exclusiva
          </span>
          
          <h2 className="header-title opacity-0 font-display text-display text-ivory-100 mb-8">
            Obras de Arte
            <span className="block italic text-champagne-400 font-light">Para Bailar</span>
          </h2>

          <div className="flex justify-center mb-8">
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-champagne-400 to-transparent" />
          </div>

          <p className="header-description opacity-0 max-w-2xl mx-auto text-base md:text-lg text-noir-400 leading-relaxed">
            Desde trajes de alta costura hasta implementos de entrenamiento profesional. 
            Descubre nuestra colección completa de piezas premium para bailarinas exigentes.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="inline-flex flex-col items-center gap-6 p-8 bg-noir-900/50 border border-noir-800 hover:border-champagne-500/30 transition-all duration-500">
            <p className="text-noir-400 text-sm tracking-wide">
              ¿Buscas un diseño personalizado?
            </p>
            <a href="#contacto" className="btn-luxury group">
              <span>Solicitar Diseño Exclusivo</span>
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

      {/* Bottom Decoration */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-champagne-400/20 to-transparent" />
    </section>
  )
}

export default ProductGallery
