import { Shirt, Watch, Dumbbell, Footprints } from 'lucide-react'

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

export const categoryOrder = ['trajes', 'accesorios', 'entrenamiento', 'tacos']
export default catalogData
