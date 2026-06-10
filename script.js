document.addEventListener('DOMContentLoaded', () => {
    
    // --- INICIALIZACIÓN DE LIBRERÍAS ---
    // 1. Fuegos Artificiales
    const fwContainer = document.getElementById('fireworks-container');
    const fireworks = new Fireworks.default(fwContainer, {
        autoresize: true,
        opacity: 0.5,
        acceleration: 1.05,
        friction: 0.97,
        gravity: 1.5,
        particles: 50,
        trace: 3,
        explosion: 5,
        intensity: 30,
        flickering: 50,
        lineStyle: 'round',
        hue: { min: 0, max: 360 },
        delay: { min: 15, max: 30 },
        rocketsPoint: { min: 50, max: 50 },
        lineWidth: { explode: { min: 1, max: 3 }, trace: { min: 1, max: 2 } },
        brightness: { min: 50, max: 80 },
        decay: { min: 0.015, max: 0.03 },
        mouse: { click: false, move: false, max: 1 } // Desactivamos el control por mouse por defecto
    });

    // --- FUNCIONES DE CELEBRACIÓN ---

    // A. Explosión de Confeti (Ráfaga única)
    function launchConfettiBurst() {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 } // Un poco más abajo del centro
        });
    }

    // B. Lluvia de Confeti (Continua y ligera)
    let confettiRainInterval;
    function startConfettiRain() {
        if (confettiRainInterval) return; // Evita duplicar
        confettiRainInterval = setInterval(() => {
            confetti({
                particleCount: 2,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#89b4fa', '#a6e3a1']
            });
            confetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#ff00ea', '#00f2ff']
            });
        }, 150); // Lluvia ligera cada 150ms
    }

    // C. Explosión de Fuegos Artificiales (Ráfaga única en el toque)
    function launchFireworkBurst(e) {
        // Obtenemos la posición del toque/clic
        const x = e.clientX || (e.touches && e.touches[0].clientX);
        const y = e.clientY || (e.touches && e.touches[0].clientY);
        
        // Lanzamos una explosión única en esa coordenada
        if (x && y) {
            fireworks.launch(1, {
                rocketsPoint: { min: (x / window.innerWidth) * 100, max: (x / window.innerWidth) * 100 },
                hue: { min: 0, max: 360 }
            });
        }
    }

    // D. Celebración Masiva Final
    function startFinalCelebration() {
        fireworks.start(); // Iniciamos fuegos artificiales continuos
        startConfettiRain(); // Iniciamos lluvia de confeti continua
        
        // Lanzamos 3 ráfagas grandes de confeti en diferentes puntos
        setTimeout(() => confetti({ particleCount: 150, spread: 100, origin: { x: 0.2, y: 0.5 } }), 200);
        setTimeout(() => confetti({ particleCount: 150, spread: 100, origin: { x: 0.8, y: 0.5 } }), 500);
        setTimeout(() => confetti({ particleCount: 200, spread: 120, origin: { y: 0.6 } }), 800);
    }

    // --- LÓGICA DE LAS TARJETAS (SLIDES) ---
    const slides = document.querySelectorAll('.slide');
    let currentSlideIndex = 0;

    // Escuchamos el clic/toque en todo el documento
    document.body.addEventListener('click', (e) => {
        // 1. Efecto en cada toque
        launchConfettiBurst(); // Ráfaga pequeña de confeti
        launchFireworkBurst(e); // Fuegos artificiales en el punto de toque

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

    const intervalDuration = 2500; // Fotos un poco más lentas para no saturar con el confeti
    setInterval(createFloatingPhoto, intervalDuration);
    createFloatingPhoto(); 
});