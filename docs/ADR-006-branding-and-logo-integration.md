# ADR-006: Branding & Logo Integration

**Estado:** Aprobado  
**Fecha:** 2024  
**Autor:** Equipo de Desarrollo RM Designs  
**Decisores:** Arquitectura técnica del proyecto

---

## Contexto

Este ADR documenta la integración de la identidad visual de "RM Designs by Renata Real" en la plataforma web. Se define el logotipo corporativo, la paleta de colores refinada, y los lineamientos de tipografía editorial para mantener la coherencia de marca en toda la aplicación.

---

## Identidad Visual

### Logotipo: "RM Designs by Renata Real"

**Elementos del logo:**
1. **Corona** — Elemento decorativo que simboliza exclusividad
2. **Monograma "RM"** — Iniciales de la marca en tipografía elegante
3. **Subtitle** — "by Renata Real" en tipografía sans-serif
4. **Tagline** — "Alta Costura Premium"
5. **Acento decorativo** — Punto dorado tras el monograma

### Componentes del Logo

```jsx
// Logo.jsx - Componente SVG del logotipo
const Logo = ({ size = 'default' }) => {
  return (
    <svg viewBox="0 0 200 60">
      {/* Corona */}
      <path d="M45 18 L50 8 L55 18" stroke="url(#crownGradient)" />
      
      {/* Monograma RM */}
      <path d="M20 25 L20 45 M20 25 C20 22 26 20..." />
      
      {/* Subtitle */}
      <text x="80" y="28">by Renata Real</text>
    </svg>
  )
}
```

### Colores del Logo

| Elemento | Color | Uso |
|----------|-------|-----|
| Corona | `#e5c98d` → `#edc54a` → `#d4a82a` | Gradiente dorado |
| Monograma | `#fefef9` → `#e5c98d` | De ivory a champagne |
| Subtítulo | `#e5c98d` (80% opacity) | Champagne |
| Línea | `#e5c98d` → transparente | Decorativo |

---

## Componente Navbar

### Arquitectura

```jsx
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Scroll effect - muestra fondo al hacer scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
  }, [])

  return (
    <header className={`fixed ${isScrolled ? 'bg-noir-950/95' : 'bg-transparent'}`}>
      <Logo />
      {/* Desktop Nav */}
      {/* Mobile Menu */}
    </header>
  )
}
```

### Estados

| Estado | Apariencia |
|--------|------------|
| Initial | Fondo transparente, logo visible |
| Scrolled (>50px) | Fondo `noir-950/95`, blur, borde inferior |
| Mobile Menu Open | Menú desplegado con animación |

---

## Paleta de Colores Refinada

### Sistema de Color

```
┌─────────────────────────────────────────────────────────────┐
│                    RM DESIGNS PALETTE                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  NOIR (Fondo)          CHAMPAGNE (Acentos)    IVORY (Texto) │
│  ─────────────          ───────────────────    ───────────── │
│  950: #0a0a0a ◼️        400: #e5c98d ✦         100: #fefef9 │
│  900: #121212 ◼️        500: #dbb06a ✦                       │
│  800: #383838 ◼️        600: #cd9350 ✦                       │
│  700: #434343 ◼️                                                  │
│                                                              │
│  GOLD (Highlights)                                            │
│  ─────────────────                                            │
│  600: #d4a82a ★                                              │
│  400: #f2d87a ★                                              │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Clases Tailwind Disponibles

| Categoría | Clases |
|----------|--------|
| **Backgrounds** | `bg-noir-{50-950}`, `bg-champagne-{50-600}`, `bg-gold-{400-600}` |
| **Text** | `text-noir-{50-950}`, `text-champagne-{50-600}`, `text-gold-{400-600}`, `text-ivory-100` |
| **Borders** | `border-champagne-{50-500}`, `border-gold-{400-600}` |
| **Shadows** | `shadow-champagne`, `shadow-gold` (con variantes `-lg`) |
| **Gradients** | `bg-gradient-gold`, `bg-gradient-champagne`, `bg-gradient-radial` |

---

## Tipografía

### Sistema Tipográfico

| Uso | Familia | Peso | Tracking |
|-----|---------|------|----------|
| Display/H1 | Cormorant Garamond | Light (300) | Normal |
| Títulos | Cormorant Garamond | Regular (400) | Wide |
| Cuerpo | Montserrat | Regular (400) | Normal |
| Navegación | Montserrat | Medium (500) | Ultra-wide |
| Etiquetas | Montserrat | Light (300) | Ultra-wide |

### Tamaños Definidos

```js
'hero': 'clamp(3rem, 8vw, 8rem)'      // Títulos principales
'display': 'clamp(2rem, 5vw, 4rem)'   // Subtítulos
'subheading': 'clamp(1.25rem, 2vw, 1.75rem)' // Secciones
```

---

## Utilidades de Animación

### Animaciones Disponibles

| Nombre | Uso | Duración |
|--------|-----|----------|
| `animate-fade-in` | Elementos que aparecen | 1s |
| `animate-slide-up` | Slide desde abajo | 0.8s |
| `animate-scale-in` | Scale desde 0.95 | 0.6s |
| `animate-shimmer` | Efecto brillo | 2s loop |

### Transiciones

```css
.transition-luxury {
  transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
```

---

## Componentes de UI

### Botón Primario

```jsx
<a className="px-8 py-4 text-sm tracking-[0.2em] uppercase
         text-noir-950 bg-champagne-400 font-medium
         hover:bg-gold-400 transition-all duration-300
         shadow-champagne">
  Contactar
</a>
```

### Link de Navegación

```jsx
<a className="link-luxury text-sm tracking-[0.15em] uppercase
         hover:text-champagne-400 transition-colors duration-300">
  {label}
</a>
```

---

## Estructura de Archivos

```
src/
├── components/
│   ├── Navbar.jsx              # Navegación con branding
│   ├── branding/
│   │   └── Logo.jsx           # Componente SVG del logo
│   ├── Hero.jsx
│   ├── FeatureGrid.jsx
│   ├── ProcessSection.jsx
│   └── Footer.jsx
├── App.jsx                     # Ensamble con Navbar
└── index.css                   # Estilos globales
```

---

## Guidelines de Uso

### ✅ Hacer

- Usar `champagne-400` como color de acento principal
- Aplicar tracking `ultra-wide` (0.25em) en navegación y badges
- Mantener fondos en escala `noir` (oscuros)
- Usar tipografía `display` (Cormorant) para títulos

### ❌ No Hacer

- Usar colores saturados en fondos grandes
- Aplicar peso bold a tipografía editorial
- Mezclar demasiados tonos dorados diferentes
- Usar tipografía sans-serif en títulos principales

---

## Archivos Creados/Modificados

| Archivo | Cambio |
|---------|--------|
| `src/components/Navbar.jsx` | Componente de navegación con branding |
| `src/components/branding/Logo.jsx` | SVG del logotipo |
| `src/components/Hero.jsx` | Actualizado sin nav duplicada |
| `src/App.jsx` | Integración de Navbar |
| `tailwind.config.js` | Paleta refinada + utilidades |
| `docs/ADR-006-branding-and-logo-integration.md` | Documentación |

---

## Recomendaciones Futuras

1. **Favicon SVG** — Favicon con iniciales RM en dorado
2. **OG Image** — Imagen para compartir en redes sociales
3. **Loader animation** — Animación de entrada con logo
4. **Brand assets folder** — Carpeta para guías de marca descargables

---

## Historial de Cambios

| Fecha | Versión | Cambio |
|-------|---------|--------|
| 2024 | 1.0 | Decisión inicial de branding |

---

## Referencias

- [Tailwind CSS Customization](https://tailwindcss.com/docs/customizing-colors)
- [SVG Logo Best Practices](https://css-tricks.com/svg-logo-design-best-practices/)
- [Google Fonts - Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond)
- [Google Fonts - Montserrat](https://fonts.google.com/specimen/Montserrat)
