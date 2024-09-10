document.addEventListener('DOMContentLoaded', function () {
    const dbRef = firebase.database().ref('testimonials');

    // Observador para verificar si hay testimonios al cargar la página
    dbRef.on('value', function (snapshot) {
        const noComent = document.querySelector('.no-comentarios');
        if (!snapshot.exists()) {
            noComent.style.display = 'block';
        } else {
            noComent.style.display = 'none';
        }
    });

    const btnClosed = document.getElementById('closed');
    if (btnClosed) {
        btnClosed.addEventListener('click', () => {
            const modalWindow = document.querySelector('.form-testimonial');
            modalWindow.style.display = 'none';
        });
    }

    // Manejar la selección de estrellas
    const stars = document.querySelectorAll('.rating .fa-star');
    stars.forEach(star => {
        star.addEventListener('click', function () {
            const value = this.getAttribute('data-value');
            document.getElementById('rating').value = value; // Actualiza el campo oculto
            stars.forEach(s => s.classList.remove('selected'));
            for (let i = 0; i < value; i++) {
                stars[i].classList.add('selected');
            }
        });
    });

    // Función para cargar testimonios y configurar el carrusel
    function loadTestimonials() {
        dbRef.on('value', (snapshot) => {
            const testimonialsContainer = $('.testimonials-container');
            testimonialsContainer.trigger('destroy.owl.carousel'); // Destruir el carrusel existente (si existe)
            testimonialsContainer.html(''); // Limpiar contenido previo

            // Si hay testimonios, los cargamos
            if (snapshot.exists()) {
                snapshot.forEach((childSnapshot) => {
                    const childData = childSnapshot.val();
                    const date = new Date(childData.timestamp).toLocaleString();
                    const rating = childData.rating;

                    // Crear estrellas según la calificación
                    let stars = '';
                    for (let i = 1; i <= 5; i++) {
                        stars += `<i class="fa${i <= rating ? ' fas' : ' far'} fa-star"></i>`;
                    }

                    const testimonialCard = `
                        <div class="testimonial-card">
                            <main class="test-card-body">
                                <div class="quote">
                                    <i class="fa fa-quote-left"></i>
                                    <h2>${childData.name}</h2>
                                </div>
                                <p>${childData.message}</p>
                                <div class="ratings">
                                    <div class='stars'>${stars}</div>
                                    <div class="date">${date}</div>
                                </div>
                            </main>
                        </div>
                    `;
                    testimonialsContainer.append(testimonialCard);
                });

                // Inicializar el carrusel después de cargar los testimonios
                initCarousel();

                // Agregar manejador de eventos al botón "closed"
                $('.closed').on('click', function () {
                    const comentarioID = $(this).data('id'); // Obtener el ID del comentario
                    eliminarComentario(comentarioID); // Llamar a la función eliminarComentario con el ID del comentario
                });
            }
        });
    }

    // Función para eliminar un comentario de Firebase
    function eliminarComentario(comentarioID) {
        if (confirm('¿Estás seguro de que deseas eliminar este comentario?')) {
            dbRef.child(comentarioID).remove(); // Eliminar el comentario de la base de datos
        }
    }

    // Función para ocultar puntos adicionales
    function limitDots() {
        const dots = document.querySelectorAll('.owl-dots .owl-dot');
        const maxVisibleDots = 4; // Número máximo de puntos visibles
        const totalDots = dots.length;

        // Ocultar puntos que excedan el límite
        dots.forEach((dot, index) => {
            if (index >= maxVisibleDots) {
                dot.style.display = 'none'; // Oculta los puntos extra
            } else {
                dot.style.display = 'inline-block'; // Muestra los primeros puntos
            }
        });

        // Opción para añadir "..." si hay más puntos de los que se muestran
        if (totalDots > maxVisibleDots) {
            const ellipsis = document.createElement('span');
            ellipsis.innerHTML = ''; // Ellipsis
            ellipsis.classList.add('ellipsis');
            document.querySelector('.owl-dots').appendChild(ellipsis);
        }
    }

    // Inicializar el carrusel después de cargar los testimonios
    function initCarousel() {
        const testimonialsContainer = $('.testimonials-container'); // Contenedor del carrusel

        testimonialsContainer.owlCarousel({
            loop: true,
            autoplay: true,
            autoplayTimeout: 6000,
            margin: 10,
            nav: true,
            navText: ["<i class='fa-solid fa-arrow-left'></i>", "<i class='fa-solid fa-arrow-right'></i>"],
            responsive: {
                0: {
                    items: 1,
                    nav: true
                },
                600: {
                    items: 2,
                    nav: true
                },
                768: {
                    items: 2,
                    nav: true
                },
                1024: {
                    items: 3,
                    nav: true
                },
                1440: {
                    items: 3,
                    nav: true
                },
            },
            onInitialized: limitDots // Llama a limitDots cuando se inicializa el carrusel
        });
    }

    // Cargar testimonios al iniciar la página
    loadTestimonials();
});
