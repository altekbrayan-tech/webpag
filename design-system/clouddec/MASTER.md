# Design System Master File — Clouddec

> Nota: este archivo es documentación interna del proceso de diseño, no se sirve al público.
> Corregido a mano tras la primera generación automática (que asumió modo claro por defecto —
> `CLAUDE.md` fija "Dark theme only — no light mode toggle" para este proyecto).

---

**Project:** Clouddec
**Category:** B2B Tech + Marketing Agency (dual service line)
**Mode:** Dark only (no light mode)

---

## Global Rules

### Color Palette — "Aurora Grid" (violeta + cian sobre fondo oscuro)

Una sola paleta de marca para ambas líneas de negocio (Tecnología + Marketing Digital); la
diferenciación entre líneas se hace por página/badge, no por color secundario, para mantener
coherencia de marca "premium".

| Role | Hex | CSS Variable |
|------|-----|--------------|
| Primary (violeta) | `#8b5cf6` | `--accent` |
| Primary hover | `#a78bfa` | `--accent-hover` |
| Secondary (cian) | `#22d3ee` | `--accent-2` |
| Background | `#05060f` | `--primary-bg` |
| Surface | `#0a0d1c` | `--secondary-bg` |
| Text main | `#f5f6fb` | `--text-main` |
| Text muted | `#97a0b8` | `--text-muted` |
| Border | `rgba(255,255,255,0.1)` | `--border-color` |
| Glass bg | `rgba(255,255,255,0.04)` | `--glass-bg` |

**Color Notes:** validado por búsqueda `--domain color "dark tech premium violet cyan gradient"` —
el patrón "Editor violet + filter cyan on dark" (`#7C3AED`/`#0891B2`/`#0F172A`) confirma que la
paleta ya en uso es la correcta para este tipo de producto; se mantiene sin cambios de matiz, solo
se sistematizan más niveles de superficie/elevación.

### Typography

- **Heading Font:** Space Grotesk (carácter distintivo, tech/startup/AI)
- **Body Font:** DM Sans (alta legibilidad)
- **Pairing:** "Tech Startup" — Best for: Tech companies, startups, SaaS, developer tools, AI products
- **Google Fonts:**
```css
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');
```

### Style

**Style:** Glassmorphism (ya en uso, confirmado correcto)
**Key Effects:** Backdrop blur 10-20px, borde sutil `rgba(255,255,255,0.08-0.2)`, profundidad por capas
**Anti-patterns a evitar:** animación excesiva, emojis como iconos (usar Font Awesome/SVG), estados
instantáneos sin transición, foco invisible, contraste bajo.

### Page Pattern (páginas de conversión B2B)

**Pattern:** Trust & Authority + Conversion
**Section Order:** Hero (misión/credibilidad) → Prueba (stats) → Resumen de soluciones → CTA claro
**CTA Placement:** Hero + sección final
**Conversion notes:** prueba social antes del CTA; controles de pausa/teclado en cualquier carrusel;
estado estático bajo `prefers-reduced-motion`.

---

## Pre-Delivery Checklist

- [ ] Sin emojis como iconos
- [ ] `cursor:pointer` en todo elemento clicable
- [ ] Transiciones 150-300ms en hover
- [ ] Contraste texto 4.5:1 mínimo (verificar sobre `--text-muted` en fondos oscuros)
- [ ] Foco visible en navegación por teclado
- [ ] `prefers-reduced-motion` respetado
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] Todo el contenido nuevo presente en el HTML inicial (sin depender de JS para SEO/IA)
