if (typeof window !== "undefined") {
  window.addEventListener("DOMContentLoaded", () => {
    console.log("DOM Cargado - Iniciando scripts");
    
    let lastScroll = 0;

    // Elementos del DOM
    const navbar = document.getElementById("navbar");
    const themeToggle = document.getElementById("themeToggle");
    const navCenter = document.querySelector(".nav-center");
    const languageSelect = document.getElementById("languageSelect");
    const mainLogo = document.getElementById("mainLogo");
    let isProgrammaticScroll = false;

    console.log("Navbar:", navbar);
    console.log("Theme Toggle:", themeToggle);
    console.log("Nav Center:", navCenter);

    if (!navbar || !themeToggle) {
      console.error("No se encontraron elementos esenciales");
      return;
    }

    // ===== MENÚ MÓVIL =====
    let mobileToggle = document.querySelector(".mobile-menu-toggle");
    if (!mobileToggle) {
      mobileToggle = document.createElement("button");
      mobileToggle.className = "mobile-menu-toggle";
      mobileToggle.setAttribute("aria-label", "Abrir menú");
      mobileToggle.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
      `;
      
      const navRight = document.querySelector(".nav-right");
      if (navRight) {
        navRight.parentNode.insertBefore(mobileToggle, navRight);
      }
    }

    let overlay = document.querySelector(".mobile-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.className = "mobile-overlay";
      document.body.appendChild(overlay);
    }

    const toggleMobileMenu = () => {
      const isActive = mobileToggle.classList.toggle("active");
      navCenter?.classList.toggle("active");
      overlay.classList.toggle("active");
      
      mobileToggle.setAttribute(
        "aria-label",
        isActive ? "Cerrar menú" : "Abrir menú"
      );
      
      document.body.style.overflow = isActive ? "hidden" : "";
    };

    mobileToggle.addEventListener("click", toggleMobileMenu);
    overlay.addEventListener("click", toggleMobileMenu);

    // ===== SMOOTH SCROLL - VERSIÓN MEJORADA =====
    console.log("Configurando smooth scroll...");
    
    // Función de smooth scroll manual (fallback)
    function smoothScrollTo(targetPosition, duration = 800) {
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      let startTime = null;

      function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        // Easing function (ease-in-out)
        const ease = progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        window.scrollTo(0, startPosition + distance * ease);

        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        } else {
          isProgrammaticScroll = false;
        }
      }

      requestAnimationFrame(animation);
    }

    // Detectar si el navegador soporta smooth scroll
    const supportsNativeSmoothScroll = 'scrollBehavior' in document.documentElement.style;
    console.log("Soporte nativo de smooth scroll:", supportsNativeSmoothScroll);
    
    // Seleccionar TODOS los enlaces que empiecen con #
    const allLinks = document.querySelectorAll('a[href^="#"]');
    console.log("Enlaces encontrados:", allLinks.length);
    
    allLinks.forEach((link, index) => {
      console.log(`Link ${index}:`, link.getAttribute("href"));
      
      link.addEventListener("click", function(e) {
        e.preventDefault();
        console.log("Click en enlace:", this.getAttribute("href"));
        
        const targetId = this.getAttribute("href");
        
        // Si es solo "#", ir al inicio
        if (targetId === "#") {
          isProgrammaticScroll = true;
          if (supportsNativeSmoothScroll) {
            window.scrollTo({
              top: 0,
              behavior: "smooth"
            });
            setTimeout(() => {
              isProgrammaticScroll = false;
            }, 1000);
          } else {
            smoothScrollTo(0);
          }
          return;
        }
        
        const targetElement = document.querySelector(targetId);
        console.log("Elemento objetivo:", targetElement);
        
        if (targetElement) {
          // Cerrar menú móvil si está abierto
          if (navCenter?.classList.contains("active")) {
            toggleMobileMenu();
          }
          
          // Activar bandera
          isProgrammaticScroll = true;
          
          // Calcular posición
          const navbarHeight = navbar.offsetHeight;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
          
          console.log("Scrolling a:", offsetPosition);
          
          // Usar scroll nativo o fallback
          if (supportsNativeSmoothScroll) {
            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth"
            });
            
            setTimeout(() => {
              isProgrammaticScroll = false;
            }, 1000);
          } else {
            smoothScrollTo(offsetPosition);
          }
        } else {
          console.error("No se encontró el elemento:", targetId);
        }
      });
    });

    // ===== SCROLL SHOW/HIDE NAVBAR =====
    let ticking = false;
    
    const handleScroll = () => {
      const currentScroll = window.pageYOffset;

      if (isProgrammaticScroll) {
        lastScroll = currentScroll;
        ticking = false;
        return;
      }

      if (currentScroll > lastScroll && currentScroll > 80) {
        navbar.classList.add("hidden");
      } else {
        navbar.classList.remove("hidden");
      }

      lastScroll = currentScroll <= 0 ? 0 : currentScroll;
      ticking = false;
    };

    window.addEventListener("scroll", () => {
      if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
      }
    });

    // ===== DARK MODE TOGGLE =====
    const updateThemeIcon = (isDark) => {
      themeToggle.innerHTML = `
        <img 
          src="${isDark ? '/images/sun.png' : '/images/moon.svg'}" 
          alt="${isDark ? 'Modo claro' : 'Modo oscuro'}"
          class="theme-icon"
        />
      `;

      themeToggle.setAttribute(
        "aria-label",
        isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"
      );
    };

    const updateLogo = (isDark) => {
      if (!mainLogo) return;

      mainLogo.style.opacity = "0";

      setTimeout(() => {
        mainLogo.src = isDark
          ? "/images/Logo-light.webp"
          : "/images/Logo-dark.webp";

        mainLogo.style.opacity = "1";
      }, 100);
    };

    themeToggle.addEventListener("click", () => {
      const isDark = document.body.classList.toggle("dark");
      
      localStorage.setItem("theme", isDark ? "dark" : "light");
      updateThemeIcon(isDark);
      updateLogo(isDark);
    });

    // Cargar tema guardado
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
      document.body.classList.add("dark");
      updateThemeIcon(true);
      updateLogo(true);
    } else {
      updateThemeIcon(false);
      updateLogo(false);
    }

    // Escuchar cambios del sistema
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      if (!localStorage.getItem("theme")) {
        if (e.matches) {
          document.body.classList.add("dark");
          updateThemeIcon(true);
          updateLogo(true);
        } else {
          document.body.classList.remove("dark");
          updateThemeIcon(false);
          updateLogo(false);
        }
      }
    });

    // ===== LANGUAGE SELECT =====
    if (languageSelect) {
      const savedLang = localStorage.getItem("language") || "es";
      languageSelect.value = savedLang;

      languageSelect.addEventListener("change", (e) => {
        const selectedLang = e.target.value;
        localStorage.setItem("language", selectedLang);
        console.log(`Idioma cambiado a: ${selectedLang}`);
      });
    }

    // ===== CERRAR MENÚ MÓVIL AL REDIMENSIONAR =====
    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (window.innerWidth > 768 && navCenter?.classList.contains("active")) {
          toggleMobileMenu();
        }
      }, 250);
    });

    // ===== ANIMACIÓN DE ENTRADA =====
    setTimeout(() => {
      navbar.classList.add("loaded");
    }, 100);

    console.log("Todos los scripts inicializados correctamente");

    // ===== GALERÍA DE IMÁGENES (LIGHTBOX) =====
    const galleryModal = document.getElementById("gallery-modal");
    const modalImage = document.getElementById("modal-image");
    const modalClose = document.querySelector(".modal-close");
    const modalPrev = document.querySelector(".modal-prev");
    const modalNext = document.querySelector(".modal-next");
    const currentImageSpan = document.getElementById("current-image");
    const totalImagesSpan = document.getElementById("total-images");

    let currentGalleryImages = [];
    let currentImageIndex = 0;

    // Función para abrir la galería
    function openGallery(projectId) {
      const projectCard = document.querySelector(`[data-project="${projectId}"]`);
      const galleryImages = projectCard.querySelectorAll(".project-gallery img");
      
      if (galleryImages.length === 0) return;

      // Convertir NodeList a array de URLs
      currentGalleryImages = Array.from(galleryImages).map(img => ({
        src: img.src,
        alt: img.alt
      }));
      
      currentImageIndex = 0;
      
      // Mostrar modal
      galleryModal.classList.add("active");
      document.body.style.overflow = "hidden";
      
      // Actualizar imagen y contador
      updateGalleryImage();
      
      console.log(`Galería abierta: ${projectId} con ${currentGalleryImages.length} imágenes`);
    }

    // Función para actualizar la imagen mostrada
    function updateGalleryImage() {
      const currentImg = currentGalleryImages[currentImageIndex];
      modalImage.src = currentImg.src;
      modalImage.alt = currentImg.alt;
      
      currentImageSpan.textContent = currentImageIndex + 1;
      totalImagesSpan.textContent = currentGalleryImages.length;
      
      // Ocultar flechas si solo hay 1 imagen
      if (currentGalleryImages.length === 1) {
        modalPrev.classList.add("hidden");
        modalNext.classList.add("hidden");
      } else {
        modalPrev.classList.remove("hidden");
        modalNext.classList.remove("hidden");
      }
    }

    // Función para cerrar la galería
    function closeGallery() {
      galleryModal.classList.remove("active");
      document.body.style.overflow = "";
      currentGalleryImages = [];
      currentImageIndex = 0;
    }

    // Función para imagen siguiente
    function nextImage() {
      currentImageIndex = (currentImageIndex + 1) % currentGalleryImages.length;
      updateGalleryImage();
    }

    // Función para imagen anterior
    function prevImage() {
      currentImageIndex = (currentImageIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
      updateGalleryImage();
    }

    // Event listeners para los botones de galería
    const galleryButtons = document.querySelectorAll("[data-gallery]");
    galleryButtons.forEach(button => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        const projectId = button.getAttribute("data-gallery");
        openGallery(projectId);
      });
    });

    // Event listeners del modal
    if (modalClose) {
      modalClose.addEventListener("click", closeGallery);
    }

    if (modalPrev) {
      modalPrev.addEventListener("click", prevImage);
    }

    if (modalNext) {
      modalNext.addEventListener("click", nextImage);
    }

    // Cerrar con ESC o click fuera de la imagen
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && galleryModal.classList.contains("active")) {
        closeGallery();
      }
    });

    // Navegar con flechas del teclado
    document.addEventListener("keydown", (e) => {
      if (!galleryModal.classList.contains("active")) return;
      
      if (e.key === "ArrowRight") {
        nextImage();
      } else if (e.key === "ArrowLeft") {
        prevImage();
      }
    });

    // Cerrar al hacer click en el fondo
    galleryModal?.addEventListener("click", (e) => {
      if (e.target === galleryModal) {
        closeGallery();
      }
    });

  });
}