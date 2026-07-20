import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

/**
 * Logo Component
 * 
 * Brand logo for "RM Designs by Renata Real" featuring:
 * - Elegant monogram with crown element
 * - Silhouette-inspired design
 * - Gold/champagne accents on deep black
 */

const Logo = ({ className = '', size = 'default', animated = true }) => {
  const logoRef = useRef(null)
  const crownRef = useRef(null)
  const monogramRef = useRef(null)

  // Size variants
  const sizeClasses = {
    small: 'h-8',
    default: 'h-10',
    large: 'h-14',
    hero: 'h-16 md:h-20',
  }

  useEffect(() => {
    if (!animated || !logoRef.current) return

    const ctx = gsap.context(() => {
      // Logo entrance animation
      const tl = gsap.timeline({ delay: 0.5 })

      tl.fromTo(monogramRef.current,
        { opacity: 0, y: -10, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out' }
      )
      .fromTo(crownRef.current,
        { opacity: 0, y: -5 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.6'
      )
    }, logoRef)

    return () => ctx.revert()
  }, [animated])

  return (
    <div 
      ref={logoRef}
      className={`relative inline-flex items-center justify-center ${className}`}
      role="img"
      aria-label="RM Designs - Logo"
    >
      <svg
        viewBox="0 0 200 60"
        className={`${sizeClasses[size]} w-auto`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Crown element */}
        <g ref={crownRef} className="origin-center">
          {/* Crown base */}
          <path
            d="M45 18 L50 8 L55 18"
            stroke="url(#crownGradient)"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Crown points */}
          <circle cx="50" cy="6" r="2" fill="url(#crownGradient)" />
          <circle cx="43" cy="16" r="1.5" fill="url(#crownGradient)" />
          <circle cx="57" cy="16" r="1.5" fill="url(#crownGradient)" />
        </g>

        {/* Monogram "RM" */}
        <g ref={monogramRef}>
          {/* R letter */}
          <path
            d="M20 25 L20 45 M20 25 C20 22 22 20 26 20 C30 20 32 22 32 25 C32 28 30 29 28 30 L32 45"
            stroke="url(#monogramGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          
          {/* M letter */}
          <path
            d="M40 45 L40 25 L50 38 L60 25 L60 45 M40 25 L60 25"
            stroke="url(#monogramGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* Elegant dot after RM */}
          <circle cx="68" cy="32" r="2.5" fill="url(#monogramGradient)" />
        </g>

        {/* Brand name "by Renata Real" */}
        <text
          x="80"
          y="28"
          className="font-sans text-[8px] md:text-[10px] tracking-[0.25em] uppercase fill-champagne-400/80"
          style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400 }}
        >
          by Renata Real
        </text>

        {/* Decorative line */}
        <line
          x1="80"
          y1="34"
          x2="150"
          y2="34"
          stroke="url(#lineGradient)"
          strokeWidth="0.5"
          strokeLinecap="round"
        />

        {/* Tagline */}
        <text
          x="80"
          y="42"
          className="font-sans text-[6px] md:text-[7px] tracking-[0.15em] uppercase fill-noir-500"
          style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}
        >
          Alta Costura Premium
        </text>

        {/* Gradients */}
        <defs>
          <linearGradient id="crownGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e5c98d" />
            <stop offset="50%" stopColor="#edc54a" />
            <stop offset="100%" stopColor="#d4a82a" />
          </linearGradient>
          
          <linearGradient id="monogramGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fefef9" />
            <stop offset="100%" stopColor="#e5c98d" />
          </linearGradient>
          
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e5c98d" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#e5c98d" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

export default Logo
