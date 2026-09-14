document.addEventListener('DOMContentLoaded', () => {
  // ===== TEMA CLARO / OSCURO =====
  const themeToggle = document.getElementById('themeToggle');
  const htmlEl = document.documentElement;

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlEl.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

      htmlEl.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }

  // ===== ANIMACIÓN REVEAL =====
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // ===== COPIAR CORREO =====
  const emailCard = document.getElementById('copy-email-card');
  const copiedBadge = document.getElementById('copied-badge');

  if (emailCard && copiedBadge) {
    emailCard.addEventListener('click', () => {
      navigator.clipboard.writeText('medina.enma1234@gmail.com').then(() => {
        copiedBadge.style.display = 'inline-block';
        setTimeout(() => {
          copiedBadge.style.display = 'none';
        }, 2000);
      });
    });
  }

  // ===== CAMBIO DE IDIOMA =====
  const btnEs = document.getElementById('btn-lang-es');
  const btnEn = document.getElementById('btn-lang-en');

  function switchLang(lang) {
    document.querySelectorAll('[data-es]').forEach(el => {
      const text = el.getAttribute(`data-${lang}`);
      if (text) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.setAttribute('placeholder', text);
        } else {
          el.innerHTML = text.replace(/\n/g, '<br/>');
        }
      }
    });

    if (btnEs && btnEn) {
      if (lang === 'es') {
        btnEs.style.color = 'var(--color-crimson)';
        btnEn.style.color = 'rgba(255,255,255,0.45)';
      } else {
        btnEn.style.color = 'var(--color-crimson)';
        btnEs.style.color = 'rgba(255,255,255,0.45)';
      }
    }
  }

  btnEs?.addEventListener('click', () => switchLang('es'));
  btnEn?.addEventListener('click', () => switchLang('en'));
});