// /js/main.js

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

