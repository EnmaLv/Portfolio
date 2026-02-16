if (typeof window !== "undefined") {
  window.addEventListener("DOMContentLoaded", () => {
    let lastScroll = 0;

    // Elementos del DOM
    const navbar = document.getElementById("navbar");
    const themeToggle = document.getElementById("themeToggle");
    const navCenter = document.querySelector(".nav-center");
    const languageSelect = document.getElementById("languageSelect");
    const mainLogo = document.getElementById("mainLogo");
    let isProgrammaticScroll = false;

    if (!navbar || !themeToggle) return;

    // ===== MENÚ MÓVIL =====
    // Crear botón de hamburguesa si no existe
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
      
      // Insertar el botón antes del nav-right
      const navRight = document.querySelector(".nav-right");
      if (navRight) {
        navRight.parentNode.insertBefore(mobileToggle, navRight);
      }
    }

    // Crear overlay para el menú móvil
    let overlay = document.querySelector(".mobile-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.className = "mobile-overlay";
      document.body.appendChild(overlay);
    }

    // Toggle del menú móvil
    const toggleMobileMenu = () => {
      const isActive = mobileToggle.classList.toggle("active");
      navCenter?.classList.toggle("active");
      overlay.classList.toggle("active");
      
      // Cambiar aria-label
      mobileToggle.setAttribute(
        "aria-label",
        isActive ? "Cerrar menú" : "Abrir menú"
      );
      
      // Prevenir scroll cuando el menú está abierto
      document.body.style.overflow = isActive ? "hidden" : "";
    };

    // Event listeners para menú móvil
    mobileToggle.addEventListener("click", toggleMobileMenu);
    overlay.addEventListener("click", toggleMobileMenu);

    // Cerrar menú al hacer click en un enlace
    const navLinks = document.querySelectorAll(".nav-center a");
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        if (navCenter?.classList.contains("active")) {
          toggleMobileMenu();
        }
      });
    });

    // ===== SCROLL SHOW/HIDE NAVBAR =====
    let ticking = false;
    
    const handleScroll = () => {
      const currentScroll = window.pageYOffset;

      // Si es scroll automático solo actualizamos referencia
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
        src="${isDark ? '/images/sun.png' : '/images/moon-svgrepo-com.svg'}" 
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
          ? "/images/Logo-Light.png"
          : "/images/Logo-Dark.png";

        mainLogo.style.opacity = "1";
      }, 100);
    };


    themeToggle.addEventListener("click", () => {
      const isDark = document.body.classList.toggle("dark");
      
      localStorage.setItem("theme", isDark ? "dark" : "light");
      updateThemeIcon(isDark);
      updateLogo(isDark);
    });


    // Cargar preferencia guardada o detectar preferencia del sistema
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


    // Escuchar cambios en la preferencia del sistema
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

    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        
        if (target) {
          const offsetTop = target.offsetTop - navbar.offsetHeight;
          isProgrammaticScroll = true;

            window.scrollTo({
              top: offsetTop,
              behavior: "smooth"
            });

            // desactivar la bandera después de que termine
            setTimeout(() => {
              isProgrammaticScroll = false;
            }, 700);

        }
      });
    });

    // ===== LANGUAGE SELECT (preparado para futuras traducciones) =====
    if (languageSelect) {
      // Cargar idioma guardado
      const savedLang = localStorage.getItem("language") || "es";
      languageSelect.value = savedLang;

      languageSelect.addEventListener("change", (e) => {
        const selectedLang = e.target.value;
        localStorage.setItem("language", selectedLang);
        
        // Aquí puedes agregar la lógica para cambiar el idioma
        console.log(`Idioma cambiado a: ${selectedLang}`);
        // document.documentElement.lang = selectedLang;
      });
    }

    // ===== CERRAR MENÚ MÓVIL AL CAMBIAR TAMAÑO DE VENTANA =====
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
    // Agregar clase para animaciones cuando la página carga
    setTimeout(() => {
      navbar.classList.add("loaded");
    }, 100);

  });
}