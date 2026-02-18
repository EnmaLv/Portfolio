if (typeof window !== "undefined") {
  window.addEventListener("DOMContentLoaded", () => {
    console.log("DOM Cargado - Iniciando scripts");
    
    let lastScroll = 0;

    // Elementos del DOM
    const navbar = document.getElementById("navbar");
    const themeToggle = document.getElementById("themeToggle");
    const navCenter = document.querySelector(".nav-center");
    const mainLogo = document.getElementById("mainLogo");
    let isProgrammaticScroll = false;

    console.log("Navbar:", navbar);
    console.log("Theme Toggle:", themeToggle);
    console.log("Nav Center:", navCenter);

    if (!navbar || !themeToggle) {
      console.error("No se encontraron elementos esenciales");
      return;
    }

        // ===== CONFIGURACIÓN DE I18NEXT =====
    const resources = {
      es: {
        translation: {
          "header": {
            "hero-title": {
              "prefix": "Soy",
              "role": "Desarrollador | Fullstack"
            },
            "hero-description": "Mi superpoder es convertir código en soluciones reales. Desarrollo experiencias Full-Stack eficientes, modernas y escalables.",
            "hero-btn": "Conóceme"
          },

          "about": {
            "title": "Sobre mí",
            "intro": "Mi nombre es <strong>Enmanuel Medina</strong>. Fui mordido por una araña desarrolladora y desde hace un año descubrí que mi verdadera habilidad es transformar ideas en código.",
            "description": "Como desarrollador <strong>Full-Stack</strong>, tejo soluciones entre el frontend y el backend, construyendo experiencias digitales modernas, rápidas y con impacto real.",
            "education": "Me formé como <strong>Técnico en Informática</strong> y complemento mi aprendizaje de manera autodidacta, enfrentando nuevos retos y tecnologías en cada proyecto."
          },

          "projects": {
            "section_title": "Proyectos",
            "btn_images": "Ver imágenes",
            "item1": {
              "title": "Bienestar Estudiantil (Gestión Universitaria)",
              "description": "Desarrollo de una solución integral para la <strong>UPTP \"JJ Montilla\"</strong> destinada a automatizar los procesos de la Unidad de Bienestar Estudiantil. El sistema digitaliza la gestión y el control de beneficios, eliminando la dependencia de registros manuales.<br /><br />Implementado bajo la metodología <strong>Métrica v3</strong>, garantizando un ciclo de vida robusto."
            },
            "item2": {
              "title": "Sistema de Gestión Académica",
              "description": "Plataforma Full-Stack diseñada para digitalizar y optimizar la gestión de servicios estudiantiles."
            }
          },

          "contact": {
            "title": "Contacto",
            "description": "¿Tienes un proyecto en mente o quieres charlar sobre tecnología? ¡Dispárame una telaraña! Estoy disponible para nuevas oportunidades.",
            "email_label": "Email",
            "copy_status": "¡Copiado!",
            "sending": "Lanzando telaraña...",
            "form": {
              "name": "Nombre",
              "message": "Mensaje",
              "button": "Enviar Mensaje"
            },
            "placeholders": {
              "name": "Tu nombre",
              "message": "¿En qué puedo ayudarte?"
            }
          },

          "nav": {
            "home": "Inicio",
            "about-me": "Sobre Mí",
            "projects": "Proyectos",
            "contact": "Contacto"
          },

          "footer": {
            "tagline": "Construyendo el futuro digital, un bit a la vez. 🕷️",
            "nav_title": "Navegación",
            "copy": "&copy; 2024 EnmaDev. Hecho con ❤️ y mucha cafeína."
          },

          "alerts": {
            "success_title": "¡Mensaje Enviado! 🕷️",
            "success_body": "Tu mensaje ha sido enviado exitosamente. ¡Nos vemos en la telaraña!",
            "error_title": "¡Ups! Algo salió mal",
            "error_body": "Hubo un problema. Inténtalo de nuevo.",
            "close_btn": "Cerrar" // <-- Agregar esta
          }
        }
      },
      en: {
        translation: {
          "header": {
            "hero-title": {
              "prefix": "I'm",
              "role": "Fullstack Developer"
            },
            "hero-description": "My superpower is turning code into real solutions. I develop efficient, modern, and scalable Full-Stack experiences.",
            "hero-btn": "Get to know me"
          },

          "about": {
            "title": "About me",
            "intro": "My name is <strong>Enmanuel Medina</strong>. I was bitten by a developer spider, and a year ago I discovered my true ability is transforming ideas into code.",
            "description": "As a <strong>Full-Stack</strong> developer, I weave solutions between frontend and backend, building modern, fast digital experiences with real impact.",
            "education": "I trained as an <strong>IT Technician</strong> and complement my learning as an autodidact, facing new challenges and technologies in every project."
          },

          "projects": {
            "section_title": "Projects",
            "btn_images": "View Images",
            "item1": {
              "title": "Student Wellness (University Management)",
              "description": "Development of a comprehensive solution for <strong>UPTP \"JJ Montilla\"</strong> designed to automate the Student Wellness Unit processes. The system digitalizes benefit management and control, eliminating manual paper records.<br /><br />Implemented using <strong>Métrica v3</strong> methodology, ensuring a robust development lifecycle."
            },
            "item2": {
              "title": "Academic Management System",
              "description": "Full-Stack platform designed to digitalize and optimize the management of student services."
            }
          },

          "contact": {
            "title": "Contact",
            "description": "Have a project in mind or want to chat about tech? Shoot me a web! I'm available for new opportunities.",
            "email_label": "Email",
            "copy_status": "Copied!",
            "sending": "Shooting web...",
            "form": {
              "name": "Name",
              "message": "Message",
              "button": "Send Message"
            },
            "placeholders": {
              "name": "Your name",
              "message": "How can I help you?"
            }
          },

          "nav": {
            "home": "Home",
            "about-me": "About Me",
            "projects": "Projects",
            "contact": "Contact"
          },
          "footer": {
            "tagline": "Building the digital future, one bit at a time. 🕷️",
            "nav_title": "Navigation",
            "copy": "&copy; 2024 EnmaDev. Made with ❤️ and lots of caffeine."
          },
          
          "alerts": {
            "success_title": "Message Sent! 🕷️",
            "success_body": "Your message has been sent successfully. See you in the web!",
            "error_title": "Oops! Something went wrong",
            "error_body": "There was a problem. Please try again.",
            "close_btn": "Close" // <-- Agregar esta
          }
        }
      }
    };

    // Inicializar i18next
    i18next
      .use(i18nextBrowserLanguageDetector) // Detecta el idioma del navegador automáticamente
      .init({
        resources,
        fallbackLng: "es", // Idioma por defecto
        debug: false
      }, function(err, t) {
        updateContent();
      });

    // Función para actualizar todos los textos
    function updateContent() {
      // Traducir textos normales
      document.querySelectorAll('[data-i18n]').forEach(el => {
        el.innerHTML = i18next.t(el.getAttribute('data-i18n'));
      });

      // Traducir placeholders
      document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        el.placeholder = i18next.t(el.getAttribute('data-i18n-placeholder'));
      });
    }

    // Evento para el select de idioma
    const languageSelect = document.getElementById("languageSelect");
    if (languageSelect) {
      languageSelect.addEventListener("change", (e) => {
        i18next.changeLanguage(e.target.value, () => {
          updateContent();
        });
      });
    }

    // ===== CUSTOM ALERT SPIDER-VERSE =====
    function showCustomAlert(type, title, message) {
      const alertHTML = `
        <div class="custom-alert" id="custom-alert">
          <div class="alert-box">
            <div class="alert-icon">
              ${type === 'success' ? `
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              ` : `
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3"/>
                  <path d="M12 8v4M12 16h.01" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
                </svg>
              `}
            </div>

            <h2 class="alert-title">${title}</h2>
            <p class="alert-message">${message}</p>

            <button class="alert-btn" onclick="closeCustomAlert()">
              ${i18next.t('alerts.close_btn')}
            </button>

          </div>
        </div>
      `;

      document.body.insertAdjacentHTML('beforeend', alertHTML);
      requestAnimationFrame(() => {
        document.getElementById('custom-alert').classList.add('active');
      });
    }

    window.closeCustomAlert = function () {
      const alert = document.getElementById('custom-alert');
      if (alert) {
        alert.classList.remove('active');
        setTimeout(() => alert.remove(), 200);
      }
    };

    // ===== LÓGICA DE COPIAR EMAIL AL PORTAPAPELES =====
    const copyEmailCard = document.getElementById("copy-email");
    const copyStatus = document.getElementById("copy-status");

    if (copyEmailCard) {
      copyEmailCard.addEventListener("click", () => {
        const email = copyEmailCard.getAttribute("data-email");

        navigator.clipboard.writeText(email).then(() => {
          // Mostrar feedback visual
          copyStatus.classList.add("show");

          // Cambiar el estilo de la tarjeta momentáneamente
          copyEmailCard.style.borderColor = "var(--color-primary-glow)";
          
          // Ocultar el aviso después de 2 segundos
          setTimeout(() => {
            copyStatus.classList.remove("show");
            copyEmailCard.style.borderColor = "";
          }, 2000);
        }).catch(err => {
          console.error('Error al copiar: ', err);
        });
      });
    }


    // ===== FORMULARIO DE CONTACTO =====
    const contactForm = document.getElementById("form-contacto");
    if (contactForm) {
      contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;

        submitBtn.disabled = true;
        // Aquí usamos i18next para el texto de carga (Asegúrate de tener "sending" en tu JSON)
        submitBtn.innerHTML = i18next.t('contact.sending') || 'Lanzando telaraña...';

        try {
          const response = await fetch(contactForm.action, {
            method: "POST",
            body: formData,
            headers: { 'Accept': 'application/json' }
          });

          if (response.ok) {
            // ALERTA DE ÉXITO TRADUCIDA
            showCustomAlert(
              'success',
              i18next.t('alerts.success_title'),
              i18next.t('alerts.success_body')
            );
            contactForm.reset();
          } else {
            // ALERTA DE ERROR DEL SERVIDOR TRADUCIDA
            showCustomAlert(
              'error',
              i18next.t('alerts.error_title'),
              i18next.t('alerts.error_body')
            );
          }
        } catch (error) {
          // ALERTA DE ERROR DE CONEXIÓN
          showCustomAlert(
            'error',
            i18next.t('alerts.error_title'),
            i18next.t('alerts.error_body')
          );
        } finally {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }
      });
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
      const footerLogo = document.getElementById("footerLogo");

      mainLogo.style.opacity = "0";
      if(footerLogo) footerLogo.style.opacity = "0";

      setTimeout(() => {
        const logoSrc = isDark ? "/images/Logo-light.webp" : "/images/Logo-dark.webp";
        mainLogo.src = logoSrc
          if(footerLogo) footerLogo.src = logoSrc;

        mainLogo.style.opacity = "1";
        if(footerLogo) footerLogo.style.opacity = "1";
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