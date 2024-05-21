
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

// FUNCION PARA AGREGAR LOS COMENTARIOS
document.addEventListener("DOMContentLoaded", function() {
    const dbRef = firebase.database().ref('testimonials');

    // Observador para verificar si hay testimonios al cargar la página
    dbRef.once('value', function(snapshot) {
        if (!snapshot.exists()) {
            alert('No existen comentarios en esta sección');
        }
    });

    // Función para agregar un testimonio
    function addTestimonial(name, message) {
        const newTestimonialRef = dbRef.push();
        newTestimonialRef.set({
            name: name,
            message: message,
            timestamp: firebase.database.ServerValue.TIMESTAMP
        });
    }

    // FUNCION PARA ABRIR LA VENTANA MODAL DEL FORMULARIO DE COMENTARIOS
    const btnModal = document.getElementById('modal');
    btnModal.addEventListener('click', () => {
        const modalWindow = document.querySelector('.form-testimonial');
        modalWindow.style.display = 'block'
    })

    // Manejar el envío del formulario
    document.getElementById('send').addEventListener('click', function() {
        const name = document.getElementById('name').value;
        const message = document.getElementById('msj').value;

        if (name && message) {
            addTestimonial(name, message);
            document.getElementById('name').value = '';
            document.getElementById('msj').value = '';
            swal("Enviado", "", "success");
            
        } else {
            swal("Por favor, complete los campos", "", "error").then(() => {
                modalWindow.style.display = 'block';
            });
        };

        const modalWindow = document.querySelector('.form-testimonial');
        modalWindow.style.display = 'none'
    });

    // Función para cargar testimonios y configurar el carrusel
    function loadTestimonials() {
        dbRef.on('value', (snapshot) => {
            const testimonialsContainer = $('.testimonials-container');
            testimonialsContainer.owlCarousel('destroy'); // Destruir el carrusel existente
            testimonialsContainer.html(''); // Limpiar contenido previo

            snapshot.forEach((childSnapshot) => {
                const childData = childSnapshot.val();
                const testimonialCard = `
                    <div class="testimonial-card">
                        <main class="test-card-body">
                            <div class="quote">
                                <i class="fa fa-quote-left"></i>
                                <h2>${childData.name}</h2>
                            </div>
                            <p>${childData.message}</p>
                            <div class="ratings">
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                            </div>
                        </main>
                    </div>
                `;
                testimonialsContainer.append(testimonialCard);
            });

            // Inicializar el carrusel después de cargar los testimonios
            testimonialsContainer.owlCarousel({
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
                        nav:true
                    },
                    600:{
                        items:2,
                        nav:true
                    },
                    768:{
                        items:3,
                        nav:true
                    },
                }
            });
        });
    }

    // Cargar testimonios al iniciar la página
    loadTestimonials();
});







