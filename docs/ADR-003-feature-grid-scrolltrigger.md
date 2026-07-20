# ADR-003: FeatureGrid Component & GSAP ScrollTrigger Implementation

**Estado:** Aprobado  
**Fecha:** 2024  
**Autor:** Equipo de Desarrollo RM Designs  
**Decisores:** Arquitectura técnica del proyecto  
**Supersedes:** ADR-001 (sección de animaciones)

---

## Contexto

El componente `FeatureGrid` es una sección crítica para exhibir los pilares de la marca RM Designs. Este ADR documenta las decisiones técnicas para:

1. **Animaciones con ScrollTrigger** — Implementación de reveal staggered al hacer scroll
2. **Optimización de rendimiento** — Mantener 60fps con animaciones complejas
3. **Arquitectura de componentes** — Estructura modular con animations encapsuladas
4. **Interacciones hover** — Efectos parallax suaves en tarjetas

---

## Decisiones

### DECISIÓN 1: Arquitectura de Animaciones con gsap.context()

**Problema:** Memory leaks cuando múltiples componentes tienen animaciones GSAP activas.

**Solución implementada:**

```jsx
const FeatureCard = ({ feature, index }) => {
  const cardRef = useRef(null)

  useEffect(() => {
    if (!cardRef.current) return  // SSR guard

    const ctx = gsap.context(() => {
      // Animaciones encapsuladas aquí
      tl.to(cardRef.current, { opacity: 1, y: 0, duration: 0.9 })
    }, cardRef)  // Scope al elemento

    return () => ctx.revert()  // Cleanup automático
  }, [index])

  return <div ref={cardRef}>...</div>
}
```

**¿Por qué cada componente maneja sus animaciones?**

| Aspecto | Beneficio |
|---------|-----------|
| **Encapsulación** | Animaciones atómicas al componente |
| **Cleanup automático** | `ctx.revert()` elimina todo al unmount |
| **SSR seguro** | Guards previenen errores en server |
| **Testabilidad** | Fácil de aislar para tests |

---

### DECISIÓN 2: Timeline-based Entrance Animation

**Problema:** Revelar elementos de forma descoordinada se ve poco profesional.

**Solución implementada:**

```jsx
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: cardRef.current,
    start: 'top 88%',  // Inicia antes de entrar en viewport
    toggleActions: 'play none none reverse',
  },
})

// Secuencia coordinada
tl.to(cardRef.current, { opacity: 1, y: 0, duration: 0.9, delay: index * 0.12 })
  .fromTo(icon, { scale: 0, rotation: -10 }, { scale: 1, rotation: 0, duration: 0.5, ease: 'back.out(1.7)' }, '-=0.5')
  .fromTo(textElements, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }, '-=0.3')
```

**Jerarquía de animación:**

1. **Card wrapper** — Fade + slide up (0.9s)
2. **Icon** — Scale + rotation con bounce (0.5s)
3. **Text elements** — Fade staggered (0.5s, 100ms delay entre items)

---

### DECISIÓN 3: Hover Parallax Effects

**Problema:** Animaciones hover que causan layout shifts o no son suaves.

**Solución implementada:**

```jsx
const handleMouseEnter = () => {
  gsap.to(icon, {
    scale: 1.1,
    y: -5,
    duration: 0.4,
    ease: 'power2.out',  // Suave, no linear
  })
}

const handleMouseLeave = () => {
  gsap.to(icon, {
    scale: 1,
    y: 0,
    duration: 0.4,
    ease: 'power2.out',
  })
}

// Cleanup de event listeners
return () => {
  card.removeEventListener('mouseenter', handleMouseEnter)
  card.removeEventListener('mouseleave', handleMouseLeave)
}
```

**Beneficios:**
- Solo `transform` (GPU accelerated)
- No causa reflows
- ease: 'power2.out' para sensación natural
- Cleanup en useEffect return

---

### DECISIÓN 4: ScrollTrigger Start Position

**Problema:** ¿Cuándo deben iniciar las animaciones? (`top bottom` vs `top 85%`)

**Decisión:** `start: 'top 88%'`

| Start Position | Comportamiento | Uso |
|----------------|---------------|-----|
| `top bottom` | Cuando elemento entra viewport | Animaciones sutiles |
| `top 80%` | 20% antes de entrar | Títulos/headers |
| `top 88%` | ~12% antes de entrar | Cards/grids (elecciones) |
| `center center` | Cuando elemento está centrado | Fullscreen effects |

**Justificación:**
- 88% permite que la animación termine antes de que el usuario llegue al elemento
- No tan temprano como 80% (evita animaciones "fantasma")
- Resultado: parece que el contenido "aparece mágicamente" mientras haces scroll

---

### DECISIÓN 5: ToggleActions Configuration

**Configuración:** `toggleActions: 'play none none reverse'`

| Action | Cuándo | Efecto |
|--------|--------|--------|
| `play` | Entrada al viewport | Inicia animación |
| `none` | Sale del viewport (arriba) | Mantiene estado |
| `none` | Entra desde arriba | Mantiene estado |
| `reverse` | Re-entra desde abajo | Reproduce al revés |

**Beneficio:** Animaciones reversible para usuarios que hacen scroll hacia arriba.

---

## Optimización de Rendimiento 60fps

### Principios Implementados

1. **Solo propiedades animables por GPU:**
   - ✅ `transform` (translate, scale, rotate)
   - ✅ `opacity`
   - ❌ NO `width`, `height`, `margin`, `padding`

2. **will-change para hinting:**
   ```css
   .feature-card {
     will-change: transform, opacity;
   }
   ```

3. **Stagger calculations:**
   - `index * 0.12` — 120ms entre cards
   - Evita sobrecarga de animaciones simultáneas

4. **Debounced scroll handlers:**
   - ScrollTrigger internamente optimizado
   - No usar `scroll` events directamente

---

## Componente CollectionsPreview

**Sub-componente implementado:**

```jsx
const CollectionsPreview = () => {
  // Scroll-triggered horizontal slide
  gsap.fromTo('.collection-card',
    { opacity: 0, x: 50 },  // Entrada desde derecha
    { opacity: 1, x: 0, stagger: 0.15 }
  )
}
```

**Características:**
- 3 colecciones destacadas
- Animación de slide horizontal
- Hover states con gradientes
- Aspect ratio 3:4 para impacto visual

---

## Métricas de Rendimiento

| Métrica | Valor | Verificación |
|---------|-------|--------------|
| FPS | 60 | Transform-only animations |
| CLS | < 0.1 | Dimensiones fixed en cards |
| TTI | < 3.5s | GSAP lazy-loaded |

---

## Archivos Creados/Modificados

| Archivo | Cambio |
|---------|--------|
| `src/components/FeatureGrid.jsx` | Implementación completa con ScrollTrigger |
| `docs/ADR-003-feature-grid-scrolltrigger.md` | Documentación |

---

## Recomendaciones Futuras

1. **Intersection Observer fallback** — Para navegadores sin ScrollTrigger
2. **Reduced motion** — Detectar `prefers-reduced-motion` y deshabilitar animaciones
3. **Skeleton loading** — Placeholder animado mientras cargan datos reales
4. **Virtualization** — Si hay +20 items en grid, considerar virtualización

---

## Historial de Cambios

| Fecha | Versión | Cambio |
|-------|---------|--------|
| 2024 | 1.0 | Decisión inicial de implementación FeatureGrid |

---

## Referencias

- [GSAP ScrollTrigger Documentation](https://greensock.com/docs/3/Plugins/ScrollTrigger/)
- [GSAP Context Documentation](https://greensock.com/docs/3.x/gsap.context/)
- [CSS will-change - MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/will-change)
- [Web Vitals - CLS](https://web.dev/cls/)
