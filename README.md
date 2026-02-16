# Portfolio EnmaDev - Sistema de Diseño Responsive

## 🎨 Paleta de Colores

### Colores Principales
```css
--color-dark: #111111        /* Negro principal */
--color-dark-alt: #141414    /* Negro alternativo */
--color-accent: #0b7a75      /* Verde azulado (acento) */
--color-accent-light: #0d9d96 /* Acento claro */
--color-accent-dark: #085f5b  /* Acento oscuro */
```

### Colores de Fondo
```css
--bg-light: #f5f5f5          /* Fondo claro */
--bg-white: #ffffff          /* Blanco puro */
--bg-dark: #111111           /* Fondo oscuro */
--bg-dark-alt: #141414       /* Fondo oscuro alternativo */
```

### Colores de Texto
```css
--text-light: #333333        /* Texto modo claro */
--text-dark: #f3f3f4         /* Texto modo oscuro */
```

## 📱 Breakpoints Responsive

- **Mobile pequeño**: `480px` y menor
- **Mobile/Tablet**: `768px` y menor
- **Tablet**: `1024px` y menor
- **Desktop**: `1200px` (max-width del contenido)

## ✨ Características Implementadas

### 1. Sistema de Variables CSS
- Todos los colores centralizados en `:root`
- Fácil mantenimiento y consistencia
- Variables para espaciado, sombras y transiciones

### 2. Navbar Responsive
- **Desktop**: Menú horizontal completo
- **Tablet/Mobile**: Menú hamburguesa lateral
- Auto-hide al hacer scroll hacia abajo
- Overlay oscuro cuando el menú móvil está abierto

### 3. Modo Oscuro
- Toggle con persistencia en localStorage
- Detección automática de preferencia del sistema
- Transiciones suaves entre modos
- Iconos que cambian según el tema (🌙/☀️)

### 4. Smooth Scroll
- Navegación suave entre secciones
- Compensación automática por altura del navbar

### 5. Optimizaciones
- RequestAnimationFrame para scroll performance
- Debounce en eventos de resize
- Soporte para `prefers-reduced-motion`
- Prevención de scroll cuando menú móvil abierto

## 🚀 Cómo Usar

### Estructura de Archivos
```
/src
  /styles
    index.css         # Estilos principales con variables
  /scripts
    index.js          # JavaScript con toda la funcionalidad
  /pages
    index.astro       # Página principal
```

### Agregar Nuevos Colores
Añade tus variables en `:root` en `index.css`:
```css
:root {
  --tu-nuevo-color: #hexcode;
}
```

Úsalas en cualquier parte:
```css
.mi-elemento {
  color: var(--tu-nuevo-color);
}
```

### Personalizar Breakpoints
Los breakpoints están en las variables pero los media queries son:
```css
/* Tablet grande */
@media (max-width: 1024px) { }

/* Tablet/Mobile */
@media (max-width: 768px) { }

/* Mobile pequeño */
@media (max-width: 480px) { }
```

## 🎯 Mejoras Implementadas

1. **Menú móvil completo** con animación hamburguesa
2. **Overlay** para cerrar menú al tocar fuera
3. **Cierre automático** de menú al seleccionar enlace
4. **Smooth scroll** con offset del navbar
5. **Detección de tema del sistema**
6. **Performance optimizada** con requestAnimationFrame
7. **Accesibilidad** con aria-labels apropiados
8. **Responsive completo** para todos los dispositivos

## 💡 Colores Adicionales Sugeridos

Si quieres expandir tu paleta, aquí hay algunas sugerencias que combinan bien:

```css
/* Grises complementarios */
--gray-100: #f8f9fa;
--gray-200: #e9ecef;
--gray-300: #dee2e6;

/* Variaciones del acento para estados */
--accent-hover: #0d9d96;
--accent-active: #085f5b;
--accent-muted: rgba(11, 122, 117, 0.1);

/* Colores de estado (opcional) */
--success: #10b981;
--warning: #f59e0b;
--error: #ef4444;
--info: #3b82f6;
```

## 📝 Notas

- El código está optimizado para Astro
- Todos los estilos son modulares y reutilizables
- El sistema soporta expansión fácil para más páginas
- Preparado para internacionalización (i18n)

## Cosas para hacer
- Animaciones para las letras que sea tipo matrix