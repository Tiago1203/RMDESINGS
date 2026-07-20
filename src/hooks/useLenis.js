import { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * useLenis Hook
 * 
 * Provides smooth scrolling using Lenis with GSAP ScrollTrigger integration.
 * This creates an immersive, fluid scrolling experience similar to award-winning sites.
 * 
 * Features:
 * - Smooth inertia-based scrolling
 * - GSAP ScrollTrigger sync
 * - RAF (requestAnimationFrame) optimized
 * - Auto-stop when tab is inactive for performance
 */
export const useLenis = () => {
  const lenisRef = useRef(null)

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,          // Smooth easing duration
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing
      orientation: 'vertical', // Vertical scroll
      gestureOrientation: 'vertical',
      smoothWheel: true,       // Smooth wheel scrolling
      wheelMultiplier: 1,      // Wheel sensitivity
      touchMultiplier: 2,      // Touch sensitivity
      infinite: false,         // No infinite scroll
    })

    lenisRef.current = lenis

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // GSAP ticker for RAF synchronization
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    // Prevent GSAP from using its own RAF
    gsap.ticker.lagSmoothing(0)

    // Cleanup function
    return () => {
      lenis.destroy()
      gsap.ticker.remove((time) => lenis.raf(time * 1000))
    }
  }, [])

  return lenisRef
}

/**
 * ScrollTo Function
 * 
 * Smooth scroll to a specific element or position
 */
export const scrollTo = (target, options = {}) => {
  if (!target) return

  if (typeof target === 'string') {
    // CSS selector
    document.querySelector(target)?.scrollIntoView({
      behavior: 'smooth',
      ...options,
    })
  } else if (target instanceof Element) {
    target.scrollIntoView({
      behavior: 'smooth',
      ...options,
    })
  } else if (typeof target === 'number') {
    // Scroll to position
    window.scrollTo({
      top: target,
      behavior: 'smooth',
      ...options,
    })
  }
}

export default useLenis
