
// FUNCION PARA LA ANIMACION DE LOS VALORES DE LA SECCION DE EXPERIENCIA
document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Deja de observar una vez que se ha animado
            }
        });
    }, {
        threshold: 0.5 // Inicia la animación cuando el 50% del elemento sea visible
    });

    const items = document.querySelectorAll('.hidden');
    items.forEach(item => {
        observer.observe(item);
    });
});




