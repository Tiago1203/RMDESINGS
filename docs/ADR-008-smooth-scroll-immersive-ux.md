# ADR-008: Smooth Scroll & Immersive UX Implementation

**Estado:** Aprobado  
**Fecha:** 2024  
**Autor:** Equipo de Desarrollo RM Designs  
**Decisores:** Arquitectura técnica del proyecto

---

## Contexto

Este ADR documenta la implementación de scroll suave (smooth scrolling) y efectos inmersivos para crear una experiencia de usuario premium al nivel de sitios winners de Awwwards. El objetivo es eliminar el scroll nativo rígido del navegador y reemplazarlo con un sistema de desplazamiento por inercia fluido.

---

## Decisiones Técnicas

### DECISIÓN 1: Librería de Smooth Scroll - Lenis

**Alternativas evaluadas:**

| Librería | Pros | Contras |
|----------|------|---------|
| Lenis | Moderno, ligero, GSAP integrado | Dependencia externa |
| GSAP ScrollSmoother | Nativo GSAP, excelente | Requiere licencia para producción |
| Native CSS smooth | Sin dependencias | Soporte limitado, no configurable |
| Locomotive Scroll | Efectos únicos | bundle grande, mantenimiento bajo |

**Decisión:** Usar **Lenis** (@studio-freight/lenis)

**Justificación:**
- Bundle ligero (~2KB gzipped)
- Integración nativa con GSAP ScrollTrigger
- API simple y documentada
- Mantenimiento activo
- Exposición de RAF para control total

---

### DECISIÓN 2: Configuración de Lenis

```javascript
const lenis = new Lenis({
  duration: 1.2,           // Duración del easing (ms)
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing exponencial
  orientation: 'vertical', // Scroll vertical
  gestureOrientation: 'vertical',
  smoothWheel: true,        // Scroll suave con rueda
  wheelMultiplier: 1,       // Sensibilidad del scroll
  touchMultiplier: 2,      // Sensibilidad táctil
  infinite: false,         // Sin scroll infinito
})
```

**Parámetros clave:**

| Parámetro | Valor | Efecto |
|-----------|-------|--------|
| `duration` | 1.2 | Tiempo de deceleración (ms) |
| `easing` | Exponential | Movimiento natural tipo física |
| `wheelMultiplier` | 1 | Sin amplificación |
| `touchMultiplier` | 2 | Touch más sensible |

---

### DECISIÓN 3: Integración con GSAP

**Problema:** GSAP ScrollTrigger detecta el scroll nativo, no el de Lenis.

**Solución:**

```javascript
// Conectar Lenis con ScrollTrigger
lenis.on('scroll', ScrollTrigger.update)

// Sincronizar con RAF de GSAP
gsap.ticker.add((time) => {
  lenis.raf(time * 1000)
})

// Prevenir lag smoothing de GSAP
gsap.ticker.lagSmoothing(0)
```

**Flujo:**
```
Scroll Event → Lenis RAF → GSAP Ticker → ScrollTrigger Update
```

---

### DECISIÓN 4: Optimización 60fps

**Principio:** Solo usar propiedades aceleradas por GPU.

**Propiedades GPU-accelerated:**
```css
transform: translateX() | translateY() | scale() | rotate() | skewX()
opacity
filter (blur, saturate, etc.)
```

**NO usar:**
```css
/* Evitar estas propiedades en animaciones */
width, height, margin, padding, left, top, font-size
```

**Utilidades CSS añadidas:**

```css
.gpu-accelerated {
  transform: translateZ(0);
  will-change: transform;
  backface-visibility: hidden;
}

.animate-60fps {
  transform: translate3d(0, 0, 0);
  perspective: 1000px;
  backface-visibility: hidden;
}
```

---

### DECISIÓN 5: Deshabilitar Scroll Nativo

**Problema:** El scroll nativo compite con Lenis.

**Solución:**

```css
html {
  scroll-behavior: auto !important;
}
```

```javascript
// En App.jsx
const lenis = new Lenis({ smoothWheel: true })
```

---

## Arquitectura de Archivos

```
src/
├── hooks/
│   └── useLenis.js        # Hook personalizado para Lenis
├── utils/
│   └── smoothScroll.js    # Utilidades de animación GSAP
├── App.jsx                # Integración principal
└── index.css              # Estilos de scroll y GPU hints
```

### useLenis.js
```javascript
export const useLenis = () => {
  useEffect(() => {
    const lenis = new Lenis({ ... })
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    return () => lenis.destroy()
  }, [])
}
```

### smoothScroll.js
```javascript
// Utilidades para animaciones 60fps
export const createParallax = (element, options) => { ... }
export const createFadeIn = (element, options) => { ... }
export const createStaggerReveal = (elements, options) => { ... }
export const createSlideIn = (element, options) => { ... }
```

---

## Mejoras en UX

### Antes (Scroll nativo)
- Movimiento brusco
- Sin inercia
- Sin control de velocidad
- Animaciones desincronizadas

### Después (Lenis)
- Desplazamiento sedoso
- Inercia natural
- Control de easing
- Animaciones sincronizadas
- Sensación premium

---

## Rendimiento

### Lighthouse Metrics Esperados

| Métrica | Antes | Después | Objetivo |
|---------|-------|---------|----------|
| CLS | < 0.1 | < 0.05 | ✅ |
| FID | < 100ms | < 50ms | ✅ |
| TTI | < 3.5s | < 3s | ✅ |

### Bundle Impact

| Dependencia | Tamaño |
|------------|--------|
| Lenis | ~2KB gzipped |
| Total JS | +2KB |

---

## Compatibilidad

| Navegador | Soporte |
|-----------|---------|
| Chrome 90+ | ✅ |
| Firefox 90+ | ✅ |
| Safari 14+ | ✅ |
| Edge 90+ | ✅ |
| iOS Safari 14+ | ✅ |

---

## Troubleshooting

### Scroll no funciona
```javascript
// Verificar que Lenis está inicializado
if (lenisRef.current) {
  lenisRef.current.scrollTo(0)
}
```

### Animaciones con lag
```javascript
// Deshabilitar lag smoothing
gsap.ticker.lagSmoothing(0)
```

### Scroll position incorrecta
```javascript
// ScrollTrigger.refresh() después de cambios de layout
ScrollTrigger.refresh()
```

---

## Recomendaciones Futuras

1. **Page Transitions** — Transiciones fluidas entre páginas
2. **Cursor personalizado** — Cursor que sigue el mouse con física
3. **Scroll progress bar** — Barra de progreso animada
4. **Parallax sections** — Capas con velocidades diferentes

---

## Archivos Creados/Modificados

| Archivo | Cambio |
|---------|--------|
| `src/hooks/useLenis.js` | **NEW** - Hook de Lenis |
| `src/utils/smoothScroll.js` | **NEW** - Utilidades de animación |
| `src/App.jsx` | **Updated** - Integración de Lenis |
| `src/index.css` | **Updated** - Scroll styles + GPU hints |
| `package.json` | **Updated** - Dependencia Lenis |
| `docs/ADR-008-*.md` | **NEW** - Documentación |

---

## Historial de Cambios

| Fecha | Versión | Cambio |
|-------|---------|--------|
| 2024 | 1.0 | Decisión inicial de smooth scroll |

---

## Referencias

- [Lenis Documentation](https://lenis.studiofreight.com/)
- [GSAP ScrollTrigger](https://greensock.com/docs/3/Plugins/ScrollTrigger/)
- [GPU-Accelerated Animations](https://www.html5rocks.com/en/tutorials/speed/html5-videos/)
- [60fps Animations Best Practices](https://developers.google.com/web/fundamentals/performance/rendering)
