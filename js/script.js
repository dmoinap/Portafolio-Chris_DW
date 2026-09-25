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
        let scrollPositionWhenOpened = 0;
        // Abrir o cerrar el menú
        navToggleBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            navLinks.classList.toggle('nav-open');
            const isOpen = navLinks.classList.contains('nav-open');
            navToggleBtn.setAttribute('aria-expanded', isOpen);
            // Guardamos la posición solamente cuando se abre
            if (isOpen) {
                scrollPositionWhenOpened = window.scrollY;
            }
        });
    
        // Cerrar el menú al seleccionar una opción
        navLinks.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('nav-open');
                navToggleBtn.setAttribute(
                    'aria-expanded',
                    'false'
                );
            });
        });
    
        // Cerrar el menú al hacer clic fuera
        document.addEventListener('click', (event) => {
            const clickedInsideMenu = navLinks.contains(event.target);
            const clickedButton = navToggleBtn.contains(event.target);
            if (!clickedInsideMenu && !clickedButton) {
                navLinks.classList.remove('nav-open');
                navToggleBtn.setAttribute(
                    'aria-expanded',
                    'false'
                );
            }
        });
    
        // Cerrar el menú si el usuario realmente se desplaza
        window.addEventListener('scroll', () => {
            const scrollDifference =
                Math.abs(window.scrollY - scrollPositionWhenOpened);
            if (navLinks.classList.contains('nav-open') && scrollDifference > 20) {
                navLinks.classList.remove('nav-open');
                navToggleBtn.setAttribute('aria-expanded','false');
            }
        });
    }

    /* ==========================================
    3. FILTRO DE PROYECTOS
    ========================================== */
    
    const filterButtons = document.querySelectorAll('[data-filter]');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length > 0 && projectCards.length > 0) {
        filterButtons.forEach((button) => {
            button.addEventListener('click', () => {
                const selectedFilter = button.dataset.filter;
                // Cambiar el botón activo
                filterButtons.forEach((filterButton) => {
                    filterButton.classList.remove('active');
                });
                button.classList.add('active');
                // Mostrar u ocultar proyectos
                projectCards.forEach((project) => {
                    const categories =
                        project.dataset.category.split(' ');
                    if ( selectedFilter === 'all' || categories.includes(selectedFilter) ) {
                        project.classList.remove('is-hidden');
                    } else {
                        project.classList.add('is-hidden');
                    }
                });
            });
        });
    }

    /* ==========================================
    4. VALIDACIÓN DEL FORMULARIO DE CONTACTO
    ========================================== */
    const contactForm = document.querySelector('[data-contact-form]');
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const nameInput = contactForm.querySelector('#name');
            const emailInput = contactForm.querySelector('#email');
            const messageInput = contactForm.querySelector('#message');
            const nameError =
                contactForm.querySelector('[data-error="name"]');
            const emailError =
                contactForm.querySelector('[data-error="email"]');
            const messageError =
                contactForm.querySelector('[data-error="message"]');
            const formStatus =
                contactForm.querySelector('[data-form-status]');
            // Limpiar mensajes anteriores
            nameError.textContent = '';
            emailError.textContent = '';
            messageError.textContent = '';
            formStatus.textContent = '';

            let formIsValid = true;

            // Validar nombre
            if (nameInput.value.trim() === '') {
                nameError.textContent =
                    'Por favor, escribe tu nombre.';
                formIsValid = false;
            }

            // Validar correo
            if (emailInput.value.trim() === '') {
                emailError.textContent =
                    'Por favor, escribe tu correo.';
                formIsValid = false;
            } else if (!emailInput.validity.valid) {
                emailError.textContent =
                    'Ingresa un correo electrónico válido.';
                formIsValid = false;
            }

            // Validar mensaje
            if (messageInput.value.trim() === '') {
                messageError.textContent =
                    'Por favor, escribe un mensaje.';
                formIsValid = false;
            }

            // Si todo está correcto
            if (formIsValid) {
                formStatus.textContent =
                    'Formulario validado correctamente.';
                contactForm.reset();
            }
        });
    }
});