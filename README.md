# RM Designs

Plataforma web e-commerce/exhibition de alta costura para trajes de baile e implementos de alta gama.

![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)
![GSAP](https://img.shields.io/badge/GSAP-3.12-88CE02?logo=greensock)

## 🎯 Propósito

RM Designs es una marca de alta costura especializada en trajes de baile e implementos premium. Esta plataforma web transmite la esencia de elegancia exclusiva y calidad artesanal que caracteriza a la marca, ofreciendo una experiencia visual de alto nivel con animaciones fluidas a 60fps.

## 🛠️ Stack Tecnológico

### Core
- **React 18.3** — Framework de UI con arquitectura basada en componentes
- **Vite 6.0** — Herramienta de build ultra-rápida con HMR (Hot Module Replacement)
- **Tailwind CSS 3.4** — Framework de utilidades CSS para estilos personalizados

### Animaciones
- **GSAP 3.12** — Motor de animaciones profesional para efectos de alto rendimiento
- **ScrollTrigger** — Plugin de GSAP para animaciones controladas por scroll

### Iconografía
- **Lucide React** — Iconografía minimalista y elegante

## 📁 Estructura del Proyecto

```
rm-designs/
├── public/                    # Assets públicos
├── src/
│   ├── assets/                # Videos, imágenes, fuentes
│   ├── components/            # Componentes modulares
│   │   ├── Hero.jsx           # Sección hero con video
│   │   ├── FeatureGrid.jsx    # Grid de características
│   │   ├── ProcessSection.jsx # Proceso de creación
│   │   └── Footer.jsx         # Pie de página
│   ├── utils/
│   │   └── gsapContext.js     # Utilidad GSAP con cleanup
│   ├── App.jsx                # Componente principal
│   ├── main.jsx               # Punto de entrada
│   └── index.css              # Estilos globales + Tailwind
├── docs/                      # Documentación técnica
├── tailwind.config.js         # Configuración de estilos
├── vite.config.js             # Configuración de build
└── package.json
```

## 🚀 Inicio Rápido

### Requisitos Previos
- Node.js 18+ 
- npm 9+ o pnpm 8+

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/Tiago1203/RMDESINGS.git
cd RMDESINGS

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

El servidor de desarrollo estará disponible en `http://localhost:5173`

### Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo con HMR |
| `npm run build` | Genera la versión de producción optimizada |
| `npm run preview` | Previsualiza la versión de producción localmente |
| `npm run lint` | Ejecuta el linter para detectar problemas de código |
| `npm run lint:fix` | Auto-corrige problemas de estilo |

## 🎨 Diseño Visual

### Paleta de Colores

| Color | Hex | Uso |
|-------|-----|-----|
| Noir 950 | `#0a0a0a` | Fondo principal |
| Ivory 100 | `#fefef9` | Texto principal |
| Champagne 400 | `#e5c98d` | Acentos dorados |
| Gold 600 | `#d4a82a` | Highlights |

### Tipografía

- **Cormorant Garamond** — Títulos y displays (editorial, elegante)
- **Montserrat** — Cuerpo de texto (moderna, legible)

## 📖 Documentación

- [ADR-001: Arquitectura y Stack Tecnológico](./docs/ADR-001-architecture-stack.md)
- [ADR-002: Hero Video & GSAP Animations](./docs/ADR-002-hero-video-gsap.md)

## ✨ Componentes Implementados

### ✅ Hero Section
- Video background con poster fallback para LCP optimizado
- Animaciones GSAP con `gsap.context()` para 60fps
- Parallax scroll effect
- Navegación responsive
- Accesibilidad WCAG 2.1 AA

## 🔧 Configuración de Desarrollo

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto si necesitas configurar opciones específicas:

```env
VITE_APP_TITLE="RM Designs"
VITE_APP_DESCRIPTION="Alta Costura Premium"
```

### Extensiones Recomendadas (VS Code)

- **ESLint** — Linting y detección de errores
- **Prettier** — Formateo automático de código
- **Tailwind CSS IntelliSense** — Autocompletado de clases Tailwind
- **PostCSS** — Soporte para sintaxis CSS avanzada

## 📝 Licencia

Este proyecto es propiedad de RM Designs. Todos los derechos reservados.
