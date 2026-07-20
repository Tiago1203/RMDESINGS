# ADR-001: Arquitectura y Stack Tecnológico

**Estado:** Aprobado  
**Fecha:** 2024  
**Autor:** Equipo de Desarrollo RM Designs  
**Decisores:** Arquitectura técnica del proyecto

---

## Contexto

RM Designs requiere una plataforma web e-commerce/exhibition de alta costura que transmita elegancia exclusiva y calidad artesanal. El proyecto demanda:

1. **Rendimiento óptimo** — Animaciones fluidas a 60fps
2. **Experiencia premium** — Estética minimalista de alto nivel (high-ticket)
3. **Tiempo de carga reducido** — LCP (Largest Contentful Paint) optimizado
4. **Escalabilidad futura** — Estructura modular para crecimiento del proyecto

---

## Decisiones

### DECISIÓN 1: React + Vite como Framework Principal

**Opción elegida:** React 18.3 con Vite 6.0

**Alternativas consideradas:**
- Next.js — Mayor complejidad, Server-Side Rendering excesivo para proyecto estático
- Gatsby — Curva de aprendizaje más pronunciada, menor flexibilidad
- Create React App — Deprecado, build más lento

**Justificación:**
- **HMR ultra-rápido** — Vite ofrece tiempos de respuesta instantáneos durante desarrollo
- **Build optimizado** — Rollup genera bundles altamente optimizados para producción
- **Ecosistema maduro** — React tiene la mayor comunidad y documentación
- **Compatibilidad** — Funciona excelentemente con GSAP y animaciones complejas
- **Simplicidad** — Sin la complejidad innecesaria de frameworks full-stack

**Consecuencias:**
- Positivas: Desarrollo rápido, DX excelente, bundle size reducido
- Negativas: Requiere configuración manual para SSR (no necesario en este caso)

---

### DECISIÓN 2: Tailwind CSS para Estilos

**Opción elegida:** Tailwind CSS 3.4

**Alternativas consideradas:**
- CSS Modules — Mayor boilerplate, menos consistente entre componentes
- Styled Components — Runtime overhead, curva de aprendizaje
- CSS-in-JS genérico — Rendimiento inferior en animaciones GSAP

**Justificación:**
- **Desarrollo rápido** — Clases utilitarias aceleran la implementación de diseño
- **Consistencia** — Sistema de diseño centralizado en `tailwind.config.js`
- **Purging automático** — Elimina CSS no utilizado, reduce bundle size drásticamente
- **Customización extrema** — Paletas y tipografías exactamente según especificaciones
- **Compatibilidad GSAP** — Selectores CSS simples funcionan perfectamente con animaciones

**Consecuencias:**
- Positivas: Estilos consistentes, mantenimiento sencillo, bundle optimizado
- Negativas: HTML puede volverse verboso con muchas clases (mitigado con componentes)

---

### DECISIÓN 3: GSAP para Animaciones

**Opción elegida:** GSAP 3.12 con ScrollTrigger

**Alternativas consideradas:**
- Framer Motion — Excelente para React, pero menos control granular
- CSS Animations — Limitado para animaciones scroll-triggered complejas
- Motion One — Más ligero, pero ecosistema menor

**Justificación:**
- **Rendimiento de referencia** — GSAP es el estándar de la industria para animaciones premium
- **ScrollTrigger** — Control preciso de animaciones basadas en scroll (crítico para storytelling)
- **Flexibilidad** — Total control sobre timing, easing y sequences
- **Compatibilidad** — Funciona con cualquier DOM, no hay dependencias de framework
- **Debugging** — Herramientas de desarrollo excelentes para timeline debugging

**Consecuencias:**
- Positivas: Animaciones suaves a 60fps, control total, amplia documentación
- Negativas: Curva de aprendizaje para animaciones avanzadas

---

### DECISIÓN 4: Estrategia de Carga Asíncrona de Videos

**Problema:** Los videos pueden impactar negativamente el LCP si se cargan sin estrategia.

**Solución implementada:**
1. **Lazy loading nativo** — `loading="lazy"` en elementos `<video>`
2. **Poster images** — Imagen estática como fallback visible inmediatamente
3. **Progressive enhancement** — Video carga cuando el viewport lo requiere
4. **Formatos modernos** — WebM con fallback MP4 para máxima compatibilidad
5. **CDN recomendado** — Servir videos desde CDN para reducir carga del servidor

**Justificación:**
- **LCP optimizado** — La imagen poster se muestra instantáneamente
- **Ancho de banda** — Solo se descarga video si el usuario permanece en la página
- **UX premium** — Transición suave de imagen a video transmite calidad
- **SEO** — search engines indexan correctamente el contenido

---

### DECISIÓN 5: Gestión de Memoria GSAP con Context API

**Problema:** Memory leaks en SPAs cuando animaciones no se limpian correctamente.

**Solución implementada:** Patrón `gsap.context()` con cleanup en `useEffect`

**Implementación:**
```jsx
useEffect(() => {
  const ctx = gsap.context(() => {
    // Animaciones aquí
  }, containerRef)
  
  return () => ctx.revert() // Cleanup crítico
}, [])
```

**Justificación:**
- **Prevención de memory leaks** — GSAP contextos limpian todos los watchers
- **Component-scoped** — Animaciones se reinician cuando componentes remountan
- **Best practice GSAP** — Recomendación oficial para React integration
- **Debugging simplificado** — Easy to track which animations belong to which component

---

## Paleta de Colores Implementada

| Nombre | Hex | Propósito |
|--------|-----|-----------|
| Noir 950 | `#0a0a0a` | Fondo principal (fondo oscuro premium) |
| Noir 900 | `#121212` | Superficies elevadas |
| Ivory 100 | `#fefef9` | Texto principal sobre fondos oscuros |
| Champagne 400 | `#e5c98d` | Acentos dorados (sutil, elegante) |
| Gold 600 | `#d4a82a` | Highlights interactivos |

**Rationale:** Paleta monocromática con acentos dorados/champán transmite lujo sin ser excesiva. El contraste alto garantiza legibilidad manteniendo la estética premium.

---

## Tipografía Implementada

| Familia | Uso | Característica |
|---------|-----|-----------------|
| Cormorant Garamond | Títulos, displays | Serif elegante, peso editorial |
| Montserrat | Cuerpo, UI | Sans-serif moderna, alta legibilidad |

**Rationale:** Combinación clásica de editorial de moda — Cormorant Garamond aporta sofisticación, Montserrat asegura legibilidad en texto largo.

---

## Métricas de Rendimiento Objetivo

| Métrica | Objetivo | Estrategia |
|---------|---------|------------|
| LCP | < 2.5s | Poster images + lazy loading |
| FID | < 100ms | Código minimal, no runtime pesado |
| CLS | < 0.1 | Dimensiones fijas en media, fonts preloaded |
| FPS | 60fps | GSAP con hardware acceleration, will-change |

---

## Historial de Cambios

| Fecha | Versión | Cambio |
|-------|---------|--------|
| 2024 | 1.0 | Decisión inicial del stack tecnológico |

---

## Referencias

- [Vite - Official Docs](https://vitejs.dev/)
- [React - Official Docs](https://react.dev/)
- [Tailwind CSS - Official Docs](https://tailwindcss.com/)
- [GSAP - Best Practices](https://greensock.com/docs/)
- [ScrollTrigger - Documentation](https://greensock.com/docs/3/Plugins/ScrollTrigger/)
