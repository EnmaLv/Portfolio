if (typeof window !== "undefined") {
  window.addEventListener("DOMContentLoaded", () => {
    
    
    let lastScroll = 0;

    const navbar = document.getElementById("navbar");
    const themeToggle = document.getElementById("themeToggle");
    const navCenter = document.querySelector(".nav-center");
    const languageSelect = document.getElementById("languageSelect");
    const mainLogo = document.getElementById("mainLogo");
    let isProgrammaticScroll = false;


    if (!navbar || !themeToggle) {
      console.error("No se encontraron elementos esenciales");
      return;
    }

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

    function smoothScrollTo(targetPosition, duration = 800) {
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      let startTime = null;

      function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
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

    const supportsNativeSmoothScroll = 'scrollBehavior' in document.documentElement.style;
    
    const allLinks = document.querySelectorAll('a[href^="#"]');
    
    allLinks.forEach((link, index) => {
      
      link.addEventListener("click", function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute("href");
        
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
        
        if (targetElement) {
          if (navCenter?.classList.contains("active")) {
            toggleMobileMenu();
          }
          
          isProgrammaticScroll = true;
          
          const navbarHeight = navbar.offsetHeight;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
          
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

    if (languageSelect) {
      const savedLang = localStorage.getItem("language") || "es";
      languageSelect.value = savedLang;

      languageSelect.addEventListener("change", (e) => {
        const selectedLang = e.target.value;
        localStorage.setItem("language", selectedLang);
      });
    }

    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (window.innerWidth > 768 && navCenter?.classList.contains("active")) {
          toggleMobileMenu();
        }
      }, 250);
    });

    setTimeout(() => {
      navbar.classList.add("loaded");
    }, 100);

  });
}