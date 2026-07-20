import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Instagram, Mail, Phone, MapPin, ArrowUp } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const Footer = () => {
  const footerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.footer-content',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, footerRef)

    return () => ctx.revert()
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer 
      ref={footerRef}
      id="contacto"
      className="relative bg-noir-950 border-t border-noir-800"
    >
      {/* Main Footer */}
      <div className="section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
            {/* Brand Column */}
            <div className="footer-content">
              <span className="font-display text-3xl tracking-extra-wide text-ivory-100 block mb-4">
                RM<span className="text-champagne-400">.</span>
              </span>
              <p className="text-noir-400 text-sm leading-relaxed max-w-xs">
                Alta costura artesanal para trajes de baile e implementos de alta gama. 
                Donde la elegancia encuentra la perfección.
              </p>
            </div>

            {/* Quick Links */}
            <div className="footer-content">
              <h4 className="font-sans text-sm tracking-extra-wide uppercase text-ivory-100 mb-6">
                Navegación
              </h4>
              <ul className="space-y-3">
                {['Colecciones', 'Proceso', 'Nosotros', 'Contacto'].map((item) => (
                  <li key={item}>
                    <a 
                      href={`#${item.toLowerCase()}`}
                      className="text-noir-400 text-sm hover:text-champagne-400 transition-colors duration-300"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="footer-content">
              <h4 className="font-sans text-sm tracking-extra-wide uppercase text-ivory-100 mb-6">
                Contacto
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin size={16} className="text-champagne-400 mt-1 flex-shrink-0" strokeWidth={1.5} />
                  <span className="text-noir-400 text-sm">
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

            {/* Social */}
            <div className="footer-content">
              <h4 className="font-sans text-sm tracking-extra-wide uppercase text-ivory-100 mb-6">
                Síguenos
              </h4>
              <div className="flex gap-4">
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-noir-700 flex items-center justify-center 
                           text-noir-400 hover:border-champagne-400 hover:text-champagne-400 
                           transition-all duration-300"
                  aria-label="Instagram"
                >
                  <Instagram size={18} strokeWidth={1.5} />
                </a>
              </div>
              
              {/* Newsletter */}
              <div className="mt-8">
                <p className="text-noir-500 text-xs mb-3">Newsletter</p>
                <div className="flex">
                  <input 
                    type="email" 
                    placeholder="Tu email"
                    className="flex-1 bg-noir-900 border border-noir-700 px-4 py-2 text-sm text-ivory-100 
                             placeholder:text-noir-600 focus:border-champagne-400 focus:outline-none
                             transition-colors duration-300"
                  />
                  <button className="bg-champagne-500 text-noir-950 px-4 py-2 text-sm font-medium 
                                   hover:bg-champagne-400 transition-colors duration-300">
                    →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-noir-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-noir-600 text-xs tracking-wide">
                © 2024 RM Designs. Todos los derechos reservados.
              </p>
              <div className="flex gap-6">
                <a href="#" className="text-noir-600 text-xs hover:text-noir-400 transition-colors">
                  Privacidad
                </a>
                <a href="#" className="text-noir-600 text-xs hover:text-noir-400 transition-colors">
                  Términos
                </a>
                <a href="#" className="text-noir-600 text-xs hover:text-noir-400 transition-colors">
                  Cookies
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        className="absolute right-8 bottom-8 w-12 h-12 bg-noir-900 border border-noir-700 
                 flex items-center justify-center text-champagne-400
                 hover:bg-champagne-500 hover:text-noir-950 hover:border-champagne-500
                 transition-all duration-300"
        aria-label="Volver arriba"
      >
        <ArrowUp size={20} strokeWidth={1.5} />
      </button>
    </footer>
  )
}

export default Footer
