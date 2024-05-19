function animateValue(id, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        document.getElementById(id).textContent = Math.floor(progress * (end - start) + start) + '+';
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateValue("experiencia", 0, 10, 3000);
                animateValue("tatuajes", 0, 130, 3000);
                animateValue("disenos", 0, 800, 3000);
                observer.unobserve(entry.target); // Deja de observar una vez que se ha animado
            }
        });
    }, {
        threshold: 0.5 // Inicia la animación cuando el 50% del elemento sea visible
    });

    const infoExperiencia = document.querySelector('.info-experiencia');
    observer.observe(infoExperiencia);
});


