import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Creates a GSAP context with automatic cleanup to prevent memory leaks.
 * This follows the best practice recommended by GSAP documentation.
 * 
 * @param {Function} callback - Function that receives (ctx, gsap, ScrollTrigger)
 * @param {HTMLElement|NodeList|Element|string} scope - Element(s) to scope animations to
 * @returns {gsap.Context} The GSAP context instance
 * 
 * @example
 * // In a React component:
 * useEffect(() => {
 *   const ctx = createGSAPContext((ctx, gsap, ScrollTrigger) => {
 *     gsap.from('.element', { opacity: 0, scrollTrigger: { trigger: '.element' } })
 *   }, containerRef)
 *   return () => ctx.revert()
 * }, [])
 */
export function createGSAPContext(callback, scope) {
  const ctx = gsap.context(callback, scope)
  
  return {
    ...ctx,
    /**
     * Reverts all animations and clears the context.
     * Call this in the component's cleanup function (useEffect return).
     */
    revert: () => {
      ctx.revert()
      // Clear any associated ScrollTriggers for this context
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.scope === scope) {
          st.kill()
        }
      })
    },
    
    /**
     * Refreshes all ScrollTriggers in this context.
     * Useful after DOM changes or content loading.
     */
    refresh: () => {
      ScrollTrigger.refresh()
    },
  }
}

/**
 * Hook-friendly wrapper for GSAP context in React components.
 * Handles automatic cleanup on unmount.
 * 
 * @param {Function} callback - Animation setup function
 * @param {React.RefObject} scopeRef - React ref for the scope element
 * @returns {gsap.Context|null} The context instance or null during initial render
 */
export function useGSAPContext(callback, scopeRef) {
  const { useEffect, useRef } = require('react')
  const contextRef = useRef(null)

  useEffect(() => {
    if (!scopeRef?.current) return

    contextRef.current = createGSAPContext(callback, scopeRef.current)

    return () => {
      if (contextRef.current) {
        contextRef.current.revert()
      }
    }
  }, [callback, scopeRef])

  return contextRef.current
}

export default createGSAPContext
