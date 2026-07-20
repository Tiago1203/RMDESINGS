import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Instagram, Mail, Phone, MapPin, ArrowUp, ChevronRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/**
 * Footer Component
 * 
 * Minimalist high-end footer with navigation, contact info, social links,
 * newsletter subscription, and scroll-to-top functionality.
 */

/**
 * Navigation Links Data
 */
const navigationLinks = [
  { label: 'Colecciones', href: '#colecciones' },
  { label: 'Proceso', href: '#proceso' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Contacto', href: '#contacto' },
]

/**
 * Social Links Data
 */
const socialLinks = [
  { name: 'Instagram', href: 'https://instagram.com', icon: Instagram },
]

/**
 * Newsletter Form Component
 */
const NewsletterForm = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle, loading, success, error

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) return
    
    setStatus('loading')
    // Simulate API call
    setTimeout(() => {
      setStatus('success')
      setEmail('')
      setTimeout(() => setStatus('idle'), 3000)
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8">
      <p className="text-noir-500 text-xs tracking-widest uppercase mb-3">
        Newsletter
      </p>
      <div className="flex">
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Tu email"
          disabled={status === 'loading' || status === 'success'}
          className="flex-1 bg-noir-900/50 border border-noir-800 px-4 py-3 text-sm text-ivory-100 
                   placeholder:text-noir-600 focus:border-champagne-400 focus:outline-none
                   transition-colors duration-300 disabled:opacity-50"
        />
        <button 
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className="bg-champagne-500 text-noir-950 px-5 py-3 text-sm font-medium 
                   hover:bg-champagne-400 transition-colors duration-300
                   disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {status === 'success' ? (
            '✓'
          ) : status === 'loading' ? (
            <span className="w-4 h-4 border-2 border-noir-950 border-t-transparent rounded-full animate-spin" />
          ) : (
            <ChevronRight size={16} />
          )}
        </button>
      </div>
      {status === 'success' && (
        <p className="text-champagne-400 text-xs mt-2">¡Gracias por suscribirte!</p>
      )}
    </form>
  )
}

/**
 * Main Footer Component
 */
const Footer = () => {
  const footerRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!footerRef.current) return

    const ctx = gsap.context(() => {
      // Fade in animation for footer sections
      gsap.fromTo('.footer-section',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Decorative line animation
      gsap.fromTo('.footer-divider',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, footerRef)

    return () => ctx.revert()
  }, [])

  // Scroll to top handler
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Show/hide scroll button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <footer 
      ref={footerRef}
      id="contacto"
      className="relative bg-noir-950 border-t border-noir-800"
      role="contentinfo"
    >
      {/* Background decorative gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-noir-950 via-noir-950 to-noir-950" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-champagne-400/20 to-transparent" />

      {/* Main Footer */}
      <div className="relative z-10 section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Top Section - Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10 mb-16">
            {/* Brand Column */}
            <div className="footer-section opacity-0">
              <span className="font-display text-3xl tracking-[0.25em] text-ivory-100 block mb-5">
                RM<span className="text-champagne-400">.</span>
              </span>
              <p className="text-noir-400 text-sm leading-relaxed max-w-xs">
                Alta costura artesanal para trajes de baile e implementos de alta gama. 
                Donde la elegancia encuentra la perfección.
              </p>
              
              {/* Logo badge */}
              <div className="mt-6 inline-flex items-center gap-2 text-xs text-noir-600">
                <div className="w-8 h-px bg-gradient-to-r from-champagne-400/40 to-transparent" />
                <span>Desde 2024</span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-section opacity-0">
              <h4 className="font-sans text-xs tracking-[0.2em] uppercase text-ivory-100 mb-6">
                Navegación
              </h4>
              <ul className="space-y-4">
                {navigationLinks.map((link) => (
                  <li key={link.href}>
                    <a 
                      href={link.href}
                      className="inline-flex items-center gap-2 text-noir-400 text-sm 
                               hover:text-champagne-400 transition-colors duration-300 group"
                    >
                      <span className="w-0 group-hover:w-3 h-px bg-champagne-400 transition-all duration-300" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="footer-section opacity-0">
              <h4 className="font-sans text-xs tracking-[0.2em] uppercase text-ivory-100 mb-6">
                Contacto
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin size={16} className="text-champagne-400 mt-1 flex-shrink-0" strokeWidth={1.5} />
                  <span className="text-noir-400 text-sm leading-relaxed">
                    Av. de la Elegancia 123<br />
                    Madrid, España
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={16} className="text-champagne-400 flex-shrink-0" strokeWidth={1.5} />
                  <a href="tel:+34912345678" className="text-noir-400 text-sm hover:text-champagne-400 transition-colors">
                    +34 912 345 678
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={16} className="text-champagne-400 flex-shrink-0" strokeWidth={1.5} />
                  <a href="mailto:contacto@rmdesigns.com" className="text-noir-400 text-sm hover:text-champagne-400 transition-colors">
                    contacto@rmdesigns.com
                  </a>
                </li>
              </ul>
            </div>

            {/* Social & Newsletter */}
            <div className="footer-section opacity-0">
              <h4 className="font-sans text-xs tracking-[0.2em] uppercase text-ivory-100 mb-6">
                Síguenos
              </h4>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a 
                    key={social.name}
                    href={social.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-11 h-11 border border-noir-700 flex items-center justify-center 
                             text-noir-400 hover:border-champagne-400 hover:text-champagne-400 
                             hover:bg-champagne-400/5 transition-all duration-300"
                    aria-label={social.name}
                  >
                    <social.icon size={18} strokeWidth={1.5} />
                  </a>
                ))}
              </div>
              
              <NewsletterForm />
            </div>
          </div>

          {/* Divider */}
          <div className="footer-divider origin-center border-t border-noir-800/50 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-noir-600 text-xs tracking-wide">
                © 2024 RM Designs. Todos los derechos reservados.
              </p>
              <div className="flex items-center gap-8">
                {['Privacidad', 'Términos', 'Cookies'].map((item) => (
                  <a 
                    key={item} 
                    href="#" 
                    className="text-noir-600 text-xs hover:text-noir-400 transition-colors"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed right-6 md:right-10 bottom-6 md:bottom-10 w-12 h-12 bg-noir-900 border border-noir-700 
                   flex items-center justify-center text-champagne-400 z-50
                   hover:bg-champagne-500 hover:text-noir-950 hover:border-champagne-500
                   transition-all duration-300 shadow-lg shadow-noir-950/50
                   ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
        aria-label="Volver arriba"
      >
        <ArrowUp size={20} strokeWidth={1.5} />
      </button>
    </footer>
  )
}

export default Footer
