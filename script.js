document.addEventListener('DOMContentLoaded', () => {
    
    // --- LÓGICA DEL FONDO DE DIAPOSITIVAS (PHOTOS) ---
    // Asegúrate de tener estas fotos en /fotos/bg1.jpg, etc.
    const backgroundPaths = [
        'fotos/bg1.jpg',
        'fotos/bg2.jpg',
        'fotos/bg3.jpg',
        'fotos/bg4.jpg',
        'fotos/bg5.jpg'
    ];

    const bgSlider = document.getElementById('background-slider');
    let currentBgIndex = 0;
    const bgImages = [];

    // 1. Pre-cargar imágenes y crearlas en el DOM
    backgroundPaths.forEach((path, index) => {
        const div = document.createElement('div');
        div.classList.add('bg-image');
        div.style.backgroundImage = `url(${path})`;
        if (index === 0) div.classList.add('visible'); // La primera es visible
        bgSlider.appendChild(div);
        bgImages.push(div);
    });

    // 2. Función para cambiar de foto
    function changeBackground() {
        // Ocultamos la actual
        bgImages[currentBgIndex].classList.remove('visible');
        
        // Siguiente índice (bucle)
        currentBgIndex = (currentBgIndex + 1) % bgImages.length;
        
        // Mostramos la nueva
        bgImages[currentBgIndex].classList.add('visible');
    }

    // 3. Iniciar el bucle de fondo cada 6 segundos
    if (bgImages.length > 1) {
        setInterval(changeBackground, 6000); // 6 segundos por foto
    }


    // --- INICIALIZACIÓN DE EFECTOS FIESTA (Ajustados para fondo claro) ---
    // 1. Fuegos Artificiales
    const fwContainer = document.getElementById('fireworks-container');
    const fireworks = new Fireworks.default(fwContainer, {
        autoresize: true,
        opacity: 0.8, // Más opacos para que se vean en fondo blanco
        acceleration: 1.05,
        friction: 0.98,
        gravity: 2,
        particles: 70,
        trace: 2,
        explosion: 6,
        intensity: 40,
        flickering: 50,
        lineStyle: 'round',
        hue: { min: 0, max: 360 },
        delay: { min: 10, max: 20 },
        rocketsPoint: { min: 50, max: 50 },
        lineWidth: { explode: { min: 2, max: 4 }, trace: { min: 1, max: 2 } },
        brightness: { min: 60, max: 100 }, // Más brillantes
        decay: { min: 0.015, max: 0.03 },
        mouse: { click: false, move: false, max: 1 } 
    });

    // Colores alegres para el confeti
    const confettiColors = ['#ff6b6b', '#f9ca24', '#6ab0ab', '#fff'];

    // --- FUNCIONES DE CELEBRACIÓN ---

    // A. Explosión de Confeti (Ráfaga única en el toque)
    function launchConfettiBurst(e) {
        const x = e.clientX || (e.touches && e.touches[0].clientX);
        const y = e.clientY || (e.touches && e.touches[0].clientY);
        
        confetti({
            particleCount: 60,
            spread: 70,
            origin: { x: x / window.innerWidth, y: y / window.innerHeight },
            colors: confettiColors
        });
    }

    // B. Lluvia continua final
    let confettiRainInterval;
    function startConfettiRain() {
        if (confettiRainInterval) return;
        confettiRainInterval = setInterval(() => {
            confetti({
                particleCount: 2,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: confettiColors
            });
            confetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: confettiColors
            });
        }, 200); 
    }

    // C. Celebración Masiva Final
    function startFinalCelebration() {
        fireworks.start(); // Iniciamos fuegos continuos
        startConfettiRain(); // Iniciamos lluvia continua
        
        // 3 ráfagas grandes con la paleta de colores
        setTimeout(() => confetti({ particleCount: 150, spread: 100, origin: { x: 0.1, y: 0.5 }, colors: confettiColors }), 100);
        setTimeout(() => confetti({ particleCount: 150, spread: 100, origin: { x: 0.9, y: 0.5 }, colors: confettiColors }), 400);
        setTimeout(() => confetti({ particleCount: 200, spread: 120, origin: { y: 0.6 }, colors: confettiColors }), 700);
    }

    // --- LÓGICA DE LAS TARJETAS (SLIDES) ---
    const slides = document.querySelectorAll('.slide');
    let currentSlideIndex = 0;

    // Escuchamos el clic/toque en todo el documento
    document.body.addEventListener('click', (e) => {
        // 1. Efecto visual en cada toque (confeti)
        launchConfettiBurst(e); 

        // 2. Lógica de cambio de tarjeta
        if (currentSlideIndex < slides.length - 1) {
            
            const currentSlide = slides[currentSlideIndex];
            currentSlide.classList.remove('active');
            currentSlide.classList.add('throw-right');
            
            currentSlideIndex++;
            
            const nextSlide = slides[currentSlideIndex];
            setTimeout(() => {
                nextSlide.classList.add('active');
                
                // 3. Si es la ÚLTIMA tarjeta, activamos la celebración masiva
                if (currentSlideIndex === slides.length - 1) {
                    startFinalCelebration();
                }
            }, 200);
        }
    });

});