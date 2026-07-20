import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Send, Instagram, Mail, Phone, MapPin } from 'lucide-react'

const ContactoPage = () => {
  const [formStatus, setFormStatus] = useState(null)

  useEffect(() => { window.scrollTo(0, 0) }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormStatus('sent')
    setTimeout(() => setFormStatus(null), 3000)
  }

  return (
    <div className="min-h-screen bg-noir-950">
      {/* Hero */}
      <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0f0f0f 0%, #0a0a0a 50%, #151515 100%)' }}>
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(229,201,141,0.06) 0%, transparent 60%)' }} />
        <div className="relative z-10 text-center section-padding">
          <span className="text-champagne-400 text-xs tracking-[0.3em] uppercase mb-6 block">Contacto</span>
          <h1 className="font-display text-hero text-ivory-100 mb-4">
            Hablemos de tu <span className="italic text-champagne-400 font-light">Próximo Traje</span>
          </h1>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-20 section-padding">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          {/* Form */}
          <div>
            <h2 className="font-display text-2xl text-ivory-100 mb-8">Envíanos un Mensaje</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-noir-400 tracking-widest uppercase mb-2">Nombre</label>
                  <input type="text" required className="w-full bg-noir-900 border border-noir-800 px-4 py-3 text-sm text-ivory-100 focus:border-champagne-400 focus:outline-none transition-colors" placeholder="Tu nombre" />
                </div>
                <div>
                  <label className="block text-xs text-noir-400 tracking-widest uppercase mb-2">Apellido</label>
                  <input type="text" required className="w-full bg-noir-900 border border-noir-800 px-4 py-3 text-sm text-ivory-100 focus:border-champagne-400 focus:outline-none transition-colors" placeholder="Tu apellido" />
                </div>
              </div>

              <div>
                <label className="block text-xs text-noir-400 tracking-widest uppercase mb-2">Email</label>
                <input type="email" required className="w-full bg-noir-900 border border-noir-800 px-4 py-3 text-sm text-ivory-100 focus:border-champagne-400 focus:outline-none transition-colors" placeholder="tu@email.com" />
              </div>

              <div>
                <label className="block text-xs text-noir-400 tracking-widest uppercase mb-2">Teléfono</label>
                <input type="tel" className="w-full bg-noir-900 border border-noir-800 px-4 py-3 text-sm text-ivory-100 focus:border-champagne-400 focus:outline-none transition-colors" placeholder="+52 ..." />
              </div>

              <div>
                <label className="block text-xs text-noir-400 tracking-widest uppercase mb-2">¿Qué estás buscando?</label>
                <select className="w-full bg-noir-900 border border-noir-800 px-4 py-3 text-sm text-noir-400 focus:border-champagne-400 focus:outline-none transition-colors appearance-none">
                  <option>Traje de Baile</option>
                  <option>Accesorios</option>
                  <option>Prendas de Entrenamiento</option>
                  <option>Tacos / Calzado</option>
                  <option>Diseño Personalizado</option>
                  <option>Otro</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-noir-400 tracking-widest uppercase mb-2">Mensaje</label>
                <textarea rows={5} required className="w-full bg-noir-900 border border-noir-800 px-4 py-3 text-sm text-ivory-100 focus:border-champagne-400 focus:outline-none transition-colors resize-none" placeholder="Cuéntanos sobre tu proyecto..." />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3 px-8 py-4 text-sm tracking-[0.2em] uppercase text-noir-950 bg-champagne-400 font-medium hover:bg-gold-400 transition-all duration-300 shadow-lg shadow-champagne-400/20 hover:shadow-champagne-400/40"
              >
                {formStatus === 'sent' ? (
                  <span>¡Mensaje Enviado!</span>
                ) : (
                  <>
                    <span>Enviar Mensaje</span>
                    <Send size={16} />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col justify-center">
            <h2 className="font-display text-2xl text-ivory-100 mb-8">Información de Contacto</h2>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full border border-champagne-400/20 flex items-center justify-center flex-shrink-0">
                  <Mail size={16} className="text-champagne-400" />
                </div>
                <div>
                  <h4 className="text-ivory-100 text-sm tracking-wide mb-1">Email</h4>
                  <p className="text-noir-400 text-sm">info@rmdesigns.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full border border-champagne-400/20 flex items-center justify-center flex-shrink-0">
                  <Phone size={16} className="text-champagne-400" />
                </div>
                <div>
                  <h4 className="text-ivory-100 text-sm tracking-wide mb-1">Teléfono</h4>
                  <p className="text-noir-400 text-sm">+52 (XXX) XXX-XXXX</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full border border-champagne-400/20 flex items-center justify-center flex-shrink-0">
                  <MapPin size={16} className="text-champagne-400" />
                </div>
                <div>
                  <h4 className="text-ivory-100 text-sm tracking-wide mb-1">Ubicación</h4>
                  <p className="text-noir-400 text-sm">Ciudad de México, MX</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full border border-champagne-400/20 flex items-center justify-center flex-shrink-0">
                  <Instagram size={16} className="text-champagne-400" />
                </div>
                <div>
                  <h4 className="text-ivory-100 text-sm tracking-wide mb-1">Instagram</h4>
                  <p className="text-noir-400 text-sm">@rmdesigns</p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 bg-noir-900/50 border border-noir-800">
              <p className="text-noir-400 text-xs leading-relaxed">
                <span className="text-champagne-400">Horario de atención:</span><br />
                Lunes a Viernes: 10:00 AM - 7:00 PM<br />
                Sábados: 10:00 AM - 2:00 PM
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <Link to="/" className="btn-luxury group inline-flex items-center gap-3">
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            <span>Volver al Inicio</span>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default ContactoPage
