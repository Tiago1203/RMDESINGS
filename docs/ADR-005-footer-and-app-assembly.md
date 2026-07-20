# ADR-005: Footer Component & Application Assembly

**Estado:** Aprobado  
**Fecha:** 2024  
**Autor:** Equipo de Desarrollo RM Designs  
**Decisores:** Arquitectura técnica del proyecto

---

## Contexto

Este ADR documenta la implementación del componente Footer que cierra el flujo de la página y el ensamble final de la aplicación. Es el último componente de la versión 1.0 de la plataforma RM Designs.

---

## Decisiones

### DECISIÓN 1: Arquitectura del Footer

**Componentes internos:**

```jsx
// Formulario de newsletter (sub-componente)
const NewsletterForm = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')
  // ... lógica del formulario
}

// Footer principal
const Footer = () => {
  // ... estructura y animaciones
}
```

**Beneficios:**
- Separación de concerns (form vs layout)
- Reutilizable para otros formularios
- Testabilidad mejorada

---

### DECISIÓN 2: Newsletter Form

**Estados implementados:**

| Estado | UI | Descripción |
|--------|-----|-------------|
| `idle` | Input + ChevronRight | Estado inicial |
| `loading` | Input + Spinner | Procesando |
| `success` | Input + Checkmark | Éxito (3s) |
| `error` | (futuro) | Manejo de errores |

**Implementación:**

```jsx
const handleSubmit = (e) => {
  e.preventDefault()
  setStatus('loading')
  // Simulate API call
  setTimeout(() => {
    setStatus('success')
    setTimeout(() => setStatus('idle'), 3000)
  }, 1000)
}
```

---

### DECISIÓN 3: Scroll-to-Top Button

**Comportamiento:**
- Aparece después de scroll > 500px
- Animación de entrada/salida
- Scroll suave al hacer click

**Implementación:**

```jsx
const [isVisible, setIsVisible] = useState(false)

useEffect(() => {
  const handleScroll = () => {
    setIsVisible(window.scrollY > 500)
  }
  window.addEventListener('scroll', handleScroll, { passive: true })
  return () => window.removeEventListener('scroll', handleScroll)
}, [])

// En JSX
<button className={`fixed ... ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
```

---

### DECISIÓN 4: Animaciones del Footer

**Secuencia de animación:**

1. Footer sections aparecen con stagger (0.1s delay)
2. Divider se expande horizontalmente

```jsx
gsap.fromTo('.footer-section',
  { opacity: 0, y: 50 },
  { opacity: 1, y: 0, duration: 1, stagger: 0.1 }
)

gsap.fromTo('.footer-divider',
  { scaleX: 0 },
  { scaleX: 1, duration: 1.2 }
)
```

---

### DECISIÓN 5: Estructura de App.jsx

**Orden de componentes:**

```jsx
function App() {
  return (
    <main className="relative min-h-screen bg-noir-950 grain-texture">
      <Hero />           {/* 1. Video hero + nav */}
      <FeatureGrid />    {/* 2. Brand pillars + collections */}
      <ProcessSection /> {/* 3. Process timeline */}
      <Footer />         {/* 4. Contact + newsletter */}
    </main>
  )
}
```

**GSAP Setup global:**

```jsx
useEffect(() => {
  gsap.defaults({ ease: 'power3.out', duration: 0.8 })
  
  return () => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    ScrollTrigger.clearScrollTrigger()
  }
}, [])
```

---

## Página Assembly - Flujo Completo

```
┌─────────────────────────────────────────────┐
│                   HERO                        │
│  Video Background + Navigation + CTA          │
│  Parallax scroll + Entrance animations       │
└─────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────┐
│               FEATURE GRID                   │
│  4 Feature Cards + 3 Collections Preview    │
│  Staggered scroll reveal                     │
└─────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────┐
│              PROCESS SECTION                  │
│  Timeline + 4 Steps + Progress bar            │
│  Sequential reveal                           │
└─────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────┐
│                  FOOTER                       │
│  Brand + Nav + Contact + Social + Newsletter │
│  Scroll-to-top button                        │
└─────────────────────────────────────────────┘
```

---

## Versión 1.0 - Componentes Completados

| Componente | Estado | Animaciones |
|------------|--------|-------------|
| Hero | ✅ Completo | Video + Parallax + Entrance |
| FeatureGrid | ✅ Completo | Staggered + Hover |
| ProcessSection | ✅ Completo | Timeline + Sequential |
| Footer | ✅ Completo | Fade + Newsletter |

---

## Archivos Creados/Modificados

| Archivo | Cambio |
|---------|--------|
| `src/components/Footer.jsx` | Implementación completa |
| `src/App.jsx` | Assembly de componentes |
| `docs/ADR-005-footer-and-app-assembly.md` | Documentación |

---

## Recomendaciones Futuras

1. **Mapa de ubicación** — Integrar mapa interactivo
2. **Chat widget** — Live chat para consultas
3. **FAQ section** — Preguntas frecuentes
4. **Testimonials** — Reviews de clientes
5. **Awards/Badges** — Certificaciones de calidad

---

## Historial de Cambios

| Fecha | Versión | Cambio |
|-------|---------|--------|
| 2024 | 1.0 | Decisión inicial y assembly completo |

---

## Referencias

- [React Forms Best Practices](https://react.dev/learn/forms)
- [GSAP ScrollTrigger](https://greensock.com/docs/3/Plugins/ScrollTrigger/)
