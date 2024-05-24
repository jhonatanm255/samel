// /js/main.js

document.addEventListener('DOMContentLoaded', function() {
    const menuHamburguesa = document.getElementById('btn-menu-bar');
    const navItems = document.querySelector('.nav-items');

    menuHamburguesa.addEventListener('click', function() {
        navItems.classList.toggle('active');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar los módulos
    initAnimation();
    initTestimonials();
});

function initAnimation() {
    // Código para inicializar la animación
}

function initTestimonials() {
    // Código para inicializar los testimonios
}

const btnCloseFormLogin = document.getElementById('btn-close-form-login');

btnCloseFormLogin.addEventListener('click', (e) => {
    e.preventDefault();
    const formCerrar = document.querySelector('.content-form-admin');
    formCerrar.style.display = 'none'; // Esto oculta el formulario de login
    document.body.style.display = 'block'; // Esto muestra el body
});





