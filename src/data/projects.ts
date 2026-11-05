// src/data/projects.ts

export interface ProjectFeature {
  t: string;
  d: string;
}

export interface ProjectMetric {
  value: string;
  label: string;
}

export interface Project {
  title: string;
  subtitle: string;
  accent: string;
  gradient: string;
  image: string;
  github: string | null;
  demo: string | null;
  isPrivate: boolean;
  role: string;
  period: string;
  context: string;
  intro: string;
  challenge: string;
  features: ProjectFeature[];
  decisions: string[];
  stack: string[];
  metrics: ProjectMetric[];
  gallery: number;
}

export const projectsData: Record<string, Project> = {
  "siga-bienestar": {
    title: "SIGA",
    subtitle: "Intranet Modular Universitaria",
    accent: "var(--color-violet)",
    gradient: "linear-gradient(135deg, rgba(122,0,255,0.6) 0%, rgba(10,10,15,0.9) 60%)",
    image: "/images/be1.webp",
    github: "https://github.com/EnmaLv/SistemaUniversitario",
    demo: "https://sistemauniversitario-oc5a.onrender.com/",
    isPrivate: false,
    role: "Líder de proyecto & desarrollador principal",
    period: "01/2024 – Actualidad",
    context: "UPTP · Unidad de Bienestar Estudiantil · multisede",
    intro:
      "SIGA es la columna vertebral digital de la Unidad de Bienestar Estudiantil de la UPTP. Unifica siete módulos críticos —comedor, salud, psicología, deportes, becas, transporte y administración— en una única intranet multisede, reemplazando procesos manuales dispersos por un flujo con trazabilidad, control de acceso granular y auditoría inmutable.",
    challenge:
      "Coordinar siete áreas operativas bajo un mismo techo con requisitos de acceso por vista y por acción, sincronizar permisos automáticamente con las rutas registradas, garantizar que ninguna acción quede sin trazabilidad y asegurar que el inventario multisede nunca genere pérdidas por concurrencia.",
    features: [
      { t: "RBAC granular vista × acción", d: "11 roles, 94 vistas y 313 permisos con middleware y directivas Blade, sincronizados con las rutas." },
      { t: "Bitácora inmutable con triggers", d: "Auditoría de solo inserción en MySQL y PostgreSQL. Los UPDATE/DELETE están bloqueados a nivel de motor." },
      { t: "Bloqueos de seguridad automáticos", d: "3 intentos fallidos → 5 min; 3 bloqueos en 24 h → permanente; cierre por inactividad a los 15 min." },
      { t: "Multisede nativo", d: "Filtro global por sede activa aplicado a 30 modelos vía traits reutilizables." },
      { t: "Inventario transaccional por lote", d: "Servicio único con lockForUpdate y reparto automático de compras entre sedes." },
      { t: "API REST con Sanctum", d: "39 endpoints que alimentan la app móvil Moove, con trazado GPS simplificado (Douglas-Peucker)." },
      { t: "Siete módulos completos", d: "Comedor, salud (consulta → receta → dispensación), psicología con historias cifradas, deportes, becas, transporte y administración." },
      { t: "177 pruebas PHPUnit", d: "32 archivos de pruebas de seguridad, todas pasando en verde." },
    ],
    decisions: [
      "Migré los permisos de columnas JSON por rol/usuario a un RBAC relacional vista × acción que se sincroniza a partir de las rutas registradas.",
      "Bitácora de solo inserción resuelta con triggers para MySQL y PostgreSQL, no en la capa de aplicación.",
      "Inventario concurrente con lockForUpdate y reparto de compras protegido contra doble recepción.",
      "Trazado de rutas con Douglas-Peucker para reducir los datos GPS almacenados (~90 % de ahorro) con purga diaria.",
      "Código compatible con MySQL y PostgreSQL: query builder sin funciones propias de MySQL y triggers en ambos motores.",
      "Exportación a PDF, Excel y Word, importación masiva desde Excel con creación de cuentas en cola y mensajería en tiempo real con Laravel Reverb.",
    ],
    stack: ["Laravel 12", "Livewire 3", "MySQL 8", "Tailwind CSS", "Alpine.js", "Laravel Sanctum", "PHPUnit", "Docker", "Render", "Aiven"],
    metrics: [
      { value: "535", label: "Rutas" },
      { value: "128", label: "Tablas MySQL" },
      { value: "177", label: "Pruebas" },
      { value: "7", label: "Módulos" },
    ],
    gallery: 4,
  },

  "moove-transporte": {
    title: "Moove",
    subtitle: "Transporte Inteligente",
    accent: "var(--color-cyan)",
    gradient: "linear-gradient(135deg, rgba(0,217,255,0.4) 0%, rgba(10,10,15,0.9) 60%)",
    image: "/images/moove.png",
    github: "https://github.com/EnmaLv/Moove",
    demo: "https://moove-app.web.app/",
    isPrivate: false,
    role: "Desarrollador (solo)",
    period: "03/2026 – 09/2026",
    context: "UPTP · Transporte universitario · Web + Android",
    intro:
      "Moove es la app móvil institucional que complementa SIGA. Permite a los estudiantes rastrear en vivo los autobuses universitarios, marcar su asistencia de tres formas distintas y a los conductores reportar su posición GPS y gestionar la flota, incluso sin conexión a internet.",
    challenge:
      "Mantener un rastreo GPS en tiempo real confiable sobre una red universitaria inestable, validar la asistencia de pasajeros de tres formas distintas y sincronizar todo sin perder datos cuando el autobús entra a una zona sin cobertura.",
    features: [
      { t: "Seguimiento GPS en tiempo real", d: "El conductor publica su posición en Cloud Firestore; los pasajeros ven el marcador en vivo con rumbo y estado de movimiento." },
      { t: "Asistencia en tres modos", d: "Escaneo de carnet con mobile_scanner, ingreso de cédula y validación automática por proximidad GPS (radio 15 m)." },
      { t: "Cola offline SQLite", d: "Puntos GPS, asistencias y cierres de viaje se guardan localmente y se reenvían al recuperar la conexión." },
      { t: "Finalización automática de viaje", d: "El viaje se cierra solo al entrar al radio de 50 m del destino." },
      { t: "Notificaciones push", d: "Firebase Cloud Messaging y notificaciones locales." },
      { t: "Cuatro catálogos CRUD de flota", d: "Marcas, modelos, combustibles y vehículos con activar/desactivar." },
      { t: "Rutas por calles", d: "OSRM + OpenStreetMap con marcador orientado por rumbo (heading_helper)." },
      { t: "Sesión persistente por rol", d: "Menús distintos para administrador, jefe de transporte, conductor y pasajero." },
    ],
    decisions: [
      "Diseñé una cola offline-first con UUID por registro (local_id) para reenviar sin duplicados cuando vuelve la conexión.",
      "Firestore para el tracking en vivo: modelo de lectura rápida y actualización en tiempo real sin backend propio.",
      "OSRM en lugar de líneas rectas: trazado real por calles y corrección de rumbo.",
      "Geocerca por proximidad usando Geolocator.distanceBetween, con fallback a escaneo o cédula si el GPS falla.",
      "Login contra la API del SIGA con token Bearer persistido en shared_preferences.",
    ],
    stack: ["Flutter", "Dart", "Cloud Firestore", "FCM", "Firebase Hosting", "REST API", "GPS", "flutter_map", "OSM", "OSRM", "SQLite", "sqflite", "connectivity_plus", "mobile_scanner"],
    metrics: [
      { value: "9", label: "Pantallas" },
      { value: "59", label: "Archivos Dart" },
      { value: "~8.7k", label: "Líneas" },
      { value: "3", label: "Roles" },
    ],
    gallery: 4,
  },

  "nomit-fintech": {
    title: "Nomit",
    subtitle: "Fintech / EWA Platform",
    accent: "var(--color-crimson)",
    gradient: "linear-gradient(135deg, rgba(255,0,60,0.4) 0%, rgba(10,10,15,0.9) 60%)",
    image: "/images/nomit.png",
    github: null,
    demo: "https://nomit-dashboard.onrender.com/",
    isPrivate: true,
    role: "Fundador & líder técnico",
    period: "09/2026 – Actualidad",
    context: "Nomit Tecnologies · Earned Wage Access · startup venezolana",
    intro:
      "Nomit es una plataforma de acceso anticipado al salario devengado para el mercado venezolano. Las empresas aliadas cargan su nómina, los trabajadores piden adelantos desde una app Flutter, y el panel administrativo procesa la solicitud, el desembolso por Pago Móvil a tasa BCV y la conciliación posterior.",
    challenge:
      "Diseñar un motor transaccional que no genere vales duplicados ni adelantos por encima del saldo disponible aun con peticiones concurrentes y conexiones móviles inestables, mientras se aísla estrictamente la información por empresa y se audita cada cambio de estado.",
    features: [
      { t: "Saldo devengado calculado en el servidor", d: "Fuente única de verdad, montos en centavos; la app solo lo muestra. Tope configurable por empresa (60 % por defecto)." },
      { t: "Idempotencia + bloqueo de filas", d: "Idempotency-Key en la API y lockForUpdate al crear solicitudes: imposible duplicar o exceder el saldo." },
      { t: "Flujo completo de adelantos", d: "pendiente → aprobado/rechazado → desembolsado, con bitácora de auditoría de cada cambio de estado." },
      { t: "Pago Móvil con tasa BCV", d: "Monto en Bs con tasa vigente desde ve.dolarapi.com, referencia única por banco y aborto si la tasa cambió." },
      { t: "Períodos de nómina con ciclo", d: "Semanal, quincenal o mensual: apertura, corte, mora con indemnización, reapertura y conciliación." },
      { t: "Carga masiva de nómina desde Excel", d: "PhpSpreadsheet con savepoint por fila, normalización de formatos venezolanos y creación automática del acceso a la app." },
      { t: "RBAC propio con 3 ámbitos", d: "staff Nomit, RRHH empresa y trabajador; 19 permisos, matriz editable y bloqueo anti auto-lockout." },
      { t: "Panel en vivo + KPIs", d: "RRHH con refresco cada 15 s; panel del staff con KPIs por rango (mes, 3, 12 meses)." },
    ],
    decisions: [
      "Bloqueo pesimista en transiciones + índice único en referencias de Pago Móvil como garantía final contra carreras entre operadores.",
      "Idempotencia pensada para conexiones móviles inestables (reintentos de red).",
      "Aislamiento multiempresa (multi-tenant por empresa_id) centralizado en middleware: fuerza parámetros y devuelve 404 ante modelos ajenos.",
      "Importación de Excel tolerante a errores con savepoint por fila y normalización de cédulas, teléfonos y montos locales.",
      "Docker multi-stage (Composer + Node + PHP/Apache) con migraciones y seeder idempotente en el entrypoint; Render con health check `/up`.",
      "API REST v1 con rate limiting: login 5/min, solicitudes 10/min; tokens Bearer por dispositivo con Sanctum.",
    ],
    stack: ["Laravel 13", "PHP 8.3", "PostgreSQL 16", "Laravel Sanctum", "Blade", "Alpine.js", "Tailwind CSS", "Docker", "Render", "PhpSpreadsheet"],
    metrics: [
      { value: "29", label: "Tablas" },
      { value: "55", label: "Rutas admin" },
      { value: "8", label: "Endpoints API" },
      { value: "19", label: "Permisos" },
    ],
    gallery: 2,
  },

  "asistente-apolo": {
    title: "Asistente Apolo",
    subtitle: "AI Desktop Agent",
    accent: "#10b981",
    gradient: "linear-gradient(135deg, rgba(16, 185, 129, 0.35) 0%, rgba(10, 10, 15, 0.9) 60%)",
    image: "/images/apolo.png",
    github: null,
    demo: null,
    isPrivate: true,
    role: "Desarrollador (solo)",
    period: "10/2026",
    context: "Proyecto propio · también presentado como proyecto universitario",
    intro:
      "Asistente de voz y texto para GNU/Linux que entiende peticiones en español cotidiano —«instala VLC», «busca mi informe», «pon los bordes más gruesos»— y las ejecuta en el equipo con confirmación humana, pensado para quien no domina la terminal.",
    challenge:
      "Permitir que un agente con acceso real al sistema operativo ejecute comandos potencialmente peligrosos sin poner en riesgo la máquina del usuario, con una capa de seguridad independiente del modelo que no dependa de que el LLM «se porte bien».",
    features: [
      { t: "Agente con tool calling", d: "Bucle de hasta 8 pasos por petición y 16 herramientas: archivos, apps, URLs, terminal, Hyprland." },
      { t: "Capa de seguridad en código", d: "4 niveles independientes del modelo: bloqueado, administrador, confirmación y solo lectura; rutas sensibles (.ssh, .env) bloqueadas." },
      { t: "Fallback entre 3 LLMs", d: "Gemini, Groq y OpenRouter vía SDK de OpenAI, con reposo de 120 s para el proveedor que falle." },
      { t: "Fallback entre 3 motores STT", d: "Whisper (Groq) → Gemini → faster-whisper local opcional." },
      { t: "Servicio en segundo plano", d: "Burbuja activada por atajos globales con SIGUSR1/SIGUSR2, PID file y reinicio al cambiar de sesión." },
      { t: "Burbuja GTK 3 + chat paginado", d: "gtk-layer-shell para Wayland, historial en SQLite paginado a 30 mensajes." },
      { t: "4 herramientas de Hyprland", d: "Ver ventanas, controlarlas, ajustar diseño en vivo y recargar configuración." },
      { t: "Instalador en Bash", d: "Arch, Debian/Ubuntu/Canaima y Fedora, con verificación de dependencias." },
    ],
    decisions: [
      "La seguridad vive en el código, no en el prompt: aunque el LLM alucine, los comandos se validan contra reglas fijas.",
      "sudo sin que la contraseña pase por el asistente: terminal visible al usuario + lista cerrada de programas permitidos (pacman, apt, dnf, flatpak, systemctl).",
      "Historial compatible entre proveedores: se limpian los campos propios de Gemini antes de reenviar a otro proveedor.",
      "Ventana de historial que nunca corta en un resultado de herramienta huérfano, lo que confundiría al LLM.",
      "Filtro de alucinaciones de Whisper (frases típicas al silencio) antes de enviar al agente.",
      "Defensa contra inyección de instrucciones en archivos leídos: se marcan como datos, no como instrucciones.",
    ],
    stack: ["Python", "OpenAI SDK", "Gemini", "Groq", "OpenRouter", "Whisper", "edge-tts", "GTK 3", "SQLite", "Bash", "Hyprland", "Linux"],
    metrics: [
      { value: "16", label: "Herramientas" },
      { value: "84", label: "Pruebas" },
      { value: "147", label: "Comandos validados" },
      { value: "3", label: "LLMs en fallback" },
    ],
    gallery: 2,
  },

  "banagro-landing": {
    title: "Banagro",
    subtitle: "Agro-Finance Landing",
    accent: "#ffa500",
    gradient: "linear-gradient(135deg, rgba(255, 165, 0, 0.35) 0%, rgba(10, 10, 15, 0.9) 60%)",
    image: "/images/banagro.png",
    github: null,
    demo: "https://banagro.onrender.com/",
    isPrivate: true,
    role: "Desarrollador web freelance",
    period: "09/2026",
    context: "Cliente privado · financiamiento agrícola · en lanzamiento",
    intro:
      "Landing page para una empresa venezolana de financiamiento agrícola en lanzamiento. Explica quiénes son, qué financian y permite simular la cuota de un crédito con período de gracia, con SEO técnico completo y optimización de imágenes.",
    challenge:
      "Construir un simulador de crédito comprensible para productores agrícolas —con dos perfiles y período de gracia con interés capitalizado— manteniendo un rendimiento impecable y un SEO que permita a la empresa ser descubierta antes del lanzamiento comercial.",
    features: [
      { t: "Simulador de crédito con gracia", d: "2 perfiles de productor con rangos propios, 5 plazos, 6 meses de gracia con interés capitalizado y amortización francesa." },
      { t: "Navbar glassmorphism al scroll", d: "Barra fija con efecto blur al hacer scroll, menú hamburguesa en móvil y anclas a 6 secciones." },
      { t: "Animaciones con IntersectionObserver", d: "Hook propio useReveal, sin librerías externas." },
      { t: "SEO técnico completo", d: "Meta etiquetas, canonical, Open Graph, Twitter Card, robots.txt y lang=\"es\"." },
      { t: "Imágenes WebP locales", d: "Reemplazo de fotos externas de Unsplash y PNG por WebP gestionados por Vite." },
      { t: "12 iconos SVG inline", d: "Sin librería de iconos, todos inline como componentes." },
      { t: "Formato es-VE", d: "Cuota, total e intereses formateados con Intl para el mercado local." },
    ],
    decisions: [
      "Modelado de la gracia: el interés se capitaliza durante 6 meses antes de amortizar; el plazo se ajusta para incluir la gracia.",
      "Rangos por perfil de productor: el monto se recorta al rango del perfil elegido al cambiar de pestaña.",
      "Optimización de carga: WebP locales en lugar de Unsplash y PNG; importados como módulos de Vite para hashing y cache-busting.",
      "SEO para compartir: Open Graph y Twitter Card configurados desde site.json para que el sitio se vea bien en WhatsApp y redes.",
    ],
    stack: ["React 19", "TypeScript", "Vite", "Tailwind CSS 4", "Render", "Figma Make"],
    metrics: [
      { value: "8", label: "Secciones" },
      { value: "5", label: "Plazos" },
      { value: "6", label: "Meses de gracia" },
      { value: "2", label: "Perfiles" },
    ],
    gallery: 4,
  },
};