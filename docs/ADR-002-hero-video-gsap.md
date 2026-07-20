# ADR-002: Hero Video Optimization & GSAP Animation Implementation

**Estado:** Aprobado  
**Fecha:** 2024  
**Autor:** Equipo de Desarrollo RM Designs  
**Decisores:** Arquitectura técnica del proyecto  
**Supersedes:** ADR-001 (sección de estrategia de video)

---

## Contexto

El componente Hero es el punto de entrada visual crítico para RM Designs. Este ADR documenta las decisiones técnicas para:

1. **Optimización de video** — LCP (Largest Contentful Paint) óptimo y soporte mobile
2. **Animaciones GSAP** — Implementación con 60fps y gestión de memoria correcta
3. **Accesibilidad** — Soporte para lectores de pantalla y navegación por teclado

---

## Decisiones

### DECISIÓN 1: Estrategia de Carga de Video

**Problema:** Los videos pueden impactar negativamente el LCP y el rendimiento general en dispositivos móviles.

**Solución implementada:**

```jsx
// 1. Poster image como fallback inmediato
<div style={{ backgroundImage: 'url(/assets/hero-poster.jpg)' }} />

// 2. Video con carga diferida
<video
  preload="metadata"  // Solo carga metadatos inicialmente
  poster="/assets/hero-poster.jpg"
  autoPlay
  muted
  loop
  playsInline  // Crítico para iOS
>
  <source src="/assets/hero-video.mp4" type="video/mp4" />
  <source src="/assets/hero-video.webm" type="video/webm" />
</video>
```

**Justificación técnica:**

| Atributo | Propósito | Impacto en LCP |
|----------|-----------|----------------|
| `poster` | Imagen estática visible inmediatamente | ✅ Positivo |
| `preload="metadata"` | Carga solo info del video | ✅ Positivo |
| `autoPlay` | Inicia reproducción automáticamente | ⚠️ Requiere muted |
| `muted` | Permite autoplay en móviles | ✅ Requerido |
| `loop` | Reproducción continua | ✅ UX mejorada |
| `playsInline` | Evita fullscreen en iOS | ✅ Crítico mobile |

**Consecuencias:**
- Positivas: LCP < 2.5s, fallback robusto, mobile-first
- Negativas: Video solo carga después de metadatos

---

### DECISIÓN 2: Transición Poster → Video

**Problema:** Transición abrupta entre poster y video puede ser visualmente disruptiva.

**Solución implementada:**

```jsx
const [isVideoLoaded, setIsVideoLoaded] = useState(false)

const handleVideoCanPlay = () => {
  setIsVideoLoaded(true)
  gsap.to('.hero-video', { opacity: 1, duration: 0.5 })
}

// Poster se desvanece cuando video carga
<div className={isVideoLoaded ? 'opacity-0' : 'opacity-100'} />
```

**Justificación:**
- Transición suave de 500ms con GSAP
- No hay "flash" entre imagen y video
- Fallback si video no puede cargarse

---

### DECISIÓN 3: Animaciones GSAP con gsap.context()

**Problema:** Memory leaks en animaciones React sin cleanup adecuado.

**Solución implementada:**

```jsx
useEffect(() => {
  if (!containerRef.current) return  // SSR guard

  const ctx = gsap.context(() => {
    // Timeline principal con secuencia coordinada
    const tl = gsap.timeline({ 
      defaults: { ease: 'power3.out' },
      delay: 0.2
    })

    tl.fromTo('.hero-badge', { opacity: 0, y: 30 }, ...)
    tl.fromTo('.hero-title', { opacity: 0, y: 80, skewY: 4 }, ...)
    // ... más animaciones

    // Parallax con ScrollTrigger
    gsap.to('.hero-video', {
      yPercent: 25,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    })
  }, containerRef)  // Scope al container

  return () => ctx.revert()  // Cleanup crítico
}, [])
```

**¿Por qué gsap.context()?:**

| Aspecto | Beneficio |
|---------|-----------|
| **Scope automático** | Animaciones vinculadas al componente |
| **Cleanup automático** | `ctx.revert()` limpia todo |
| **Reusabilidad** | Fácil de copiar entre componentes |
| **Testabilidad** | Contexto aislable para tests |

---

### DECISIÓN 4: Optimización de Rendimiento 60fps

**Principios implementados:**

1. **Solo transforms y opacity** — No animar `width`, `height`, `top`, `left`
2. **GPU acceleration** — Usar `transform: translate3d()` implícito
3. **will-change** — Aplicado implícitamente por GSAP
4. ** scrub suave** — `scrub: 1` para transiciones naturales

```jsx
// ❌ Incorrecto - causa reflow
gsap.to(element, { width: '100%', duration: 1 })

// ✅ Correcto - GPU accelerated
gsap.to(element, { x: '100%', duration: 1 })
```

**Métricas objetivo:**

| Métrica | Valor | Implementación |
|---------|-------|----------------|
| FPS | 60 | Transforms only, no reflows |
| CLS | < 0.1 | Dimensiones fijas en video/poster |
| FID | < 100ms | Código minimal, sin blocking |

---

### DECISIÓN 5: Accesibilidad

**Implementaciones:**

```jsx
// Roles semánticos
<section role="banner" aria-label="Hero section - RM Designs">
<nav role="navigation" aria-label="Main navigation">

// Elementos decorativos ocultos
<div aria-hidden="true" />

// Focus visible en interactive elements
<button className="focus:ring-2 focus:ring-champagne-400">

// Skip to content (recomendado para siguiente iteración)
// <a href="#main-content" className="sr-only">
```

**Justificación:**
- WCAG 2.1 AA compliance
- Navegación por teclado funcional
- Screen reader friendly

---

## Componente Hero - Arquitectura

```
Hero.jsx
├── Video Layer
│   ├── Poster Image (LCP optimization)
│   ├── Video Element (progressive loading)
│   └── Overlays (depth effects)
├── Navigation
│   ├── Logo
│   ├── Nav Links
│   └── Mobile Menu
├── Content
│   ├── Badge
│   ├── Title (Cormorant Garamond)
│   ├── Subtitle
│   └── CTA Button
├── Indicators
│   ├── Scroll Indicator
│   └── Social Links
└── Animations
    ├── GSAP Timeline (entrance)
    ├── ScrollTrigger (parallax)
    └── Floating elements
```

---

## Archivos Creados/Modificados

| Archivo | Cambio |
|---------|--------|
| `src/components/Hero.jsx` | Creado con video + GSAP |
| `docs/ADR-002-hero-video-gsap.md` | Documentación de decisiones |

---

## Recomendaciones Futuras

1. **Video CDN** — Servir video desde CDN (CloudFront, Vercel Blob)
2. **Next-Gen formats** — AV1 para mejor compresión
3. **Intersection Observer** — Pausar video fuera de viewport
4. **Skip Link** — Añadir "Skip to content" para accesibilidad
5. **Preconnect** — `<link rel="preconnect">` para assets de video

---

## Historial de Cambios

| Fecha | Versión | Cambio |
|-------|---------|--------|
| 2024 | 1.0 | Decisión inicial de implementación Hero |

---

## Referencias

- [GSAP Context Documentation](https://greensock.com/docs/3.x/gsap.context())
- [Video Accessibility - MDN](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Video_and_audio_content)
- [Web Vitals - LCP](https://web.dev/lcp/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
