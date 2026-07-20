import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import { Menu, X, ChevronRight } from 'lucide-react'
import Logo from './branding/Logo'

const megaMenuData = [
  {
    title: 'Trajes de Baile',
    to: '/coleccion/trajes',
    items: [
      { label: 'Mujer', to: '/coleccion/trajes' },
      { label: 'Hombre', to: '/coleccion/trajes' },
    ],
  },
  {
    title: 'Accesorios',
    to: '/coleccion/accesorios',
    items: [
      { label: 'Mujer', to: '/coleccion/accesorios' },
      { label: 'Hombre', to: '/coleccion/accesorios' },
    ],
  },
  {
    title: 'Entrenamiento',
    to: '/coleccion/entrenamiento',
    items: [
      { label: 'Mujer', to: '/coleccion/entrenamiento' },
      { label: 'Hombre', to: '/coleccion/entrenamiento' },
    ],
  },
  {
    title: 'Tacos y Calzado',
    to: '/coleccion/tacos',
    items: [
      { label: 'Mujer', to: '/coleccion/tacos' },
      { label: 'Hombre', to: '/coleccion/tacos' },
    ],
  },
]

const navLinks = [
  { label: 'Proceso', to: '/proceso' },
  { label: 'Nosotros', to: '/nosotros' },
  { label: 'Contacto', to: '/contacto' },
]

const Navbar = () => {
  const navbarRef = useRef(null)
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMegaOpen, setIsMegaOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mobileAccordion, setMobileAccordion] = useState(null)
  const closeTimeout = useRef(null)

  const isLanding = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!navbarRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(navbarRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.3 }
      )
    }, navbarRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!navbarRef.current) return
    const mobileMenu = navbarRef.current.querySelector('.mobile-menu')
    if (!mobileMenu) return
    if (isMobileMenuOpen) {
      gsap.to(mobileMenu, { height: 'auto', opacity: 1, duration: 0.4, ease: 'power3.out' })
    } else {
      gsap.to(mobileMenu, { height: 0, opacity: 0, duration: 0.3, ease: 'power3.in' })
    }
  }, [isMobileMenuOpen])

  const handleMegaEnter = () => {
    clearTimeout(closeTimeout.current)
    setIsMegaOpen(true)
  }
  const handleMegaLeave = () => {
    closeTimeout.current = setTimeout(() => setIsMegaOpen(false), 150)
  }
  const handleLinkClick = () => setIsMobileMenuOpen(false)

  return (
    <header
      ref={navbarRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-noir-950/95 backdrop-blur-md border-b border-noir-800/50'
          : 'bg-transparent'
      }`}
    >
      <nav className="section-padding py-4 md:py-5" role="navigation" aria-label="Main navigation">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="relative z-10 focus:outline-none focus:ring-2 focus:ring-champagne-400 rounded-sm"
            aria-label="RM Designs - Inicio"
          >
            <Logo size={isScrolled ? 'default' : 'large'} animated={true} />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {/* Colecciones mega menu */}
            <div
              className="relative"
              onMouseEnter={handleMegaEnter}
              onMouseLeave={handleMegaLeave}
            >
              <Link
                to="/coleccion/trajes"
                className={`group relative text-sm tracking-[0.15em] uppercase transition-colors duration-300 focus:outline-none ${
                  isMegaOpen ? 'text-champagne-400' : 'text-ivory-100/80 hover:text-champagne-400'
                }`}
              >
                Colecciones
                <span className={`absolute -bottom-1 left-0 h-px bg-gradient-to-r from-champagne-400 to-champagne-400/50 transition-all duration-500 ${
                  isMegaOpen ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </Link>

              {/* Mega Menu */}
              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-300 ${
                  isMegaOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                }`}
              >
                <div className="bg-noir-900/98 backdrop-blur-xl border border-noir-800/80 shadow-2xl shadow-noir-950/80 min-w-[520px]">
                  <div className="grid grid-cols-2 gap-0">
                    {megaMenuData.map((cat) => (
                      <div key={cat.title} className="border-b border-noir-800/50 last:border-b-0">
                        <Link
                          to={cat.to}
                          className="block px-6 py-4 text-sm font-display text-ivory-100 tracking-wide hover:bg-noir-800/50 hover:text-champagne-400 transition-all duration-300"
                          onClick={() => setIsMegaOpen(false)}
                        >
                          {cat.title}
                        </Link>
                        <div className="flex gap-1 px-6 pb-4">
                          {cat.items.map((item) => (
                            <Link
                              key={item.label}
                              to={item.to}
                              className="flex items-center gap-1 px-3 py-1.5 text-xs text-noir-400 hover:text-champagne-400 hover:bg-noir-800/50 transition-all duration-300"
                              onClick={() => setIsMegaOpen(false)}
                            >
                              {item.label}
                              <ChevronRight size={10} />
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-noir-800/50 px-6 py-4">
                    <Link to="/coleccion/trajes" className="text-xs tracking-[0.2em] uppercase text-champagne-400 hover:text-gold-400 transition-colors duration-300" onClick={() => setIsMegaOpen(false)}>
                      Ver Todo el Catálogo →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="group relative text-sm tracking-[0.15em] uppercase text-ivory-100/80 hover:text-champagne-400 transition-colors duration-300 focus:outline-none focus:text-champagne-400"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-champagne-400 to-champagne-400/50 group-hover:w-full transition-all duration-500" />
              </Link>
            ))}

            <Link
              to="/contacto"
              className="ml-4 relative px-6 py-2.5 text-xs tracking-[0.2em] uppercase text-noir-950 bg-champagne-400 font-medium hover:bg-gold-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-champagne-400 focus:ring-offset-2 focus:ring-offset-noir-950 shadow-lg shadow-champagne-400/20 hover:shadow-champagne-400/40"
            >
              Contactar
            </Link>
          </div>

          {/* Mobile */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden relative z-10 p-2 text-ivory-100 hover:text-champagne-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-champagne-400 rounded"
            aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {isMobileMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className="mobile-menu lg:hidden overflow-hidden opacity-0 h-0">
          <div className="pt-6 pb-4 border-t border-noir-800/50 mt-4">
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setMobileAccordion(mobileAccordion === 'colecciones' ? null : 'colecciones')}
                className="flex items-center justify-between text-base tracking-[0.15em] uppercase text-ivory-100/80 hover:text-champagne-400 transition-colors py-2"
              >
                Colecciones
                <ChevronRight size={16} className={`transition-transform duration-300 ${mobileAccordion === 'colecciones' ? 'rotate-90' : ''}`} />
              </button>
              {mobileAccordion === 'colecciones' && (
                <div className="pl-4 pb-2 flex flex-col gap-1">
                  {megaMenuData.map((cat) => (
                    <div key={cat.title}>
                      <Link to={cat.to} onClick={handleLinkClick} className="block py-1.5 text-sm text-champagne-400 tracking-wide">
                        {cat.title}
                      </Link>
                      <div className="flex gap-2 pl-3 pb-2">
                        {cat.items.map((item) => (
                          <Link key={item.label} to={item.to} onClick={handleLinkClick} className="text-xs text-noir-400 hover:text-ivory-100 transition-colors">
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {navLinks.map((link) => (
                <Link key={link.label} to={link.to} onClick={handleLinkClick} className="text-base tracking-[0.15em] uppercase text-ivory-100/80 hover:text-champagne-400 transition-colors py-2">
                  {link.label}
                </Link>
              ))}

              <Link to="/contacto" onClick={handleLinkClick} className="mt-4 text-center px-6 py-3 text-sm tracking-[0.15em] uppercase text-noir-950 bg-champagne-400 font-medium hover:bg-gold-400 transition-all duration-300">
                Contactar
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-champagne-400/20 to-transparent transition-opacity duration-500 ${isScrolled ? 'opacity-100' : 'opacity-0'}`} />
    </header>
  )
}

export default Navbar
