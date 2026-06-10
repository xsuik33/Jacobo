document.addEventListener('DOMContentLoaded', () => {
    
    // --- LÓGICA DE LAS TARJETAS (SLIDES) ---
    const slides = document.querySelectorAll('.slide');
    let currentSlideIndex = 0;

    // Escuchamos el clic en todo el documento
    document.body.addEventListener('click', () => {
        // Si aún hay tarjetas por mostrar
        if (currentSlideIndex < slides.length - 1) {
            
            // 1. Tomamos la tarjeta actual y la lanzamos a la derecha
            const currentSlide = slides[currentSlideIndex];
            currentSlide.classList.remove('active');
            currentSlide.classList.add('throw-right');
            
            // 2. Avanzamos al siguiente índice
            currentSlideIndex++;
            
            // 3. Mostramos la nueva tarjeta con un pequeñísimo retraso
            const nextSlide = slides[currentSlideIndex];
            setTimeout(() => {
                nextSlide.classList.add('active');
            }, 200); // 200ms de retraso para que se vea el cambio
        }
    });

    // --- LÓGICA DE LAS FOTOS ALEATORIAS (SE MANTIENE IGUAL) ---
    const photoPaths = [
        'fotos/foto1.jpg',
        'fotos/foto2.jpg',
        'fotos/foto3.jpg',
        'fotos/foto4.jpg',
        'fotos/foto5.jpg'
    ];

    function createFloatingPhoto() {
        if (photoPaths.length === 0) return;

        const img = document.createElement('img');
        const randomPath = photoPaths[Math.floor(Math.random() * photoPaths.length)];
        
        img.src = randomPath;
        img.classList.add('floating-photo');

        const size = Math.random() * 150 + 100;
        img.style.width = `${size}px`;
        img.style.height = `${size}px`;

        const maxX = window.innerWidth - size;
        const maxY = window.innerHeight - size;
        
        img.style.left = `${Math.random() * maxX}px`;
        img.style.top = `${Math.random() * maxY}px`;

        document.body.appendChild(img);

        const transitionTime = 1000; 
        const visibleDuration = 4000; 
        const totalLifecycle = transitionTime + visibleDuration + transitionTime;

        setTimeout(() => img.classList.add('active'), 50);
        setTimeout(() => img.classList.remove('active'), transitionTime + visibleDuration);
        setTimeout(() => img.remove(), totalLifecycle);
    }

    const intervalDuration = 2000; 
    setInterval(createFloatingPhoto, intervalDuration);
    createFloatingPhoto(); 
});