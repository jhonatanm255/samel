
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

// TESTIMONIAL SCRIPT
$('.testimonials-container').owlCarousel({
    loop:true,
    autoplay:true,
    autoplayTimeout:6000,
    margin:10,
    nav:true,
    navText:["<i class='fa-solid fa-arrow-left'></i>",
             "<i class='fa-solid fa-arrow-right'></i>"],
    responsive:{
        0:{
            items:1,
            nav:false
        },
        600:{
            items:1,
            nav:true
        },
        768:{
            items:3
        },
    }
});


