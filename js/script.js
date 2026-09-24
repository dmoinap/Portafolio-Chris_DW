// Esperar a que cargue todo el documento HTML
document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
    1. CAMBIO DE TEMA (Modo Claro / Modo Oscuro)
    ========================================== */
    const themeToggleBtn = document.querySelector('[data-theme-toggle]');
    
    if (themeToggleBtn) {
        // Detectar si el usuario ya tenía una preferencia guardada
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
        themeToggleBtn.textContent = savedTheme === 'light' ? '☀️' : '🌙';
        
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        
            // Cambiar el icono del botón
            themeToggleBtn.textContent = newTheme === 'light' ? '☀️' : '🌙';
        });
    }
    
    /* ==========================================
    2. MENÚ RESPONSIVE (Móviles)
    ========================================== */
    const navToggleBtn = document.querySelector('[data-nav-toggle]');
    const navLinks = document.querySelector('[data-nav-links]');
    
    if (navToggleBtn && navLinks) {
        navToggleBtn.addEventListener('click', () => {
            navLinks.classList.toggle('nav-open');
            const isExpanded = navToggleBtn.getAttribute('aria-expanded') === 'true';
            navToggleBtn.setAttribute('aria-expanded', !isExpanded);
        });
    }
    
    /* ==========================================
    3. AÑO DINÁMICO EN EL FOOTER
    ========================================== */
    const footerText = document.querySelector('.site-footer p');
    if (footerText) {
        const currentYear = new Date().getFullYear();
        footerText.innerHTML = `© ${currentYear} Dyanne Moina. Portafolio construido con HTML, CSS y JavaScript.`;
    }
});