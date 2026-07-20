import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDown } from 'lucide-react'
import Logo from './branding/Logo'

gsap.registerPlugin(ScrollTrigger)

/**
 * LandingPage Component
 *
 * Premium vertical-scroll intro experience.
 * 4 full-screen sections that reveal as the user scrolls down:
 *  1. Logo Reveal — RM logo fades in with luxury shimmer
 *  2. "Trajes que Transforman" — Rendered dancer SVG + tagline
 *  3. Logo + Brand statement
 *  4. "Continuar a la WEB" — CTA button to enter the main site
 */

const DancerSVG = () => (
  <svg
    viewBox="0 0 400 600"
    className="w-full h-full"
    style={{ filter: 'drop-shadow(0 0 40px rgba(229, 201, 141, 0.35))' }}
  >
    <defs>
      {/* Main gradient for dancer body */}
      <linearGradient id="dressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#e5c98d" stopOpacity="0.95" />
        <stop offset="40%" stopColor="#d4a82a" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#fefef9" stopOpacity="0.6" />
      </linearGradient>

      {/* Shimmer gradient that animates */}
      <linearGradient id="shimmerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#fefef9" stopOpacity="0" />
        <stop offset="50%" stopColor="#fefef9" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#fefef9" stopOpacity="0" />
      </linearGradient>

      {/* Skirt gradient */}
      <linearGradient id="skirtGrad" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor="#e5c98d" stopOpacity="0.9" />
        <stop offset="60%" stopColor="#d4a82a" stopOpacity="0.7" />
        <stop offset="100%" stopColor="#b0851e" stopOpacity="0.4" />
      </linearGradient>

      {/* Crystal sparkle filter */}
      <filter id="glow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      {/* Bodice texture */}
      <pattern id="crystalPattern" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
        <circle cx="4" cy="4" r="1" fill="#fefef9" opacity="0.5" />
      </pattern>
    </defs>

    {/* ---- HEAD ---- */}
    <ellipse cx="200" cy="85" rx="28" ry="32" fill="url(#dressGrad)" opacity="0.9" />
    {/* Hair bun */}
    <ellipse cx="200" cy="60" rx="20" ry="16" fill="#b0851e" opacity="0.6" />

    {/* ---- NECK ---- */}
    <rect x="192" y="115" width="16" height="22" rx="8" fill="url(#dressGrad)" opacity="0.8" />

    {/* ---- TORSO / BODICE ---- */}
    <path
      d="M168 135 Q170 128 200 125 Q230 128 232 135 L236 200 Q220 210 200 212 Q180 210 164 200 Z"
      fill="url(#dressGrad)"
    />
    {/* Bodice crystal overlay */}
    <path
      d="M168 135 Q170 128 200 125 Q230 128 232 135 L236 200 Q220 210 200 212 Q180 210 164 200 Z"
      fill="url(#crystalPattern)"
      opacity="0.4"
    />

    {/* ---- ARMS ---- */}
    {/* Left arm extended gracefully */}
    <path
      d="M168 145 Q140 155 110 140 Q95 135 80 120"
      fill="none"
      stroke="url(#dressGrad)"
      strokeWidth="12"
      strokeLinecap="round"
      opacity="0.85"
    />
    {/* Left hand */}
    <circle cx="78" cy="118" r="6" fill="url(#dressGrad)" opacity="0.8" />

    {/* Right arm raised elegantly */}
    <path
      d="M232 145 Q260 130 280 100 Q290 80 295 60"
      fill="none"
      stroke="url(#dressGrad)"
      strokeWidth="12"
      strokeLinecap="round"
      opacity="0.85"
    />
    {/* Right hand */}
    <circle cx="296" cy="57" r="6" fill="url(#dressGrad)" opacity="0.8" />

    {/* ---- SKIRT (flowing dress) ---- */}
    <path
      d="M164 200 Q150 250 120 340 Q100 400 80 460 Q160 470 200 472 Q240 470 320 460 Q300 400 280 340 Q250 250 236 200 Z"
      fill="url(#skirtGrad)"
      opacity="0.85"
    />

    {/* Skirt fold lines for depth */}
    <path d="M180 210 Q160 300 130 400" fill="none" stroke="#fefef9" strokeWidth="0.8" opacity="0.3" />
    <path d="M200 210 Q200 310 200 440" fill="none" stroke="#fefef9" strokeWidth="0.8" opacity="0.25" />
    <path d="M220 210 Q240 300 270 400" fill="none" stroke="#fefef9" strokeWidth="0.8" opacity="0.3" />

    {/* Skirt sparkle crystals */}
    <circle cx="150" cy="300" r="2.5" fill="#fefef9" opacity="0.7" filter="url(#glow)">
      <animate attributeName="opacity" values="0.7;0.2;0.7" dur="2s" repeatCount="indefinite" />
    </circle>
    <circle cx="220" cy="340" r="2" fill="#e5c98d" opacity="0.6" filter="url(#glow)">
      <animate attributeName="opacity" values="0.6;0.15;0.6" dur="1.8s" repeatCount="indefinite" />
    </circle>
    <circle cx="180" cy="380" r="2.5" fill="#fefef9" opacity="0.5" filter="url(#glow)">
      <animate attributeName="opacity" values="0.5;0.1;0.5" dur="2.5s" repeatCount="indefinite" />
    </circle>
    <circle cx="250" cy="310" r="2" fill="#d4a82a" opacity="0.6" filter="url(#glow)">
      <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2.2s" repeatCount="indefinite" />
    </circle>
    <circle cx="135" cy="350" r="1.5" fill="#fefef9" opacity="0.5" filter="url(#glow)">
      <animate attributeName="opacity" values="0.5;0.1;0.5" dur="3s" repeatCount="indefinite" />
    </circle>
    <circle cx="265" cy="370" r="2" fill="#e5c98d" opacity="0.5" filter="url(#glow)">
      <animate attributeName="opacity" values="0.5;0.15;0.5" dur="2.7s" repeatCount="indefinite" />
    </circle>

    {/* Bodice sparkle crystals */}
    <circle cx="185" cy="160" r="1.5" fill="#fefef9" opacity="0.8" filter="url(#glow)">
      <animate attributeName="opacity" values="0.8;0.3;0.8" dur="1.5s" repeatCount="indefinite" />
    </circle>
    <circle cx="210" cy="175" r="1.5" fill="#fefef9" opacity="0.7" filter="url(#glow)">
      <animate attributeName="opacity" values="0.7;0.2;0.7" dur="2s" repeatCount="indefinite" />
    </circle>
    <circle cx="195" cy="190" r="1" fill="#d4a82a" opacity="0.6" filter="url(#glow)">
      <animate attributeName="opacity" values="0.6;0.1;0.6" dur="1.8s" repeatCount="indefinite" />
    </circle>

    {/* ---- LEGS ---- */}
    {/* Left leg */}
    <path
      d="M175 460 Q170 500 165 540 Q162 560 158 575"
      fill="none"
      stroke="url(#dressGrad)"
      strokeWidth="10"
      strokeLinecap="round"
      opacity="0.7"
    />
    {/* Left foot / shoe */}
    <ellipse cx="156" cy="578" rx="12" ry="5" fill="#d4a82a" opacity="0.8" />

    {/* Right leg */}
    <path
      d="M225 460 Q230 500 235 540 Q238 560 242 575"
      fill="none"
      stroke="url(#dressGrad)"
      strokeWidth="10"
      strokeLinecap="round"
      opacity="0.7"
    />
    {/* Right foot / shoe */}
    <ellipse cx="244" cy="578" rx="12" ry="5" fill="#d4a82a" opacity="0.8" />

    {/* ---- SHIMMER LINE ANIMATION ---- */}
    <rect x="60" y="0" width="280" height="600" fill="url(#shimmerGrad)" opacity="0.3">
      <animateTransform
        attributeName="transform"
        type="translate"
        from="-300 0"
        to="300 0"
        dur="4s"
        repeatCount="indefinite"
      />
    </rect>
  </svg>
)

const LandingPage = ({ onEnter }) => {
  const containerRef = useRef(null)
  const section1Ref = useRef(null)
  const section2Ref = useRef(null)
  const section3Ref = useRef(null)
  const section4Ref = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      /* ---- SECTION 1: Logo 4D Auto Reveal ---- */
      const tl1 = gsap.timeline({ defaults: { ease: 'power4.out' } })

      tl1
        .fromTo('.landing-logo',
          { opacity: 0, scale: 0.5, filter: 'blur(40px)', rotationY: 30 },
          { opacity: 1, scale: 1, filter: 'blur(0px)', rotationY: 0, duration: 1.6 }
        )
        .fromTo('.landing-ring',
          { opacity: 0, scale: 0.3 },
          { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' },
          '-=1.0'
        )
        .fromTo('.landing-particles span',
          { opacity: 0, scale: 0 },
          { opacity: 1, scale: 1, duration: 0.6, stagger: 0.08, ease: 'back.out(1.7)' },
          '-=0.8'
        )

      /* ---- SECTION 2: "Trajes que Transforman" + Dancer ---- */
      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: section2Ref.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      })

      tl2
        .fromTo('.dancer-container',
          { opacity: 0, x: 80, scale: 0.9 },
          { opacity: 1, x: 0, scale: 1, duration: 1.2 }
        )
        .fromTo('.dancer-title-word',
          { opacity: 0, y: 60, filter: 'blur(10px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, stagger: 0.15 },
          '-=0.8'
        )
        .fromTo('.dancer-subtitle',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.3'
        )
        .fromTo('.landing-arrow-2',
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.4 },
          '-=0.1'
        )

      /* ---- SECTION 3: Logo + Brand Statement ---- */
      const tl3 = gsap.timeline({
        scrollTrigger: {
          trigger: section3Ref.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      })

      tl3
        .fromTo('.brand-logo',
          { opacity: 0, scale: 0.6, filter: 'blur(30px)' },
          { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.2 }
        )
        .fromTo('.brand-statement',
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.5'
        )
        .fromTo('.brand-line',
          { scaleX: 0 },
          { scaleX: 1, duration: 0.6 },
          '-=0.3'
        )
        .fromTo('.landing-arrow-3',
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.4 },
          '-=0.1'
        )

      /* ---- SECTION 4: Continuar a la WEB ---- */
      const tl4 = gsap.timeline({
        scrollTrigger: {
          trigger: section4Ref.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      })

      tl4
        .fromTo('.cta-title',
          { opacity: 0, y: 60, filter: 'blur(15px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1 }
        )
        .fromTo('.cta-button',
          { opacity: 0, y: 30, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8 },
          '-=0.4'
        )
        .fromTo('.cta-hint',
          { opacity: 0 },
          { opacity: 1, duration: 0.5 },
          '-=0.2'
        )

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative bg-noir-950">

      {/* ===== SECTION 1: Logo 4D Auto Reveal ===== */}
      <section
        ref={section1Ref}
        className="relative h-screen w-full flex items-center justify-center overflow-hidden"
      >
        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(229,201,141,0.08) 0%, transparent 70%)',
          }}
        />

        {/* Decorative ring behind logo */}
        <div className="landing-ring opacity-0 absolute w-64 h-64 md:w-80 md:h-80 rounded-full border border-champagne-400/10" />
        <div className="landing-ring opacity-0 absolute w-80 h-80 md:w-[420px] md:h-[420px] rounded-full border border-champagne-400/5" />

        {/* Floating particles */}
        <div className="landing-particles absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <span
              key={i}
              className="absolute w-1 h-1 bg-champagne-400/30 rounded-full"
              style={{
                left: `${10 + (i * 7.5)}%`,
                top: `${15 + ((i * 13) % 70)}%`,
                animation: `landingFloat ${3 + (i % 4) * 0.5}s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 flex flex-col items-center text-center px-6">
          {/* Logo */}
          <div className="landing-logo opacity-0">
            <Logo size="hero" />
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: "Trajes que Transforman" + Dancer ===== */}
      <section
        ref={section2Ref}
        className="relative h-screen w-full flex items-center overflow-hidden"
      >
        {/* Background radial */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 30% 50%, rgba(229,201,141,0.05) 0%, transparent 60%)',
          }}
        />

        <div className="relative z-10 w-full max-w-7xl mx-auto section-padding flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left — Dancer Illustration */}
          <div className="dancer-container opacity-0 flex-1 flex justify-center lg:justify-end">
            <div className="relative w-56 h-80 md:w-72 md:h-[420px] lg:w-80 lg:h-[500px]">
              <DancerSVG />
              {/* Floating particles around dancer */}
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-champagne-400/50 rounded-full"
                  style={{
                    left: `${15 + i * 15}%`,
                    top: `${20 + i * 10}%`,
                    animation: `landingFloat ${3 + i * 0.4}s ease-in-out infinite`,
                    animationDelay: `${i * 0.3}s`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Right — Text */}
          <div className="flex-1 text-center lg:text-left">
            <h2 className="font-display text-hero leading-none mb-6">
              <span className="block dancer-title-word opacity-0 text-ivory-100 tracking-wide">Trajes que</span>
              <span className="block dancer-title-word opacity-0 text-champagne-400 italic font-light">Transforman</span>
            </h2>
            <p className="dancer-subtitle opacity-0 max-w-md mx-auto lg:mx-0 text-noir-300 text-base md:text-lg leading-relaxed mb-4">
              Cada traje es una obra de arte confeccionada a mano.
              Cristales, bordados y telas premium se unen para crear
              piezas que hacen brillar a cada bailarina en el escenario.
            </p>
            <p className="dancer-subtitle opacity-0 max-w-md mx-auto lg:mx-0 text-noir-400 text-sm tracking-wide">
              Diseño exclusivo &middot; Confección artesanal &middot; Materiales premium
            </p>
          </div>
        </div>

        {/* Scroll arrow */}
        <div className="landing-arrow-2 opacity-0 absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-noir-500 text-[10px] tracking-[0.25em] uppercase">Scroll</span>
          <ArrowDown size={14} className="text-champagne-400/60" style={{ animation: 'landingBounce 2s infinite' }} />
        </div>
      </section>

      {/* ===== SECTION 3: Logo + Brand Statement ===== */}
      <section
        ref={section3Ref}
        className="relative h-screen w-full flex items-center justify-center overflow-hidden"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(212,168,42,0.04) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 flex flex-col items-center text-center px-6">
          {/* Logo large */}
          <div className="brand-logo opacity-0 mb-10">
            <Logo size="hero" />
          </div>

          {/* Divider */}
          <div className="brand-line w-32 h-px bg-gradient-to-r from-transparent via-champagne-400 to-transparent mb-8 origin-center" />

          {/* Brand statement */}
          <p className="brand-statement opacity-0 font-display text-display text-ivory-100 max-w-2xl leading-snug mb-4">
            <span className="italic text-champagne-400 font-light">Donde el arte</span>{' '}
            se encuentra con la elegancia
          </p>
          <p className="brand-statement opacity-0 font-sans text-sm md:text-base text-noir-400 max-w-lg leading-relaxed">
            Fundada por bailarinas profesionales que entienden
            la necesidad de trajes que no solo se vean increíbles,
            sino que se sientan como una segunda piel.
          </p>
        </div>

        {/* Scroll arrow */}
        <div className="landing-arrow-3 opacity-0 absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-noir-500 text-[10px] tracking-[0.25em] uppercase">Scroll</span>
          <ArrowDown size={14} className="text-champagne-400/60" style={{ animation: 'landingBounce 2s infinite' }} />
        </div>
      </section>

      {/* ===== SECTION 4: Continuar a la WEB ===== */}
      <section
        ref={section4Ref}
        className="relative h-screen w-full flex items-center justify-center overflow-hidden"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(229,201,141,0.08) 0%, transparent 60%)',
          }}
        />

        <div className="relative z-10 flex flex-col items-center text-center px-6">
          <h2 className="cta-title opacity-0 font-display text-display text-ivory-100 mb-12 max-w-xl">
            <span className="italic text-champagne-400 font-light">Descubre</span>{' '}
            nuestra colección
          </h2>

          {/* CTA Button */}
          <button
            onClick={onEnter}
            className="cta-button opacity-0 group relative inline-flex items-center gap-4 px-10 py-5
                       text-sm tracking-[0.2em] uppercase font-sans font-medium
                       text-noir-950 bg-champagne-400
                       hover:bg-gold-400 transition-all duration-500
                       shadow-lg shadow-champagne-400/20 hover:shadow-champagne-400/40
                       focus:outline-none focus:ring-2 focus:ring-champagne-400 focus:ring-offset-2 focus:ring-offset-noir-950
                       cursor-pointer"
          >
            <span>Continuar a la Web</span>
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>

          <p className="cta-hint opacity-0 mt-6 font-sans text-xs text-noir-500 tracking-wide">
            Explora trajes, accesorios y más
          </p>
        </div>
      </section>

      {/* Global keyframes for landing animations */}
      <style>{`
        @keyframes landingBounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(8px); }
          60% { transform: translateY(4px); }
        }
        @keyframes landingFloat {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.5; }
          50% { transform: translateY(-18px) translateX(8px); opacity: 1; }
        }
      `}</style>
    </div>
  )
}

export default LandingPage
