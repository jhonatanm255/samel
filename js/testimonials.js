document.addEventListener('DOMContentLoaded', function() {
    const dbRef = firebase.database().ref('testimonials');

    // Observador para verificar si hay testimonios al cargar la página
    dbRef.on('value', function(snapshot) {
        const noComent = document.querySelector('.no-comentarios');
        if (!snapshot.exists()) {
            noComent.style.display = 'block';
        } else {
            noComent.style.display = 'none';
        }
    });

    // Función para agregar un testimonio
    function addTestimonial(name, message, rating) {
        const newTestimonialRef = dbRef.push();
        newTestimonialRef.set({
            name: name,
            message: message,
            rating: parseInt(rating),
            timestamp: firebase.database.ServerValue.TIMESTAMP
        });
    }

    // Función para abrir la ventana modal del formulario de comentarios
    const btnModal = document.getElementById('modal');
    if (btnModal) {
        btnModal.addEventListener('click', () => {
            const modalWindow = document.querySelector('.form-testimonial');
            modalWindow.style.display = 'block';
        });
    }

    const btnClosed = document.getElementById('closed');
    btnClosed.addEventListener('click', () => {
        const modalWindow = document.querySelector('.form-testimonial');
        modalWindow.style.display = 'none';
    });

    // Manejar la selección de estrellas
const stars = document.querySelectorAll('.rating .fa-star');
stars.forEach(star => {
    star.addEventListener('click', function() {
        const value = this.getAttribute('data-value');
        document.getElementById('rating').value = value; // Actualiza el campo oculto
        stars.forEach(s => s.classList.remove('selected'));
        for (let i = 0; i < value; i++) {
            stars[i].classList.add('selected');
        }
    });
});

    // Manejar el envío del formulario
    document.getElementById('send').addEventListener('click', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const message = document.getElementById('msj').value.trim();
        const rating = document.getElementById('rating').value.trim();

        console.log(`Name: ${name}, Message: ${message}, Rating: ${rating}`);

        if (name && message && rating) {
            addTestimonial(name, message, rating);
            document.getElementById('name').value = '';
            document.getElementById('msj').value = '';
            document.getElementById('rating').value = '';
            stars.forEach(star => star.classList.remove('selected'));
            swal("Enviado", "", "success");
            const modalWindow = document.querySelector('.form-testimonial');
                modalWindow.style.display = 'none';
        } else {
            swal("Por favor, complete los campos", "", "error").then(() => {
                const modalWindow = document.querySelector('.form-testimonial');
                modalWindow.style.display = 'block';
            });
        }
    });

    // Función para cargar testimonios y configurar el carrusel
    function loadTestimonials() {
        dbRef.on('value', (snapshot) => {
            const testimonialsContainer = $('.testimonials-container');
            testimonialsContainer.owlCarousel('destroy'); // Destruir el carrusel existente
            testimonialsContainer.html(''); // Limpiar contenido previo

           snapshot.forEach((childSnapshot) => {
                const childData = childSnapshot.val();
                const date = new Date(childData.timestamp).toLocaleString();
                const rating = childData.rating;

                let stars = '<div class="stars">';
                    for (let i = 1; i <= 5; i++) {
                        if (i <= rating) {
                             stars += '<i class="fas fa-star"></i>';
                    } else {
                            stars += '<i class="far fa-star"></i>';
                        }
                }
                    stars += '</div>';


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
                        items: 1,
                        nav: true
                    },
                    768: {
                        items: 2,
                        nav: true
                    },
                    1024: {
                        items: 2,
                        nav: true
                    },
                    1440: {
                        items: 3,
                        nav: true
                    },
                }
            });
        });
    }

    // Cargar testimonios al iniciar la página
    loadTestimonials();
});



