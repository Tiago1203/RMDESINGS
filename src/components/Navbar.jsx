import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { Menu, X } from 'lucide-react'
import Logo from './branding/Logo'

/**
 * Navigation Component
 * 
 * Premium navigation bar with RM Designs branding.
 * Features elegant transitions, scroll effects, and mobile responsiveness.
 */

const navLinks = [
  { label: 'Colecciones', href: '#colecciones' },
  { label: 'Proceso', href: '#proceso' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Contacto', href: '#contacto' },
]

const Navbar = () => {
  const navbarRef = useRef(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsScrolled(scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Navbar entrance animation
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

  // Mobile menu animation
  useEffect(() => {
    if (!navbarRef.current) return

    const mobileMenu = navbarRef.current.querySelector('.mobile-menu')
    if (!mobileMenu) return

    if (isMobileMenuOpen) {
      gsap.to(mobileMenu, {
        height: 'auto',
        opacity: 1,
        duration: 0.4,
        ease: 'power3.out',
      })
    } else {
      gsap.to(mobileMenu, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power3.in',
      })
    }
  }, [isMobileMenuOpen])

  // Close mobile menu on link click
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header
      ref={navbarRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-noir-950/95 backdrop-blur-md border-b border-noir-800/50' 
          : 'bg-transparent'
      }`}
      role="banner"
    >
      <nav 
        className="section-padding py-4 md:py-5"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <a 
            href="/" 
            className="relative z-10 focus:outline-none focus:ring-2 focus:ring-champagne-400 rounded-sm"
            aria-label="RM Designs - Inicio"
          >
            <Logo size={isScrolled ? 'default' : 'large'} animated={true} />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative text-sm tracking-[0.15em] uppercase text-ivory-100/80 
                         hover:text-champagne-400 transition-colors duration-300 focus:outline-none
                         focus:text-champagne-400"
              >
                {link.label}
                {/* Underline effect */}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-champagne-400 to-champagne-400/50 
                               group-hover:w-full transition-all duration-500" />
              </a>
            ))}
            
            {/* CTA Button */}
            <a
              href="#contacto"
              className="ml-4 relative px-6 py-2.5 text-xs tracking-[0.2em] uppercase
                       text-noir-950 bg-champagne-400 font-medium
                       hover:bg-gold-400 transition-all duration-300
                       focus:outline-none focus:ring-2 focus:ring-champagne-400 focus:ring-offset-2 focus:ring-offset-noir-950
                       shadow-lg shadow-champagne-400/20 hover:shadow-champagne-400/40"
            >
              Contactar
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden relative z-10 p-2 text-ivory-100 hover:text-champagne-400 
                     transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-champagne-400 rounded"
            aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X size={24} strokeWidth={1.5} />
            ) : (
              <Menu size={24} strokeWidth={1.5} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className="mobile-menu lg:hidden overflow-hidden opacity-0 h-0">
          <div className="pt-6 pb-4 border-t border-noir-800/50 mt-4">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  className="text-base tracking-[0.15em] uppercase text-ivory-100/80 
                           hover:text-champagne-400 transition-colors duration-300
                           focus:outline-none focus:text-champagne-400 py-2"
                >
                  {link.label}
                </a>
              ))}
              
              {/* Mobile CTA */}
              <a
                href="#contacto"
                onClick={handleLinkClick}
                className="mt-4 text-center px-6 py-3 text-sm tracking-[0.15em] uppercase
                         text-noir-950 bg-champagne-400 font-medium
                         hover:bg-gold-400 transition-all duration-300"
              >
                Contactar
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Bottom gradient line */}
      <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-champagne-400/20 to-transparent transition-opacity duration-500 ${isScrolled ? 'opacity-100' : 'opacity-0'}`} />
    </header>
  )
}

export default Navbar
