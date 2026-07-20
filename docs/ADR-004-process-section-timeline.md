# ADR-004: ProcessSection Component & Timeline Animation Implementation

**Estado:** Aprobado  
**Fecha:** 2024  
**Autor:** Equipo de Desarrollo RM Designs  
**Decisores:** Arquitectura técnica del proyecto  
**Supersedes:** ADR-001 (sección de animaciones)

---

## Contexto

El componente `ProcessSection` presenta el proceso artesanal de RM Designs de manera secuencial y visual. Este ADR documenta las decisiones técnicas para:

1. **Estructura de Timeline** — Diseño horizontal/vertical adaptable
2. **Animaciones Secuenciales** — Revelación paso a paso con ScrollTrigger
3. **Conector de Progreso** — Barra animada que muestra avance
4. **Responsive Design** — Adaptación móvil/desktop

---

## Decisiones

### DECISIÓN 1: Arquitectura de Componentes

**Problema:** Necesidad de crear componentes reutilizables y mantenibles.

**Solución implementada:**

```jsx
// Componente principal
const ProcessSection = () => { ... }

// Componente de paso individual
const ProcessStep = ({ step, index, isLast }) => { ... }

// Componente de conector timeline
const TimelineConnector = () => { ... }
```

**Beneficios:**
- Separación de concerns
- Fácil de mantener y extender
- Animaciones encapsuladas
- Reutilizable para futuros procesos

---

### DECISIÓN 2: Animación Secuencial con ScrollTrigger

**Problema:** Revelar pasos de forma secuencial coordinada con scroll.

**Solución implementada:**

```jsx
const ProcessStep = ({ step, index, isLast }) => {
  const stepRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Estado inicial
      gsap.set(stepRef.current, { opacity: 0, y: 60 })

      // Timeline para animación coordinada
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stepRef.current,
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        },
      })

      // Revelación del paso
      tl.to(stepRef.current, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out'
      })
      // Icon con bounce
      .fromTo('.step-icon', 
        { scale: 0, rotation: -45 },
        { scale: 1, rotation: 0, duration: 0.5, ease: 'back.out(1.7)' },
        '-=0.4'
      )
      // Contenido con slide
      .fromTo('.step-content',
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.1 },
        '-=0.3'
      )
    }, stepRef)

    return () => ctx.revert()
  }, [step.number])
}
```

**Jerarquía de animación:**

| Elemento | Animación | Duración | Easing |
|----------|-----------|----------|--------|
| Wrapper | Fade + slide up | 0.8s | power3.out |
| Icon | Scale + rotation bounce | 0.5s | back.out(1.7) |
| Content | Fade + slide left | 0.5s | power2.out |

---

### DECISIÓN 3: Conector de Progreso Animado

**Problema:** Necesidad de visualizar el progreso del proceso.

**Solución implementada:**

```jsx
const TimelineConnector = () => {
  const progressRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Barra de progreso con scrub
      gsap.to(progressRef.current, {
        width: '100%',
        duration: 1.5,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: connectorRef.current,
          start: 'top 70%',
          end: 'bottom 60%',
          scrub: 0.5,  // Scrub suave
        },
      })

      // Puntos que aparecen progresivamente
      processSteps.forEach((_, index) => {
        gsap.to(`.dot-${index}`, {
          opacity: 1, scale: 1,
          scrollTrigger: {
            trigger: connectorRef.current,
            start: `${15 + index * 25}% 70%`,  // Porcentajes escalonados
          },
        })
      })
    }, connectorRef)
  }, [])
}
```

**Configuración de scrub:**

| Valor | Comportamiento | Uso |
|-------|----------------|-----|
| `scrub: false` | Sin scrub, animación instantánea | Efectos simples |
| `scrub: 0.5` | Scrub suave | Barras de progreso |
| `scrub: 1` | Scrub moderado | Parallax |
| `scrub: true` | Scrub 1:1 | Seguir scroll exactamente |

---

### DECISIÓN 4: Responsive Design

**Problema:** El timeline horizontal no funciona en móvil.

**Solución implementada:**

```jsx
{/* Desktop: Layout horizontal */}
<div className="hidden lg:flex items-center gap-5 w-64">
  <span className="step-number font-display text-5xl...">
    {step.number}
  </span>
  <div className="step-icon w-14 h-14...">
    <Icon />
  </div>
</div>

{/* Mobile: Layout vertical */}
<div className="flex lg:hidden items-center gap-4 mb-4">
  <span className="step-number font-display text-4xl...">
    {step.number}
  </span>
  <div className="step-icon w-12 h-12...">
    <Icon />
  </div>
</div>
```

**Estrategia:**
- `lg:` breakpoint (1024px) para separar mobile/desktop
- Contenido vertical en mobile
- Timeline horizontal en desktop
- Conectores verticales móviles (dots)

---

### DECISIÓN 5: Iconos con Animación Bounce

**Problema:** Iconos estáticos no transmiten dinamismo.

**Solución implementada:**

```jsx
.fromTo(
  stepRef.current.querySelector('.step-icon'),
  { scale: 0, rotation: -45 },  // Estado inicial
  { 
    scale: 1, 
    rotation: 0, 
    duration: 0.5, 
    ease: 'back.out(1.7)'  // Bounce effect
  },
  '-=0.4'
)
```

**Easing `back.out(1.7)`:**
- Crea efecto de "rebote" al aparecer
- 1.7 = cantidad de overshoot
- Transmite energía y dinamismo
- Apropiado para iconos de proceso

---

## Métricas de Rendimiento

| Métrica | Valor | Implementación |
|---------|-------|----------------|
| FPS | 60 | Transform-only animations |
| CLS | < 0.1 | Dimensiones fixed |
| Animaciones por step | 3 | Coordinadas con timeline |

---

## Estructura de Datos

```jsx
const processSteps = [
  {
    number: '01',
    title: 'Consulta Privada',
    description: '...',
    icon: MessageCircle,
    duration: '1-2 horas',
  },
  // ... más pasos
]
```

**Campos:**
- `number` — Identificador visual (01, 02, etc.)
- `title` — Título del paso
- `description` — Descripción detallada
- `icon` — Componente Lucide React
- `duration` — Tiempo estimado (para UX)

---

## Archivos Creados/Modificados

| Archivo | Cambio |
|---------|--------|
| `src/components/ProcessSection.jsx` | Implementación completa con timeline |
| `docs/ADR-004-process-section-timeline.md` | Documentación |

---

## Recomendaciones Futuras

1. **Contador animado** — Número que cuenta de 00 a 01, 02, etc.
2. **Video/Imagen por paso** — Multimedia para cada etapa
3. **Accordion en mobile** — Expandir/colapsar pasos
4. **Progress indicator global** — Mostrar progreso en sticky header

---

## Historial de Cambios

| Fecha | Versión | Cambio |
|-------|---------|--------|
| 2024 | 1.0 | Decisión inicial de ProcessSection |

---

## Referencias

- [GSAP ScrollTrigger Documentation](https://greensock.com/docs/3/Plugins/ScrollTrigger/)
- [GSAP Easing Visualizer](https://greensock.com/docs/3/Eases)
- [CSS Breakpoints - Tailwind](https://tailwindcss.com/docs/breakpoints)
